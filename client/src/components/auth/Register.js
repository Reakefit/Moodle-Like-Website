import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userId: "",
      name: "",
      password: "",
      ConfirmPassword: "",
      errors: "",
    };
  }

  onChangeID(e) {
    this.setState({
      userId: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      ConfirmPassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userId: this.state.userId,
      name: this.state.name,
      password: this.state.password,
      ConfirmPassword: this.state.ConfirmPassword
    };

    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then((res) => {
        console.log("Success");
        window.location = "/";
      })
      .catch((err) => this.setState({
        errors: err.response.data
      }));
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangeName}
                    value={this.state.name}
                    error={this.state.errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: this.state.errors.name
                    })}
                  />
                  <label htmlFor="name">Name</label>
                  <span className="helper-text">Alphanumeric</span>
                  <span className="red-text">{this.state.errors.name}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangeID}
                    value={this.state.userId}
                    error={this.state.errors.userId}
                    id="userId"
                    type="text"
                    className={classnames("", {
                      invalid: this.state.errors.userId
                    })}
                  />
                  <label htmlFor="userId">UserID</label>
                  <span className="helper-text">numeric only</span>
                  <span className="red-text">{this.state.errors.userId}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangePassword}
                    value={this.state.password}
                    error={this.state.errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: this.state.errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{this.state.errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangeConfirmPassword}
                    value={this.state.ConfirmPassword}
                    error={this.state.errors.ConfirmPassword}
                    id="ConfirmPassword"
                    type="password"
                    className={classnames("", {
                      invalid: this.state.errors.ConfirmPassword
                    })}
                  />
                  <label htmlFor="ConfirmPassword">Confirm Password</label>
                  <span className="red-text">{this.state.errors.ConfirmPassword}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Register

