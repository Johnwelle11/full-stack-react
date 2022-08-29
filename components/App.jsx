import React, { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Tasks from "./Tasks.jsx";
import axios from "axios";

import TaskForm from "./TaskForm.jsx";
import { useRecoilState } from "recoil";
import { tasksState } from "./state.js";


const App = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks", {
      mode: 'cors'
    }).then((res) => res.json()).then(tasks => {
      setTasks(tasks)
    });
  }, []);
  
  return (
    <>
      <Header />
      <main className="main">
        <Tasks tasks={tasks} />
        <TaskForm/>
      </main>
      <Footer />
    </>
  );
}

export default App;
