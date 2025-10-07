import React from "react";
import { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      console.log("description-->", description);
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add todo: ${errorText}`);
      }
      // Show the response body
      const data = await res.json();
      console.log("API response:", data);
      setDescription(""); // Clear input on success
      // Optionally, trigger a refresh of the todo list here
      window.location = "/";
    } catch (err) {
      alert("Error: " + (err.message || err));
      console.error("Fetch error:", err);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">I am input odo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
