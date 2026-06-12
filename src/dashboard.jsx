import React, { useEffect, useState } from "react";
import todo from "./assets/todo.png";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      console.log("Email:", email);
      console.log("Token:", token);

      const response = await fetch(
        `http://localhost:3000/tasks/${email}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();

      console.log("Fetched Tasks:", data);

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= PAGE LOAD =================

  useEffect(() => {
    if (!email || !token) {
      window.location.href = "/";
      return;
    }

    fetchTasks();
  }, []);

  // ================= ADD TASK =================

  const addTask = async () => {
    if (task.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            task,
            status: 0,
            email,
          }),
        }
      );

      const data = await response.json();

      console.log("Added Task:", data);

      if (data.id) {
        setTasks([...tasks, data]);
      }

      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE TASK =================

  const deleteTask = async (id) => {
    try {
      await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(
        tasks.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${todo})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-xl p-6 w-[450px] border-2 border-blue-500">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold text-blue-600">
            To Do List
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Debug */}
        <div className="text-sm text-gray-500 mb-2">
          Total Tasks: {tasks.length}
        </div>

        {/* Task List */}
        <ul className="space-y-3 overflow-auto max-h-72">
          {tasks.length === 0 ? (
            <li className="text-center text-gray-500">
              No Tasks Found
            </li>
          ) : (
            tasks.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg"
              >
                <span>{item.task}</span>

                <button
                  onClick={() =>
                    deleteTask(item.id)
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}