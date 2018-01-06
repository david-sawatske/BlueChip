import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasErrors: false
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) (
      this.state.hasErrors = true
    );

    if (nextProps.formType != this.props.formType) {
      nextProps.clearSessionErrors()
    }
  }

  update(field) {
    return el => this.setState({
      [field]: el.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);

    this.props.processForm(user).then(actionObj => {
      this.props.requestTargetUserData(actionObj.currentUser.id)
      this.props.hideModal()
    })
  }

  signupBullets() {
    if (this.props.formType === 'signup') {
      return (
        <ul>
          <li>Realtime equity data</li>
          <li>Historical equity data</li>
          <li>Technical indicators to make the best picks</li>
          <li>Create a league and invite friends</li>
          <li>Join an existing league</li>
          <li>Win bragging rights</li>
        </ul>
      )
    }
  }

  renderErrors(errors) {
    return (
      <ul className="error">
        {errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    let errorList = null;

    if (this.state.hasErrors) {
      errorList = this.renderErrors(this.props.errors.session);
    }

    return (
      <div className="session">
        { errorList }
        <form onSubmit={this.handleSubmit} className="session-form">
          <br/>
          <div className="">
            <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="text-input"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="text-input"
              />
            <br/>
            <input id="session-button"
                   type="submit"
                   value={this.props.formType}
            />
            <br/>
          </div>
        </form>

        { this.signupBullets() }
      </div>
    );
  }
}

export default withRouter(SessionForm);
