import React, { useState, useEffect } from 'react'
// import { tasks as tasksArray } from './tasks'

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [view, setView] = useState("All"); //used to track current view

    // localStorage.setItem('task', 'tasks')} // ( key, value )
    // const allTasks = ["All", ...new Set(tasks.map((task) => task.tasks))];

    // READ DATA
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    //CREATE DATA
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    // // UPDATE DATA
    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }, [tasks]);




    function handleInputChange(event) {
        setNewTask(event.target.value); // this is to update the state with the current value of input field

    }

    function handleSubmit(event) { //"add task"
        event.preventDefault(); //this is to Prevent the ndefault submission behavior
        // console.log('Task submitted:', tasks);
        if (newTask.trim() !== "") { //No empty strings
            // Update tasks state with the new task
            setTasks([...tasks, { title: newTask, completed: false }]);
            setNewTask(""); // Clear the input field after adding the task
            // add my local storage after adding a new task, so the data is saved after adding and can still be retrieved after refreshing screen 
            // localStorage.setItem('tasks', JSON.stringify([...tasks, { title: newTask, completed: false}]));
            //local storage can only store strings. converts objects/arrays into strings 
        }
    }
    function deleteTask(index) {
        const updatedTasks = [...tasks]; // creates a new array 
        updatedTasks.splice(index, 1); // removes one element from the array 
        setTasks(updatedTasks); // new array that removes the element 
        // localStorage.removeItem('tasks', JSON.stringify(updatedTasks))
    }


    function toggleCompleted(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function filterTasks(task) {
        if (view === "All") return true;
        if (view === "Completed") return task.completed;
        if (view === "To-Do") return !task.completed;
    }

    const filteredTasks = tasks.filter(filterTasks);

    // const totalCount = {
    //     All: tasks.length,
    //     Completed: tasks.filter(tasks => tasks.completed).length,
    //     'To-Do': tasks.filter(tasks => !tasks.completed).length
    // };

    return (
        <div className="to-do-list">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter the task.."
                    value={newTask}
                    name="text"
                    onChange={handleInputChange}
                    style={{ width: '50%', padding: '10px', fontSize: '1em', borderRadius: '5px' }}
                />
                <button type="submit" style={{ color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>Add</button>
            </form>
            <ul style={{ fontSize: '1.3em', listStyleType: 'none' }}>
                {filteredTasks.map((tasks, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={tasks.completed}
                            onChange={() => toggleCompleted(index)}
                        />
                        <span style={{ textDecoration: tasks.completed ? 'line-through' : 'none', fontSize: '1.5em' }}>
                            {tasks.title}
                        </span>
                        <button onClick={() => toggleCompleted(index)} style={{ marginLeft: '10px', color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>
                            {tasks.completed ? "Mark as Incomplete" : "Mark as Complete"} {/* // if the statement is true then it will display mark as incomplete, if it is false then it will show mark as incomplete */}
                        </button>
                        <button onClick={() => deleteTask(index)} style={{ color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>Delete</button>
                    </li>
                ))}
                <div style={{ marginTop: '70px' }}>
                    {['All', 'Completed', 'To-Do'].map(viewOption => (
                        <button key={viewOption} onClick={() => setView(viewOption)} style={{ color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>{viewOption}
                        </button>
                    ))}
                </div>
            </ul>
        </div>
    )

}
export default ToDoList


{/* <ol>
    {tasks.map((task, index) => 
        <li key={index}>
            <span className="text">{task}</span>
            <button
                className="delete-button"
                onClick={() => deleteTask(index)}>
                Delete 
            </button>
        </li>
    
    )}
</ol> */}