// AddTask.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Task/taskSlice.js";
import { v4 as uuidv4 } from "uuid";

function InputTask() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    deadline: "",
    completed: false,
    priority: "Low",
  });

  const dispatch = useDispatch();

  const handleSaveTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      id: "",
      title: "",
      description: "",
      deadline: "",
      completed: false,
      priority: "Low",
    });
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="py-2 px-4 my-2
        font-semibold rounded-lg shadow-md cursor-pointer
        transition-colors bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white absolute right-5 top-16 hover:from-pink-500 hover:to-yellow-500"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <textarea
              cols="10"
              rows="5"
              value={newTask.description}
              placeholder="Description"
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
            <input
              type="date"
              placeholder="Deadline"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <div className="mb-3">
              <input
                type="checkbox"
                checked={newTask.completed}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    completed: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-gray-700">Completed</span>
            </div>
            <div className="mb-4">
              <label className="text-gray-700">Priority:</label>
              <div className="flex items-center gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={newTask.priority === "High"}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="mr-2"
                  />
                  High
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={newTask.priority === "Medium"}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="mr-2"
                  />
                  Medium
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={newTask.priority === "Low"}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="mr-2"
                  />
                  Low
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-purple-700"
                onClick={handleSaveTask}
              >
                Save Task
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputTask;
