

# Test

- Clonar repo y mostrar el hello world
- Retomar **react-step-0** de todo-app e ir incluyendo snippets de codigo

    - Mostrar el hello world nuevamente
    - Agregar Header con imagen
        ```jsx
        render() {
            return (
                <div className="container">
                    <header>
                        <h1>
                            <span>
                            Tareas (0)
                            </span>
                            <img src={reactImage} alt="ReactJS" />
                        </h1>
                    </header>
                </div>
            );
        }
        ```
    - Hacer App Stateful
        ```jsx
        constructor() {
            super();

            this.state = {
                tasks: [],
            };
        }
        ```
    - Lista de tareas
        ```html
            <div className="TaskList">
                {tasks.map(task => (
                    <li key={task.id}>
                        <div className={`alert task`}>
                            <div className="task__body">
                                <span>{task.text}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        ```
    - Extraer lista de Tareas a un stateless component + Proptypes
      - Sin handleCheck y handleRemove
      ```jsx
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

      ```
    - AddTask (completo porque maneja estado en el input)
        ```jsx
            import React from 'react';
            import PropTypes from 'prop-types';
            import './index.scss';

            class AddTask extends React.Component {
            constructor(props) {
                super(props);

                this.state = { value: '' };

                this.handleSubmit = this.handleSubmit.bind(this);
                this.handleChange = this.handleChange.bind(this);
            }

            handleSubmit(e) {
                e.preventDefault();

                this.setState({ value: '' });

                this.props.handleSubmit(this.state.value);
            }

            handleChange(e) {
                this.setState({ value: e.target.value });
            }

            render() {
                return (
                    <form className="AddTask" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">+</span>
                            </div>
                            <input
                                id="input-todo"
                                className="form-control"
                                type="text"
                                placeholder="Add some tasks..."
                                value={this.state.value}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </form>
                    );
                }
            }

            AddTask.propTypes = {
                handleSubmit: PropTypes.func.isRequired,
            };

            export default AddTask;
        ```
    - Agregar botón de borrar tarea
    - Agregar checkbox a Task

