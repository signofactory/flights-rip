//Express
const searchesRouter = require("express").Router();
const { model } = require("mongoose");

//Middleware
const requireLogin = require("../middlewares/requireLogin");

//Model
const Search = model("searches");


//Routes
searchesRouter.post("/", requireLogin, async (req, res) => {
    const newSearch = await new Search ({
        ...req.body,
        user: req.user
    }).save()

    res.send(newSearch)
})

searchesRouter.delete("/:searchId", async (req, res) => {
    const { searchId } = req.params;
    await Search.findByIdAndDelete(searchId);

    res.json({});
  });

searchesRouter.get("/user-searches", requireLogin, async (req, res) => {
    const newSearch = await Search.find({
        user: req.user
    }).sort({updatedAt:-1})

    res.send(newSearch)
})

module.exports = searchesRouter;