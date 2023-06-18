const postReactController = require("../controllers/postReactController");

const router = require("express").Router();

//ADD A postReaction
router.post("/", postReactController.addAPostReactions);

//GET ALL postReactionS
// router.get("/", postReactController.getAllPostReactions);
//GET ALL LIKE
router.get("/like", postReactController.getAllLike);

//POST LIKE
router.post("/like", postReactController.postALike);

//GET A postReactionS
router.get("/", postReactController.getAUser);

//UPDATE A postReaction
router.put("/:id", postReactController.updatePostReactions);

//DELETE A postReaction
router.delete("/:id", postReactController.deletePostReact)

module.exports = router;