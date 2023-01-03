import './App.css';

function App() {
  // const [task, setTask] = useState([])




  return (
    <div className="App">
      <h1 className="title"> <span>Trello</span> Like Board</h1>
      <button className="taskButton">Add Task</button>
      <div className="container">
        <div >To do</div>
        <div>In Progress</div>
        <div>Done</div>
      </div>
      <div className="container2">
        <div ></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
