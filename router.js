

const router = require ("express").Router();

const { getTodos, createTodo, updateTodo, deleteTodo } = require("./controllers/Todo");

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
});


module.exports = router;

//new get route

router.get("/todos", getTodos);


//new post

router.post("/todos", createTodo);

//new PUT

router.put("/todos/:todoID", updateTodo);

//new delete

router.delete("/todos/:todoID", deleteTodo);
