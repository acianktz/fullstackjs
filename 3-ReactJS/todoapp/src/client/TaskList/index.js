import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TaskList = (props) => {
  const { tasks, handleCheck, handleRemove } = props;

  return (
    <div className="TaskList">
      {tasks.map(task => (
        <li key={task.id}>
          <div className={`alert task ${task.isChecked ? 'checked' : ''}`}>
            <div className="task__body">
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={e => handleCheck(e, task.id)}
              />
              <span>{task.text}</span>
            </div>
            <button
              type="button"
              className="btn btn-xs btn-link"
              onClick={e => handleRemove(e, task.id)}
            >
              <span className="task__close close">×</span>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};


export default TaskList;
