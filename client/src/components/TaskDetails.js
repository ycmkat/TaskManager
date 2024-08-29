import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchTask();
    }, [id]);

    if (!task) return <div>Task not found.</div>;

    return (
        <div>
            <h1>Task Details</h1>
            <p><strong>Title:</strong> {task.title}</p>
            <button onClick={() => navigate('/')}>Back to Task List</button>
        </div>
    );
};

export default TaskDetails;
