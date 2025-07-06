import React from "react";

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const createdAtDate = new Date(task.createdAt).toLocaleString();

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <div>
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
          <small>Created: {createdAtDate}</small>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete-button">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
