import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (_req, res) {
  res.render("index", { title: "Express" });
});

//module.exports = router;
export default router;
