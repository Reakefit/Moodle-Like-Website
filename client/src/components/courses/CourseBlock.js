import React, { Component } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

class CourseBlock extends Component {
  constructor(props) {
    super(props);
    this.fetchCourseDetails = this.fetchCourseDetails.bind(this);
    this.unenroll = this.unenroll.bind(this);

    this.state = {
      _id: "",
      courseID: "",
      image: "",
      description: "",
      courseName: "",
      Url: ""
    }
  }

  componentDidMount() {
    this.fetchCourseDetails();
  }

  fetchCourseDetails() {
    axios.get(
      "/api/courses/display?token=" +
      Cookie.get("token") +
      "&userId=" +
      Cookie.get("userId") +
      "&value=" +
      this.props.courseID
    )
      .then(res => {
        console.log(res.data[0])
        this.setState({
          _id: res.data[0]._id,
          courseID: res.data[0].courseID,
          image: res.data[0].image,
          description: res.data[0].description,
          courseName: res.data[0].courseName,
          Url: res.data[0].Url
        })
      })
      .catch(err => console.log(err.response));
  }

  unenroll(e) {
    e.preventDefault();
    axios.post(
      "/api/users/removeCourse?token=" +
      Cookie.get("token") +
      "&userId=" +
      Cookie.get("userId") +
      "&courseId=" +
      this.state._id
    )
      .then(window.location.reload())
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={this.state.image} alt="Admin is yet to add a image for this course" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{this.state.courseName}<i className="material-icons right">more_vert</i></span>
          <a href={"http://localhost:3000/channel?name=" + this.state.courseID}>Enter</a>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-6">{this.state.courseID}<i className="material-icons right">close</i></span>
          <p>{this.state.description}</p>
          <button className="btn btn-small waves-effect waves-light hoverable red accent-3 bottom"
            onClick={this.unenroll}>Unenroll</button>
        </div>
      </div>
    )
  }
}

export default CourseBlock;
