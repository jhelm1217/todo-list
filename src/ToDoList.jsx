import React, { useState, useEffect } from 'react'
// import { tasks as tasksArray } from './tasks'

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [view, setView] = useState("All"); //used to track current view
    const [editIndex, setEditIndex] = useState(null); //index of task being edited
    const [editText, setEditText] = useState(""); // new task text while beijg edited
    const [totalCount, setTotalCount] = useState({All: 0, Completed: 0, 'To-Do': 0 });



    useEffect (() => {
        const totalCount = {
            All: tasks.length,
            Completed: tasks.filter(tasks => tasks.completed).length,
            'To-Do': tasks.filter(tasks => !tasks.completed).length
        };
        setTotalCount(totalCount);
    }, [tasks]); //updates total count whenever tasks change


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

    function handleSubmit(event) { //you can press enter
        event.preventDefault(); //this is to Prevent the default submission behavior
        if (editIndex !== null) { //i am currently editing this?
            const updatedTasks = [...tasks]; //copy of my array from above
            updatedTasks[editIndex].title = editText; //this updates my title 
            setTasks(updatedTasks); // updates tasks with the updated tasks array 
            setEditIndex(null); //resets that state, because im not editing anymore, or i shouldnt be
            setEditText("");// this is reseting the input field for me to edit the text
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } else {
            if (newTask.trim() !== "") { // if there are no empty strings
                // Update tasks state with the new task
                setTasks([...tasks, { title: newTask, completed: false }]);
                setNewTask(""); // Clear the input field after adding the task
                // add my local storage after adding a new task, so the data is saved after adding and can still be retrieved after refreshing screen 
                // localStorage.setItem('tasks', JSON.stringify([...tasks, { title: newTask, completed: false}]));
                //local storage can only store strings. converts objects/arrays into strings 
            }
        }
    }
    function deleteTask(index) {
        const updatedTasks = [...tasks]; // creates a new array 
        updatedTasks.splice(index, 1); // removes one element from the array 
        setTasks(updatedTasks); // new array that removes the element 
        // localStorage.removeItem('tasks', JSON.stringify(updatedTasks))
    }


    function toggleCompleted(index) {
        const updatedTasks = [...tasks];// my array of tasks
        updatedTasks[index].completed = !updatedTasks[index].completed; // this is my updated array with the tasks that are marked completed
        setTasks(updatedTasks); //new array of 
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
//filter used based on the complettion status, clicking the buttons
    function filterTasks(task) {
        if (view === "All") return true; // this is the current view on screen
        if (view === "Completed") return task.completed; //when the view is here, it will only show completed tasks
        if (view === "To-Do") return !task.completed; // when the view is here, it will only show the not completed tasks
    }

    const filteredTasks = tasks.filter(filterTasks); // creating a new array for filtering through the array 

    return (
        <div className="container">
            <div className="transparent-box">
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
                            <li key={index} style={{ color: `hsl(${(index * 50) % 360}, 70%, 50%)` }}>
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
                                <button onClick={() => deleteTask(index)} style={{ color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>
                                    <i className="fa-solid fa-trash-alt"></i> Delete
                                </button>
                            </li>
                        ))}
                        <div style={{ marginTop: '70px' }}>
                            {['All', 'Completed', 'To-Do'].map(viewOption => (
                                <button key={viewOption} onClick={() => setView(viewOption)} style={{ color: 'purple', backgroundColor: 'white', borderRadius: '5px' }}>
                                    {viewOption} ({totalCount[viewOption]})
                                </button>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default ToDoList
