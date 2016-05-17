import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    const { user } = this.props;

    return <div>
      <h1>Authlify Example</h1>
      {user && <div>
        <h3>Logged in as <strong>{user.email}</strong></h3>
      </div>}
      {!user && <div>
        <h3><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></h3>
      </div>}

      {this.props.children}
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default connect(mapStateToProps)(App);
