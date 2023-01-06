import './../App.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AddEditTask from './AddEditTask';


const customStyles = {
  content: {
    width: "70%",
    height: "50%",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "mediumSeaGreen",
    color: "white",
    fontWeight: "700",
  },
};

Modal.setAppElement('#root');

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  let tasksTodo = tasks.filter((item) => {
    if (item.status !== "inProgress" && item.status !== "done") {
      return true;
    }
    return false;
  });
  let tasksInProgress = tasks.filter((item) => {
    return item.status === "inProgress";
  });
  let tasksDone = tasks.filter((item) => {
    return item.status === "done";
  });


  useEffect(() => {
    refresh();
  }, [])


  const refresh = () => {
    fetch("http://localhost:3030/task")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err))
  }


  const closeModal = () => {
    setModalIsOpen(false);
  }

  const addTask = () => {
    console.log('add task');
    setEditingTask(null);
    setEditMode(false);
    setModalIsOpen(true);
  };

  const editTask = (id, task) => {
    console.log('edit task', id);
    setEditingTask(task);
    setEditMode(true);
    setModalIsOpen(true);
  };

  return (
    <div className="App">
      <h1 className="title"> <span>Trello</span> Like Board</h1>
      <button className="btnAddTask" onClick={(e) => { addTask() }}>Add Task</button>
      <div className="container">
        <div className='container-name'>To do</div>
        <div className='container-name'>In Progress</div>
        <div className='container-name'>Done</div>
      </div>
      <div className="container2">
        <div className='section'>
          {
            tasksTodo.map((task) => {
              return (
                <div key={task.id} className='task' onClick={(e) => { editTask(task.id, task) }}>
                  <div className='task-title'>{task.title}</div>
                </div>
              )
            })
          }
        </div>
        <div className='section'>
          {
            tasksInProgress.map((task) => {
              return (
                <div key={task.id} className='task' onClick={(e) => { editTask(task.id, task) }}>
                  <div className='task-title'>{task.title}</div>
                </div>
              )
            })
          }
        </div>
        <div className='section'>
          {
            tasksDone.map((task) => {
              return (
                <div key={task.id} className='task' onClick={(e) => { editTask(task.id, task) }}>
                  <div className='task-title'>{task.title}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Modal
        closeTimeoutMS={120}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AddEditTask
          editMode={editMode}
          editingTask={editingTask}
          closeModal={closeModal}
          refresh={refresh}
        />
      </Modal>
    </div>
  );
}

export default Task;
