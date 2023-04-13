import React, { Component } from "react";
import Login from "../Login";
import Signup from "../Signup";

class Dashboard2 extends Component {
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
       
        <Login show={this.state.show} handleClose={this.hideModal}>
          <p>Login</p>
        </Login>
        <a href="#/dashboard2" className="text-lobster" type="button" onClick={this.showModal}>
          Login
        </a>
        {/* <Signup show={this.state.show} handleClose={this.hideModal}>Sign Up</Signup>
        <button className="text-lobster" type="button" onClick={this.showModal}>
          Sign Up
        </button> */}
      </main>
    );
  }

}

export default Dashboard2