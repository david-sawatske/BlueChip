import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasErrors: false,
      redirect: false
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
      this.setState({ redirect: true })
    })
  }

  signupBullets() {
    if (this.props.formType === 'signup') {
      return (
        <ul className="signup-bullets">
          <li>Realtime equity data</li>
          <li>Historical equity data</li>
          <li>Create or Join Leagues</li>
          <li>Win bragging rights!</li>
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
      if (this.state.redirect) {
        const currentUserURL = `users/${this.props.currentUser.id}`

        this.props.hideModal()
        return <Redirect to={currentUserURL}/>;
      }

    if (this.state.hasErrors) {
      errorList = this.renderErrors(this.props.errors);
    }

    return (
      <div className="session">
        { errorList }
        <form onSubmit={this.handleSubmit}>
          <div className="session-input">
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')} />

            <input type="password"
              value={this.state.password}
              onChange={this.update('password')} />

            <input type="submit"
                   value="Start Trading" />
          </div>
        </form>

        { this.signupBullets() }
      </div>
    );
  }
}

export default withRouter(SessionForm);
