import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasErrors: false,
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, formType, history, hideModal } = this.props;
    const parsedRoute = nextProps.match.url.match(/[^\/][^\/]*/i);

    const noLoginRedirect = ( parsedRoute == 'leagues' ||
                              parsedRoute == 'stocks' );

    if (nextProps.errors) (
      this.setState({ hasErrors: true })
    );

    if (nextProps.formType != formType) {
      nextProps.clearSessionErrors()
    }

    if (nextProps.loggedIn && noLoginRedirect ) {
      alert(`Welcome ${nextProps.currentUser.username}`)
      hideModal();
    } else if (nextProps.loggedIn) {
      history.push(`/users/${nextProps.currentUser.id}`);
      hideModal();
    }
  }

  update(field) {
    return el => this.setState({
      [field]: el.currentTarget.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);

    this.props.processForm(user).then(actionObj => {
      this.props.requestTargetUserData(actionObj.currentUser.id)
      this.setState({ redirect: true })
    })
  }

  handleGuestLogin(event){
    event.preventDefault();

    this.props.processForm({ username: "Stockafeller",
                             password: "password" });
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
    const { errors, formType } = this.props;

    let ErrorList;
    if (this.state.hasErrors) {
      ErrorList = this.renderErrors(errors);
    }

    let GuestLogin;
    if (formType === 'login') {

    GuestLogin = <input type="submit"
                        value="Login as Guest"
                        onClick={this.handleGuestLogin} />
    }

    return (
      <div className="session">
        { ErrorList }
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

            <h3>~or~</h3>

            { GuestLogin }
          </div>
        </form>

        { this.signupBullets() }
      </div>
    );
  }
}

export default withRouter(SessionForm);
