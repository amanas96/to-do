import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, initialTask = null, onCancel }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : "");
  const [description, setDescription] = useState(
    initialTask ? initialTask.description : ""
  );

  useEffect(() => {
    setTitle(initialTask ? initialTask.title : "");
    setDescription(initialTask ? initialTask.description : "");
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    const newTask = {
      id: initialTask ? initialTask.id : Date.now(), // Use existing ID for edit, new timestamp for add
      title: title.trim(),
      description: description.trim(),
      completed: initialTask ? initialTask.completed : false,
      createdAt: initialTask ? initialTask.createdAt : new Date().toISOString(),
    };

    onSubmit(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{initialTask ? "Edit Task" : "Add New Task"}</h3>
      <input
        type="text"
        placeholder="Task Title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">
          {initialTask ? "Update Task" : "Add Task"}
        </button>
        {initialTask && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
