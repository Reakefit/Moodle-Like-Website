import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser, logoutUser } from '../../actions/AuthActions'
import classnames from 'classnames'

const Login = () => {

    const login = useSelector(state => state.auth);

    console.log(login);

    const initialState = {
        email: '',
        password: '',
        errors: {} 
    };

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(logoutUser()); 
    }, []);

    const [state, setState] = useState(initialState);

    const userData = {
        email: state.email,
        password: state.password
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatchEvent(loginUser(userData));
    }

    const onChange = (e) => {
        setState(...state, {[e.target.id]: e.target.value});
    }

    const { errors } = state.errors;

    return (
        <>
        <Navbar/>
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back to
                  home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Login</b> below
                  </h4>
                  <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
                <form noValidate onSubmit={onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={onChange}
                      value={state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password || errors.passwordincorrect
                      })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
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
    );
}

export default Login;