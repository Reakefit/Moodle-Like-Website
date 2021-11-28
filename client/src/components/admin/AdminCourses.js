import React, { Component } from 'react';
import axios from "axios";
import Cookie from "js-cookie";
import AdminNavbar from '../layout/AdminNavbar';

class AdminCourses extends Component {
  constructor(props) {
    super(props);
    this.updateTable = this.updateTable.bind(this);
    this.EditItem = this.EditItem.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      default: [],
      userCourse: [],
      data: [],
      page: [],
      courseId: [],
      userId: "",
      courseID: "",
      search: ""
    }
  }

  async componentDidMount() {
    await this.updateTable();
  }

  async updateTable() {
    const response = await fetch(
      "http://localhost:5000/api/courses?page=" +
      this.state.page +
      "&token=" +
      Cookie.get("token") +
      "&userId=" +
      Cookie.get("userId")
    );
    const res = await response.json()

    this.setState({
      data: res.array,
      default: res.array
    });
  }

  EditItem(course) {
    console.log(course)
    window.location.href = '/EditCourse?value=' + course
    return false;
  }

  onSearch(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
    console.log(e.target.value);

    if (e.target.value.length === 0) {
      this.setState({
        data: this.state.default,
      });
      return;
    }

    axios
      .get(
        "/api/courses/search?value=" +
        e.target.value +
        "&token=" +
        Cookie.get("token") +
        "&userId=" +
        Cookie.get("userId")
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
  }

  render() {
    return (
      <>
        <AdminNavbar />
        <div className="nav-wrapper">
          <div className="search">
            <form className="input-field">
              <input
                type="search"
                id="search"
                placeholder="Search by CourseID or Course Name"
                value={this.state.search}
                onChange={this.onSearch}
              />
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </form>
          </div>
          <div className="prevNext">
            <button
              style={{ marginLeft: "5rem" }}
              className="btn btn-small waves-effect waves-light hoverable red accent-3 left"
            > Previous </button>
            <button
              style={{ marginRight: "5rem" }}
              className="btn btn-small waves-effect waves-light hoverable red accent-3 right"
            > Next </button>
          </div>
        </div>
        <div className="allCourses" id="allCourses">
          <table className="striped">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Professor</th>
                <th>Credits</th>
                <th>Prerequisites</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, i) => {
                return (
                  <tr
                    key={i}
                  >
                    <td>{item.courseID}</td>
                    <td>
                      <a
                        href={item.Url}
                      >
                        {item.courseName}
                      </a>
                    </td>
                    <td>{item.professorName}</td>
                    <td>{item.credits}</td>
                    <td>
                      {item.prerequisite.map((item) => {
                        return item + " ";
                      })}
                    </td>
                    <td>
                      <div className="button">
                        <button
                          id="work"
                          className="btn btn-small waves-effect waves-light hoverable red accent-3"
                          onClick={() => this.EditItem(item.courseID)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default AdminCourses
