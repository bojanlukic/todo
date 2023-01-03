import './App.css';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState(0)
  const [name, setName] = useState('')

  const onClick = () => {
    setTask(name)
  }


  return (
    <div className="App">
      <h1 className="title"> <span>Trello</span> Like Board</h1>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      <button className="taskButton" onClick={onClick}>Add Task</button>
      <div className="container">
        <div >To do</div>
        <div>In Progress</div>
        <div>Done</div>
      </div>
      <div className="container2">
        <div>{task}</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
