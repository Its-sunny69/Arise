import Todo from "../../models/todoModal.js";

const getTodo = async (req, res) => {
    try {
      const {userId} = req.params;
      console.log("userIdaa", req.params)

      const todoData = await Todo.find({userId});
      return res.status(200).json(todoData)
    } catch (error) {
      console.error(error);
    }
  }


const createTodo = async (req, res) => {
    try {

        const {userId, title, checked} = req.body

        const userTodos = await Todo.findOne({userId})

        if(!userTodos) {
          const todoCreated = await Todo.create({userId, todos: [{title, checked}]});

          return res.status(201).send({
            msg: "New Todo created",
            data: todoCreated,
          })
        } else {
          userTodos.todos.push({
            title, 
            checked
          })

          const updatedTodos = await userTodos.save()

          return res.status(201).send({
            msg: "Todos is updated",
            data: updatedTodos,
          })
        }

    } catch (error) {
        console.error(error)
    }
}

const todoControllers = { getTodo, createTodo};

export default todoControllers;