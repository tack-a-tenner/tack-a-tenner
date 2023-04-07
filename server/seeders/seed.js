const db = require("../config/connection");
const { Profile, Request } = require("../models");
const profileSeeds = require("./profileSeeds.json");
const requestSeeds = require("./requestSeeds.json");

db.once("open", async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);
    await Request.deleteMany({});
    await Request.create(requestSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
