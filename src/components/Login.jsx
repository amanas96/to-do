import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      alert("Please enter both username and password.");
      return;
    }

    const savedUsers =
      JSON.parse(localStorage.getItem("task_tracker_users")) || {};

    if (savedUsers[trimmedUser]) {
      if (savedUsers[trimmedUser] === trimmedPass) {
        localStorage.setItem("task_tracker_username", trimmedUser);
        onLogin(trimmedUser);
      } else {
        alert("Incorrect password.");
      }
    } else {
      savedUsers[trimmedUser] = trimmedPass;
      localStorage.setItem("task_tracker_users", JSON.stringify(savedUsers));
      localStorage.setItem("task_tracker_username", trimmedUser);
      onLogin(trimmedUser);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Welcome to Task Tracker</h2>
        <div className="userlogin-input">
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>{" "}
        <div className="userlogin-input">
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
