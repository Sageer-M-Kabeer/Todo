import React, { useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskInput.trim()) return;
    setTasks([...tasks, { text: taskInput, isEditing: false }]);
    setTaskInput('');
  };

  const handleEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], isEditing: !updatedTasks[index].isEditing };
    setTasks(updatedTasks);
  };

  const handleSave = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], isEditing: false };
    setTasks(updatedTasks);
  };

  const handleInputChangeEdit = (event, index) => {
    const { value } = event.target;
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], text: value };
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <header>
        <h1>Task List 2021</h1>
        <form id="new-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id='new-task-input'
            value={taskInput}
            onChange={handleInputChange}
            placeholder="What do you have planned?"
          />
          <input type="submit"
           id="new-task-submit"
            value="Add task" />
        </form>
      </header>
      <main>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            {tasks.map((task, index) => (
              <div key={index} className="task">
                <div className="content">
                  {task.isEditing ? (
                    <input
                      type="text"
                      className="text"
                      value={task.text}
                      onChange={(event) => handleInputChangeEdit(event, index)}
                      onBlur={() => handleSave(index)}
                      autoFocus
                    />
                  ) : (
                    <input
                      type="text"
                      className="text"
                      value={task.text}
                      readOnly
                    />
                  )}
                </div>
                <div className="actions">
                  <button className="edit" onClick={() => handleEdit(index)}>
                    {task.isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TaskList;
