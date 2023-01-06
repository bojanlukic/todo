import { useEffect, useState } from "react";
import './../App.css';

const AddEditTask = (props) => {
  const closeModal = props.closeModal;
  const refresh = props.refresh;
  const editingTask = props.editingTask;
  const editMode = props.editMode;
  let id;
  if (editingTask && editingTask.id) {
    id = editingTask.id;
  }

  const preset = {
    title: '',
    description: '',
    status: 'todo',
    user: '',
  };

  const [state, setState] = useState(preset);

  useEffect(() => {
    if (editMode) {
      if (editingTask && editingTask.id) {
        setState(editingTask);
      } else {

        setState(preset);
      }
    } else {
      setState(preset);
    }
  }, [editMode, editingTask]);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const validator = () => {
    let valid = true;

    if (state.title.trim() === '') {
      valid = false;
    }

    return valid;
  };


  const handleAddSave = () => {
    if (validator()) {
      fetch("http://localhost:3030/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state,
          title: state.title.trim()
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          refresh();
          setState(preset);
          closeModal();
        })
        .catch((err) => console.log("Greska", err));
    } else {
      window.alert('Title is required!');
    }
  };

  const handleEditSave = () => {
    if (validator()) {
      fetch("http://localhost:3030/task/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state,
          title: state.title.trim()
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          refresh();
          setState(preset);
          closeModal();
        })
        .catch((err) => console.log("Greska", err));
    } else {
      window.alert('Title is required!');
    }
  };

  return (
    <div>
      <div className='buttonsModal'><button onClick={closeModal}>x</button></div>
      {
        editMode ? (<h2>Edit Task</h2>) : (<h2>Add New Task</h2>)
      }
      <div className='modal'>
        <label>Title</label>
        <input
          type="text"
          name='title'
          value={state.title || ''}
          onChange={handleChange}
        /> <br />
        <label>Description</label>
        <textarea
          name='description'
          value={state.description || ''}
          onChange={handleChange}
        /> <br />
        <label>Status</label>
        <select
          name='status'
          value={state.status || ''}
          onChange={handleChange}
        >
          <option value="todo">TO-DO</option>
          <option value="inProgress">IN PROGRESS</option>
          <option value="done">DONE</option>
        </select> <br />
        <label>User</label>
        <select
          name='user'
          value={state.user || ''}
          onChange={handleChange}
        >
          <option value="">Unassigned</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select> <br />
      </div>
      <div className='buttonsModal'>
        {
          editMode ? (
            <button className="buttonsAddSave" onClick={handleEditSave}>
              Save
            </button>
          ) : (
            <button className="buttonsAddSave" onClick={handleAddSave}>
              Add
            </button>
          )
        }
      </div>
    </div>
  );
};

export default AddEditTask;