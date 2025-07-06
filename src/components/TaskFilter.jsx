import React from "react";

function TaskFilter({
  currentFilter,
  onFilterChange,
  allCount,
  completedCount,
  pendingCount,
}) {
  return (
    <div className="task-filters">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All ({allCount})
      </button>
      <button
        className={
          currentFilter === "completed" ? "active completed-button" : ""
        }
        onClick={() => onFilterChange("completed")}
      >
        Completed ({completedCount})
      </button>
      <button
        className={currentFilter === "pending" ? "active" : ""}
        onClick={() => onFilterChange("pending")}
      >
        Pending ({pendingCount})
      </button>
    </div>
  );
}

export default TaskFilter;
