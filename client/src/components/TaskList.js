import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');


    useEffect(() => {
        // get all tasks
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/tasks');
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
            const response = await axios.post('http://localhost:5001/api/tasks', {title: newTask});
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEditClick = (task) => {
        setEditTaskId(task._id);
        setEditTaskTitle(task.title);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5001/api/tasks/${editTaskId}`, { title: editTaskTitle });
            setTasks(tasks.map(task => (task._id === editTaskId ? response.data : task)));
            setEditTaskId(null);
            setEditTaskTitle('');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Task List</h1>
            {/* Add task field */}
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
            {/* Edit task field */}
            {editTaskId && (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        value={editTaskTitle}
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                        placeholder="Edit Task"
                        required
                    />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => { setEditTaskId(null); setEditTaskTitle(''); }}>
                        Cancel
                    </button>
                </form>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title}
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TaskList;