import React, { useEffect, useState } from "react";
import todo from "./assets/todo.png";
export default function Dashboard() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const email =localStorage.getItem("email");
    // FETCH TASKS
     const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${email}`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    // ADD TASK
    const addTask = async () => {
        if (task.trim() === "") return;
        try {
            const response = await fetch("http://localhost:3000/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        task,
                        status: 0,
                        email
                    })
                }
            );
            const data = await response.json();
            setTasks([...tasks, data]);
            setTask("");
        } catch (error) {
            console.log(error);
        }
    };
    // DELETE TASK
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`,
                {
                    method: "DELETE"
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
    // LOGOUT
    const logout = () => {
        localStorage.removeItem("email");
        window.location.href = "/";
    };
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover"style={{backgroundImage: `url(${todo})`}}>
            <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] border-2 border-blue-500">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-3xl font-bold text-blue-600">To Do List</h1>
                    <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                </div>
                <div className="flex gap-3 mb-5">
                    <input type="text" placeholder="Enter a task" value={task} onChange={(e) =>setTask(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"/>
                    <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
                </div>
                <ul className="space-y-3 overflow-auto max-h-60">
                    {tasks.map((item) => (
                        <li key={item.id}className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg">
                            <span>{item.task}</span>
                            <button onClick={() =>deleteTask(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}