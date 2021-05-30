import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      tokenError: false
    };
  }
  handleLogin = () => {
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    if (userEmail.length === 0 || userPassword.length === 0) {
      this.setState({ error: true });
      return false;
    }
    this.setState({ error: false });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      role: "freelancer"
    };
    // this.props.loginUser(userData);
    this.setState({ tokenError: false });
    axios
      .post("/api/users/login", userData)
      .then(response => {
        console.log(response.data.token);
        alert("login successful!");
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
        return this.setState({ tokenError: true });
      });
  };
  render() {
    return (
      <form>
        <h3>Log in</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />{" "}
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div>
          {" "}
          {this.state.error === true ? (
            <span style={{ color: `red` }}>Please fill all the fields.</span>
          ) : (
            ""
          )}{" "}
          {this.state.tokenError === true ? (
            <span style={{ color: `red` }}>Invalid credentials.</span>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={this.handleLogin}
        >
          Sign in
        </button>
        <p className="text-right">
          Don't have an Account?
          <a href="/register">Sign Up</a>
        </p>
      </form>
    );
  }
}

export default Login;
