import React, { Component } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import CourseBlock from './CourseBlock';
import LoggedNavbar from '../layout/LoggedNavbar';
import isEmpty from 'is-empty';

class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.fetchCourses = this.fetchCourses.bind(this);

        this.state = {
            userCourse: [],
            data: [],
            courseId: [],
            userId: "",
            courseID: "",
            search: "",
            key: 0
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
        if (isEmpty(this.state.userCourse)) {
          return <h4>You haven't registered in any courses, Please Enroll under Add Courses</h4>
        } else {
          return (this.state.userCourse.map(course => (<div className="col s2"><CourseBlock courseID={course} key={this.state.key}/></div>)))
        }
    }
    
    render() {
        
        return (
            <><LoggedNavbar />
            <div className='row' key={this.state.key}>
                {this.handleDisplayingCourses()}
            </div>
            </>
        )
    } 
}

export default MyCourses



