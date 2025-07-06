import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { getTasks, saveTasks } from "../utils/localStorage";
import { toast } from "react-toastify";

function TaskList({ username }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);

  useEffect(() => {
    console.log("loading tasks for username", username);
    const loadedTasks = getTasks(username);
    console.log("Loaded task:", loadedTasks);
    setTasks(loadedTasks);
    setIsLoaded(true);
  }, [username]);

  useEffect(() => {
    if (isLoaded) {
      saveTasks(username, tasks);
      console.log("Saving task:", tasks);
    }
  }, [tasks, username]);

  // Clear highlight after 3 seconds
  useEffect(() => {
    if (highlightedTaskId) {
      const timer = setTimeout(() => {
        setHighlightedTaskId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedTaskId]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setEditingTask(null);
    toast.success("Task added successfully!", { autoClose: 2000 });
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const search = (term) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearchTaskClick = (taskId) => {
    setSearchTerm("");

    setFilter("all");

    setHighlightedTaskId(taskId);
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });
  };

  const searchResults = searchTerm.trim() ? search(searchTerm) : [];

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <div className="task-wrapper">
        <div className="task-search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {searchTerm.trim() && (
            <div
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Search Results
              </h3>
              <ul className="task-list ">
                {searchResults.length > 0 ? (
                  searchResults.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleSearchTaskClick(task.id)}
                      style={{
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#e9e9e9")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      <TaskItem
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-900 mt-2 text-center">
                    No matching tasks found.
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="task-layout">
          <div className="task-dashboard">
            <TaskForm
              onSubmit={editingTask ? updateTask : addTask}
              initialTask={editingTask}
              onCancel={handleCancelEdit}
            />
          </div>

          <div className="task-list-section">
            <TaskFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              allCount={tasks.length}
              completedCount={tasks.filter((t) => t.completed).length}
              pendingCount={tasks.filter((t) => !t.completed).length}
            />

            {filteredTasks.length === 0 && (
              <p className="no-tasks-message">
                {filter === "all" &&
                  "No tasks yet! Add a new task to get started."}
                {filter === "completed" && "No completed tasks."}
                {filter === "pending" && "No pending tasks."}
              </p>
            )}

            <ul className="task-list">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    backgroundColor:
                      highlightedTaskId === task.id ? "#fff3cd" : "transparent",
                    border:
                      highlightedTaskId === task.id
                        ? "2px solid #ffc107"
                        : "none",
                    borderRadius: highlightedTaskId === task.id ? "8px" : "0",
                    padding: highlightedTaskId === task.id ? "8px" : "0",
                    marginBottom: highlightedTaskId === task.id ? "8px" : "0",
                    transition: "all 0.3s ease",
                  }}
                >
                  <TaskItem
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default TaskList;
