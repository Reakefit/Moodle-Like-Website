import React, { Component } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

class AdminNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)

        this.state = {
            isLogin: false,
            name: "",
            redirect: null,
        }
    }

    async componentDidMount() {
        if (!Cookie.get("token")) {
            window.location = '/';
        };
        console.log(Cookie.get("token"))
        console.log(Cookie.get("userId"))

        const response = await fetch(
            "https://black-board-engage.herokuapp.com/api/users/auth?token=" +
            Cookie.get("token") +
            "&userId=" +
            Cookie.get("userId")
        );
        this.setState({
            name: Cookie.get("name"),
        });
    }

    logout(e) {
        e.preventDefault();
        axios
            .get(
                "https://black-board-engage.herokuapp.com/api/users/logout?token=" +
                Cookie.get("token") +
                "&userId=" +
                Cookie.get("userId")
            )
            .then((res) => {
                Cookie.remove("token");
                Cookie.remove("userId");
                this.setState({
                    redirect: "/",
                });
            })
            .catch((err) => {
                Cookie.remove("token");
                Cookie.remove("userId");
                console.log("didnt log out");
            });
    }


    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div className='navbar-fixed'>
                <nav>
                    <div className='nav-wrapper'>
                        <Link className="brand-logo" to='/AdminHome'>
                            <i className='material-icons' style={{ fontSize: 30 }}>school</i>
                            BLACKBOARD
                        </Link>
                        <a href='/Home' data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link id='NewCourse' to='/AdminNewCourse'>Create Course</Link>
                            </li>
                            <li>
                                <Link id='ManageCourses' to='/AdminCourses'>Manage Courses</Link>
                            </li>
                            <li>
                                <Link id='ManageStudents' to='/AdminStudents'>View Students</Link>
                            </li>
                            <li>
                                <button
                                    style={{
                                        marginTop: "0.4rem",
                                        marginRight: "1rem",
                                        widthMax: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                    }}
                                    onClick={this.logout}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-demo">
                    <li>
                        <Link id='MyCourses' to='/UserCourses'>My Courses</Link>
                    </li>
                    <li>
                        <Link id='AddCourse' to='/AddCourses'>Add Courses</Link>
                    </li>
                    <li>
                        <button
                            style={{
                                marginTop: "0.4rem",
                                marginRight: "1rem",
                                widthMax: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                            }}
                            onClick={this.logout}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminNavbar
