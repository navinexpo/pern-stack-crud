import React, { useEffect, useState } from "react";
import EditTodos from "./EditTodos";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      // console.log("deleteTodo", deleteTodo);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTodods = async () => {
    try {
      const res = await fetch("http://localhost:4000/todos");
      const jsonData = await res.json();
      setTodos(jsonData);
      // console.log("jsonData-->",jsonData)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodods();
  }, []);

  // console.log("TodoState -->", todos);

  return (
    <>
      <table class="table mt-5 text-center table-striped">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => (
            <tr key={item.todo_id}>
              <td>{item.description}</td>
              <td><EditTodos todo={item}/></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(item.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
