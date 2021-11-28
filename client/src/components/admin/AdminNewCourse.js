import axios from 'axios';
import React, { Component } from 'react';
import AdminNavbar from '../layout/AdminNavbar';

class AdminNewCourse extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.createCourse = this.createCourse.bind(this);

        this.state = {
            courseID: "",
            courseName: "",
            professorName: "",
            capacity: "",
            credits: "",
            description: "",
            image: "",
            Url: "",
            errors: {}
        }
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    createCourse() {
        axios.post("http://localhost:5000/api/courses/add", this.state)
            .then(res => {
                console.log("updated")
                window.location.href = "/AdminCourses"
                return false;
            })
    }

    render() {
        return (
            <>
                <AdminNavbar />
                <h4>Create Course</h4>
                <form className="col s12" style={{ leftPadding: "25px" }}>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Course ID</span>
                            <input onChange={this.onChange} value={this.state.courseID} id="courseID" type="text"></input>
                            <span className="red-text">
                                {this.state.errors.courseID}
                                {this.state.errors.courseIDInvalid}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Course Name</span>
                            <input onChange={this.onChange} value={this.state.courseName} id="courseName" type="text"></input>
                            <span className="red-text">
                                {this.state.errors.courseName}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Professor Name</span>
                            <input onChange={this.onChange} value={this.state.professorName} id="professorName" type="text"></input>
                            <span className="red-text">
                                {this.state.errors.professorName}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Capacity</span>
                            <input onChange={this.onChange} value={this.state.capacity} id="capacity" type="text"></input>
                            <span className="red-text">
                                {this.state.errors.capacity}
                                {this.state.errors.capacityInvalid}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Credits</span>
                            <input onChange={this.onChange} value={this.state.credits} id="credits" type="text"></input>
                            <span className="red-text">
                                {this.state.errors.credits}
                                {this.state.errors.creditsInvalid}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Description</span>
                            <input onChange={this.onChange} value={this.state.description} id="description" type="text"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Image</span>
                            <input onChange={this.onChange} value={this.state.image} id="image" type="text"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Url</span>
                            <input onChange={this.onChange} value={this.state.Url} id="Url" type="text"></input>
                        </div>
                    </div>
                </form>
                <div className="button">
                    <button
                        id="work"
                        className="btn btn-small waves-effect waves-light hoverable red accent-3"
                        onClick={() => this.createCourse()}
                    >
                        Create
                    </button>
                </div>
            </>
        )
    }
}

export default AdminNewCourse
