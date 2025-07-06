export const getTasks = (username) => {
  try {
    const storedTasks = localStorage.getItem(`task_tracker_tasks_${username}`);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

export const saveTasks = (username, tasks) => {
  try {
    localStorage.setItem(
      `task_tracker_tasks_${username}`,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};
