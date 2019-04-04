const findCacheDir = require("find-cache-dir");
const pkg = require("../package.json");

module.exports.cacheDir = findCacheDir({ name: pkg.name });
