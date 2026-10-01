let latestCampaign = null;

function saveCampaign(data) {
  latestCampaign = data;
}

function getCampaign() {
  return latestCampaign;
}

module.exports = {
  saveCampaign,
  getCampaign,
};