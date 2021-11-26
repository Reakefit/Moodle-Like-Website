import React, { Component } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import CourseBlock from './CourseBlock';

class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.fetchCourses = this.fetchCourses.bind(this);

        this.state = {
            default: [],
            userCourse: [],
            data: [],
            page: 1,
            courseId: [],
            userId: "",
            courseID: "",
            search: "",
        }
    }
    
    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses() {
        axios.get(
            "http://localhost:5000/api/users/userCourse?token=" +
            Cookie.get("token") +
            "&userId=" +
            Cookie.get("userId")
        )
        .then((res) => {
            this.setState({
                userCourse: res.data[0].courses,
            });
        })
        .catch((err) => alert("Error: " + err));
    }

    handleDisplayingCourses = () => {
        if (!this.state.userCourse) {
          return <p>You haven't registered in any courses</p>
        } else {
          return (this.state.userCourse.map(course => (<div className="col s2"><CourseBlock courseID={course}/></div>)))
        }
    }
    
    render() {
        return (
            <div className='row'>
                {this.handleDisplayingCourses()}
            </div>
        )
    } 
}

export default MyCourses



