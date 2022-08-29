import axios from "axios";
import React, {useState} from "react";
import { tasksState } from "./state";
import { useRecoilState } from "recoil";

const TaskForm = () => {
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useRecoilState(tasksState);
    
 const updateDescription = (event) => {
        setDescription(event.target.value);
 }
    
const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            url: "http://localhost:3000/api/tasks",
            method: 'POST',
            data: { description }
        }).then(res => {
            setTasks([...tasks, res.data]);
        })
    }
    return (
        <div className= "description">
        <form onSubmit={handleSubmit}>
        <label>
            Add Task
            <input name="description" type="text" value={description} onChange={updateDescription} />
        </label>
            </form>
            </div>
    )
}

export default TaskForm;