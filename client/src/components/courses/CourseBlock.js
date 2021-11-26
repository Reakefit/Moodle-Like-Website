import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';

class CourseBlock extends Component {
  constructor(props) {
    super(props);
    this.fetchCourseDetails = this.fetchCourseDetails.bind(this);

    this.state = {
      courseID: "",
      image: "",
      description: "",
      courseName: ""
    }
  }

  componentDidMount () {
    this.fetchCourseDetails();
  }

  fetchCourseDetails() {
    axios.get(
      "http://localhost:5000/api/courses/search?token="+
      Cookie.get("token") +
      "&userId=" +
      Cookie.get("userId") +
      "&value=" +
      this.props.courseID
    )
    .then(res => {
      console.log(res.data[0])
      this.setState({
        courseID: res.data[0].courseID,
        image: res.data[0].image,
        description: res.data[0].description,
        courseName: res.data[0].courseName
      })
    })
    .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={this.state.image}/>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{this.state.courseName}<i className="material-icons right">more_vert</i></span>
          <Link to={'/'+this.state.courseID}>Enter</Link>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-6">{this.state.courseID}<i className="material-icons right">close</i></span>
          <p>{this.state.description}</p>
          <button className="btn btn-small waves-effect waves-light hoverable red accent-3 bottom">Unenroll</button>
        </div>
      </div>
    )
  }
}

export default CourseBlock;
