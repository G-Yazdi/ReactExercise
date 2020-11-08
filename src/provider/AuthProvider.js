import React, { Component, createContext } from "react";
import { auth } from "services/firebase";

export const UserContext = createContext({ user: null });
class AuthProvider extends Component {
  _isMounted = false;
  state = {
    user: null,
  };

  componentDidMount = () => {
    this._isMounted = true;
    auth.onAuthStateChanged((userAuth) => {
      if (this._isMounted) this.setState({ user: userAuth });
    });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default AuthProvider;
