const creativeStore = new Map();

function normalizeCreativeName(name) {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function saveCreative(name, data) {
  const key = normalizeCreativeName(name);

  creativeStore.set(key, {
    name,
    ...data,
  });
}

function getCreative(name) {
  const key = normalizeCreativeName(name);

  return creativeStore.get(key);
}

function getAllCreatives() {
  return Array.from(creativeStore.values());
}

module.exports = {
  saveCreative,
  getCreative,
  getAllCreatives,
  normalizeCreativeName,
};