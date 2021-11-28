import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import AdminNavbar from "../layout/AdminNavbar";

class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.updateCourse = this.updateCourse.bind(this);
        this.onChange = this.onChange.bind(this);

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

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const value = params.get("value");

        axios
            .get(
                "/api/courses/search?value=" +
                value +
                "&token=" +
                Cookie.get("token") +
                "&userId=" +
                Cookie.get("userId")
            ).then(res => {
                console.log(res)
                this.setState({
                    courseID: res.data[0].courseID,
                    courseName: res.data[0].courseName,
                    professorName: res.data[0].professorName,
                    capacity: res.data[0].capacity,
                    credits: res.data[0].credits,
                    description: res.data[0].description,
                    image: res.data[0].image,
                    Url: res.data[0].Url
                })
            })
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateCourse() {
        axios.post(
            "/api/courses/update",
            this.state
        )
            .then(res => {
                console.log("updated")
                window.location.href = "/AdminCourses"
                return false;
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data
                })
            })
    }

    render() {
        return (
            <>
                <AdminNavbar />
                <form className="col s12" style={{ leftPadding: "25px" }}>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className="helper-text">Course ID</span>
                            <input disabled value={this.state.courseID} id="courseID" type="text" data-length="6"></input>
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
                        onClick={() => this.updateCourse()}
                    >
                        Finish Updating
                    </button>
                </div>
            </>
        )
    }
}

export default EditCourse
