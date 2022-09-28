const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.delete("/", PostsController.Delete);
router.put("/like/", PostsController.Update);
router.put("/RemoveLike/", PostsController.RemoveLike);
router.put("/comment/", PostsController.Comment );

module.exports = router;
