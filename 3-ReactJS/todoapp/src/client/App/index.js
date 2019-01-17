import React from 'react';
import { generate } from 'shortid';
import AddTask from '../AddTask';
import TaskList from '../TaskList';
import reactImage from './react.png';

import './index.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheck(e, id) {
    const { tasks } = this.state;
    const newTasks = tasks.slice();
    newTasks.find(task => task.id === id).isChecked = e.target.checked;

    this.setState({
      tasks: newTasks,
    });
  }

  handleRemove(e, id) {
    e.stopPropagation();
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.filter(task => task.id !== id),
    });
  }

  handleSubmit(value) {
    if (!value) {
      return;
    }
    const { tasks } = this.state;
    this.setState({
      tasks: [
        ...tasks,
        { id: generate(), text: value, isChecked: false },
      ],
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="container">
        <header>
          <h1>
            <span>
              Tareas ({tasks.length})
            </span>
            <img src={reactImage} alt="ReactJS" />
          </h1>
        </header>
        <AddTask handleSubmit={this.handleSubmit} />

        <TaskList
          tasks={tasks}
          handleCheck={this.handleCheck}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
