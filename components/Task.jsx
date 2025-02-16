import React, { useState } from "react";
import { tasksState } from "./state";
import { useRecoilState } from "recoil";

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(task.description);
  const [tasks, setTasks] = useRecoilState(tasksState);

  const editTask = (id, currentValue) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: currentValue })
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        const indexOfTaskToUpdate = tasks.findIndex(task => task.id === id);
        const updateTasks = [...tasks];
        updateTasks[indexOfTaskToUpdate] = updatedTask;
        setTasks(updateTasks);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    editTask(task.id, currentValue);
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      mode: 'cors',
      method: 'DELETE'
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    })
  }

  return (
    <div className="task">
      {isEditing
        ? (
          <form onSubmit={handleSubmit}>
            <input value={currentValue} onChange={e => setCurrentValue(e.target.value)} />
          </form>
        )
        : <span data-testid="description" onClick={() => setIsEditing(true)}>{task.description}</span>
      }
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
};

export default Task;
