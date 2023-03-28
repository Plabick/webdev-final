import React, {useState} from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="container d-flex justify-content-center ">
            <div className="content-wrapper ">
                <h1 className="text-center">To-Do List</h1>
                    <TaskForm editingTask={editingTask} setEditingTask={setEditingTask}/>
                    <TaskList setEditingTask={setEditingTask}/>
            </div>
        </div>
    );
}

export default App;
