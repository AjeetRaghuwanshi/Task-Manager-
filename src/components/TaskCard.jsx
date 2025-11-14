import { CalendarClock, FilePenLine, Trash } from "lucide-react";
import React from "react";

const TaskCard = ({ task, handleOpenEditModal, handleDeleteTask }) => {
  return (
    <li className="relative bg-white flex flex-col justify-between border border-gray-300 hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 p-6 gap-4">
      <div className="flex items-center justify-between">
        {task.completed ? (
          <div className="text-green-600 bg-green-200 border border-green-600 text-sm px-3 py-1 rounded-full mr-4">
            Completed
          </div>
        ) : (
          <div className="text-red-600 bg-red-200 border border-red-600 text-sm px-3 py-1 rounded-full mr-4">
            ToDo
          </div>
        )}
        <div className="text-lg font-semibold">{task?.priority}</div>
      </div>
      <h2 className="text-2xl font-bold text-gray-700">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
      <hr className="my-4" />
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center gap-2">
          <CalendarClock color="#4B5563" size={20} />
          <span className="text-gray-600">
            {new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex gap-4">
          <FilePenLine
            className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-150"
            onClick={() => handleOpenEditModal(task)}
            size={20}
          />
          <Trash
            className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors duration-150"
            onClick={() => handleDeleteTask(task.id)}
            size={20}
          />
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
