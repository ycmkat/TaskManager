import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';


const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path="/tasks/:id" element={<TaskDetails />} />
    </Routes>
  </Router>
)

export default App;
