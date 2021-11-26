import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import classnames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isLogin = this.isLogin.bind(this);

    this.state = {
      userId: "",
      password: "",
      isAdmin: false,
      errors: {}
    };
  }

  onChangeID(e) {
    this.setState({
      userId: e.target.value,
    });
    console.log(this.state.userId)
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      userId: this.state.userId.toString(),
      password: this.state.password.toString(),
    };
    console.log(newUser);
    axios
      .post("http://localhost:5000/api/users/login", newUser)
      .then((res) => {
        console.log(res.data);
        Cookie.set("token", res.data.token);
        Cookie.set("userId", res.data.userId);
        Cookie.set("name", res.data.name);

        this.setState({
          isAdmin: res.data.isAdmin,
        });
        if (this.state.isAdmin) {
          window.location = "/AdminHome";
        } else {
          window.location = "/Home";
        }
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data
        })
        console.log(err.response.data)
        Cookie.remove("token");
        Cookie.remove("userId");
      });
  }

  isLogin() {
    if (!Cookie.get("token")) return false;
    else return Cookie.get("token") !== "" && Cookie.get("userId") !== "";
  }

  render() {
    return (
      <>
      <Navbar />
      <div className='container'>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect' >
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangeID}
                    value={this.state.userId}
                    id="userId"
                    type="text"
                    className={classnames("", {
                      invalid: this.state.errors.userIdnotfound || this.state.errors.userId
                    })}
                  />
                  <label htmlFor="userId">userId</label>
                  <span className="red-text">
                    {this.state.errors.userId}
                    {this.state.errors.userIdnotfound}
                  </span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChangePassword}
                    value={this.state.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: this.state.errors.passwordincorrect || this.state.errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                    {this.state.errors.password}
                    {this.state.errors.passwordincorrect}
                  </span>
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
                    Login
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

export default Login;
