import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { signup, confirm } from '../actions/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignup = this.handleSignup.bind(this);
    this.handleConfirm =this.handleConfirm.bind(this);
    this.handleConfirmationError = this.handleConfirmationError.bind(this);
  }

  componentDidMount() {
    const { code, dispatch } = this.props;
    if (code) {
      dispatch(confirm(code)).then(this.handleConfirm, this.handleConfirmationError);
    }
  }

  handleChange(field) {
    return (e) => {
      const state = {};
      state[field] = e.target.value;
      this.setState(state);
    }
  }

  handleSignup(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.dispatch(signup(email, password)).then(
      (success) => this.setState({success: true}),
      (error) => this.setState({error:error})
    );
  }

  handleConfirm() {
    this.props.dispatch(replace('/'));
  }

  handleConfirmationError(error) {
    this.setState({
      error: error.msg
    });
  }

  render() {
    const { code } = this.props;
    const { success, error } = this.state;

    if (success) {
      return <div>
        <h2>Welcome aboard!</h2>
        <p>{'We\'ve sent you an email with a link to confirm your signup'}</p>
      </div>
    }

    if (code && error) {
      return <div>
        <h2>Error confirming signup</h2>
        <p>{error}</p>
      </div>;
    }

    if (code) {
      return <div>
        <h2>Confirming Signup</h2>
        <p>One more moment...</p>
      </div>;
    }

    return <div>
      <h2>Create an account</h2>
      <form onSubmit={this.handleSignup}>
        {error && <h3>Error signing up: {error}</h3>}
        <p>
          <label>Email: </label>
          <input type="email" onChange={this.handleChange('email')}/>
        </p>
        <p>
          <label>Password: </label>
          <input type="password" onChange={this.handleChange('password')}/>
        </p>
        <p>
          <button>Sign Up</button>
        </p>
      </form>
    </div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    code: ownProps.params.code
  };
}

export default connect(mapStateToProps)(Signup);
