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
