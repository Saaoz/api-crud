// const getTodos = (req, res) =>{
//     res.send("I am the get todos route");
// };

//fournis par le site crud API mais ne fonctionne pas car error Model.find() no longer accepts a callback
//const getTodos = (req, res) => {
//   Todo.find((err, todos) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(todos);
//   });
// };
const Todo = require("../model/Todo");


const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).send(err);
    }
};


const createTodo = (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    });

    todo
        .save()
        .then((todo) => res.json(todo))
        .catch((err) => res.send(err));
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.todoID },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,
                },
            },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.send(err);
    }
};

const deleteTodo = (req, res) => {
    Todo.findByIdAndDelete(req.params.todoID)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todoID,
                });
            }
            res.send({ message: "Todo deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todoID,
                });
            }
            return res.status(500).send({
                message: "Could not delete todo with id " + req.params.todoID,
            });
        });
};



module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
