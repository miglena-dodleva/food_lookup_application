const fs = require("fs");
const path = require("path");

const filePathToData = path.join(__dirname, "..", "database", "foodData.json");

module.exports.readData = () => {
  if (!fs.existsSync(filePathToData)) {
    console.error(`File path to data: ${filePathToData} cannot be found`);
    return {};
  }

  return JSON.parse(fs.readFileSync(filePathToData, "utf8"));
};

module.exports.writeData = (record) => {
  if (typeof record !== "object" || record === null) {
    console.error("Invalid record: record must be an object or array.");
    return;
  }

  fs.writeFileSync(filePathToData, JSON.stringify(record, null, 2), "utf8");
};
