import React, { Component } from "react";
import Login from "../Login";
import Signup from "../Signup";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
       
        {/* <Login show={this.state.show} handleClose={this.hideModal}>
          <p>Login</p>
        </Login>
        <button className="text-lobster" type="button" onClick={this.showModal}>
          Login
        </button> */}
        <Signup show={this.state.show} handleClose={this.hideModal}>Sign Up</Signup>
        <a href="#/dashboard" className="text-lobster" type="button" onClick={this.showModal}>
          Sign Up
        </a>
      </main>
    );
  }

}

export default Dashboard