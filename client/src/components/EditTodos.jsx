import React, { useState } from "react";

const EditTodos = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  //   console.table("todoProp->", todo);

  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const res = await fetch(`http://localhost:4000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("res--> ", res);
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      {/* id= id10 */}
      <div
        class="modal fade"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodos;
