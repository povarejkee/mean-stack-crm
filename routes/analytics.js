const express = require("express");
const passport = require("passport");
const analyticsControllers = require("../controllers/analytics");
const router = express.Router();

router.get(
  "/analytics",
  passport.authenticate("jwt", { session: false }),
  analyticsControllers.analytics
);
router.get(
  "/overview",
  passport.authenticate("jwt", { session: false }),
  analyticsControllers.overview
);

module.exports = router;
