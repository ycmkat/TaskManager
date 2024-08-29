import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    useEffect(() => {
        // get all tasks
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchTasks();
    }, []);

    // create form to add new tasks
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/tasks', {title: newTask});
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <h1>Task List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Task"
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((tasks) => (
                    <li key={tasks._id}>{tasks.title}</li>
                ))}
            </ul>
        </div>
    )
};

export default TaskList;