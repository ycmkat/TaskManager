import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

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

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((tasks) => (
                    <li key={tasks._id}>{tasks.title}</li>
                ))}
            </ul>
        </div>
    )
};

export default TaskList;