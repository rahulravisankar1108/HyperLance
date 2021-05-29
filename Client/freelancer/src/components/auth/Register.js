import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import axios from 'axios';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {},
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = (e) => {
        e.preventDefault();
        if(this.isFormValid() === true) {
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2,
                role:'freelancer',
            }; 
            axios.post('/api/users/register', newUser)
            .then(response => {
              console.log(response.data);
              alert('login successful!');
              this.props.history.push('/dashboard');
            })
            .catch(err => {
              console.log(err);
            });
        }
      };

      isFormValid = () => {
        const userEmail = this.state.email;
        const userName = this.state.name;
        const userPassword = this.state.password;
        const userPassword2 = this.state.password2;
        if (userEmail.length === 0 || userPassword.length === 0 || userName.length === 0 || userPassword2.length === 0) {
          this.setState({ errors : "please fill all the fields." });
          return false;
        } else {
          this.setState({ error: false, formValidation: true });
          return true;
        }
      };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate onSubmit={this.onSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <span className="red-text">{errors.name}</span>
                    <input type="text" onChange={this.onChange} value={this.state.name} error={errors.name} className="form-control" placeholder="First name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <span className="red-text">{errors.email}</span>
                    <input type="email" onChange={this.onChange} value={this.state.email} error={errors.email}  className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <span className="red-text">{errors.password}</span>
                    <input type="password" onChange={this.onChange} value={this.state.password} error={errors.password}  className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <span className="red-text">{errors.password2}</span>
                    <input type="password" onChange={this.onChange} value={this.state.password2} error={errors.password2}  className="form-control" placeholder="Enter confirm password" />
                </div>
                <br></br>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="my-1">
                    Already have an Account? <Link to="/login">Sign In</Link>
                </p>
            </form>
        );
    }
}

export default SignUp

