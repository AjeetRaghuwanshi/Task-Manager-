import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import UpdateTask from "./UpdateTask";
import InputTask from "./InputTask";

import { deleteTask } from "../redux/Task/taskSlice";

function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});

  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);

  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleOpenEditModal = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleCloseEditModal = () => {
    setTaskToUpdate({});
    setShowModal(false);
  };

  return (
    <div className="p-8 pt-20  ">
      <div className=" ">
        <h1 className="text-xl font-semibold">All Tasks</h1>
        <InputTask />
      </div>
      {tasks.length === 0 ? (
        <div className="flex items-center text-2xl font-bold animate-pulse justify-center w-full h-full">
          No Tasks
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
          {tasks?.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              handleOpenEditModal={handleOpenEditModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {showModal && (
        <UpdateTask
          taskToUpdate={taskToUpdate}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default TaskList;
