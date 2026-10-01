const express = require("express");
const multer = require("multer");
const { parse } = require("csv-parse/sync");

const {
  saveCampaign,
  getCampaign,
} = require("../services/campaignStore");

const router = express.Router();

// CSV upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// POST /api/campaigns/upload
router.post("/upload", upload.single("campaign"), async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No CSV file uploaded",
      });
    }

    // Convert CSV file to text
    const csvText = req.file.buffer.toString("utf-8");

    // Parse CSV
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Check if CSV is empty
    if (!records.length) {
      return res.status(400).json({
        message: "CSV file is empty",
      });
    }

    // Required CSV columns
    const requiredColumns = [
      "Creative",
      "Impressions",
      "Clicks",
      "Conversions",
      "Spend",
    ];

    const availableColumns = Object.keys(records[0]);

    const missingColumns = requiredColumns.filter(
      (column) => !availableColumns.includes(column)
    );

    // Check missing columns
    if (missingColumns.length > 0) {
      return res.status(400).json({
        message: "Missing required CSV columns",
        missingColumns,
        requiredColumns,
      });
    }

    // Process each campaign row
    const campaignData = records.map((row) => {
      const impressions = Number(row.Impressions) || 0;
      const clicks = Number(row.Clicks) || 0;
      const conversions = Number(row.Conversions) || 0;
      const spend = Number(row.Spend) || 0;

      const revenue =
        row.Revenue !== undefined
          ? Number(row.Revenue) || 0
          : 0;

      // CTR
      const ctr =
        impressions > 0
          ? (clicks / impressions) * 100
          : 0;

      // CVR
      const cvr =
        clicks > 0
          ? (conversions / clicks) * 100
          : 0;

      // CPC
      const cpc =
        clicks > 0
          ? spend / clicks
          : 0;

      // CPA
      const cpa =
        conversions > 0
          ? spend / conversions
          : 0;

      // ROAS
      const roas =
        spend > 0
          ? revenue / spend
          : null;

      return {
        creative: row.Creative,
        impressions,
        clicks,
        conversions,
        spend,
        revenue,

        ctr: Number(ctr.toFixed(2)),
        cvr: Number(cvr.toFixed(2)),
        cpc: Number(cpc.toFixed(2)),
        cpa: Number(cpa.toFixed(2)),

        roas:
          roas !== null
            ? Number(roas.toFixed(2))
            : null,
      };
    });

    // Calculate totals
    const totalImpressions = campaignData.reduce(
      (sum, row) => sum + row.impressions,
      0
    );

    const totalClicks = campaignData.reduce(
      (sum, row) => sum + row.clicks,
      0
    );

    const totalConversions = campaignData.reduce(
      (sum, row) => sum + row.conversions,
      0
    );

    const totalSpend = campaignData.reduce(
      (sum, row) => sum + row.spend,
      0
    );

    const totalRevenue = campaignData.reduce(
      (sum, row) => sum + row.revenue,
      0
    );

    // Overall CTR
    const overallCTR =
      totalImpressions > 0
        ? (totalClicks / totalImpressions) * 100
        : 0;

    // Overall CVR
    const overallCVR =
      totalClicks > 0
        ? (totalConversions / totalClicks) * 100
        : 0;

    // Overall CPC
    const overallCPC =
      totalClicks > 0
        ? totalSpend / totalClicks
        : 0;

    // Overall CPA
    const overallCPA =
      totalConversions > 0
        ? totalSpend / totalConversions
        : 0;

    // Overall ROAS
    const overallROAS =
      totalSpend > 0
        ? totalRevenue / totalSpend
        : null;

    // Final campaign result
    const result = {
      message: "Campaign CSV processed successfully",

      summary: {
        totalImpressions,
        totalClicks,
        totalConversions,

        totalSpend: Number(totalSpend.toFixed(2)),
        totalRevenue: Number(totalRevenue.toFixed(2)),

        ctr: Number(overallCTR.toFixed(2)),
        cvr: Number(overallCVR.toFixed(2)),
        cpc: Number(overallCPC.toFixed(2)),
        cpa: Number(overallCPA.toFixed(2)),

        roas:
          overallROAS !== null
            ? Number(overallROAS.toFixed(2))
            : null,
      },

      campaignData,
    };

    // Save latest campaign data
    saveCampaign(result);

    // Send response
    return res.status(201).json(result);
  } catch (error) {
    console.error(
      "Campaign CSV processing error:",
      error
    );

    return res.status(500).json({
      message: "Failed to process campaign CSV",
      error: error.message,
    });
  }
});

// GET /api/campaigns/latest
router.get("/latest", (req, res) => {
  const campaign = getCampaign();

  if (!campaign) {
    return res.status(404).json({
      message: "No campaign data uploaded yet.",
    });
  }

  return res.json(campaign);
});

module.exports = router;