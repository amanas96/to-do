// components/Dashboard.js
import React from "react";
import TaskList from "./TaskList";
import { getTasks, saveTasks } from "../utils/localStorage";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const Dashboard = ({ username, onLogout }) => {
  return (
    <div className="app">
      <header>
        <h1>Task Tracker</h1>
        <div className="user-info">
          <span>Hello, {capitalize(username)}!</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>
      <main>
        <TaskList username={username} />
      </main>
    </div>
  );
};

export default Dashboard;
