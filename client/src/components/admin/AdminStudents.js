import axios from 'axios';
import React, { Component } from 'react';
import AdminNavbar from '../layout/AdminNavbar';

class AdminStudents extends Component {
    constructor(props) {
        super(props);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            default: [],
            data: [],
            search: ""
        }
    }

    async componentDidMount() {
        await this.fetchStudents();
    }

    async fetchStudents() {
        const response = await fetch(
            "http://localhost:5000/api/users/allUsers"
        );
        const res = await response.json()
        this.setState({
            data: res.array,
            default: res.array
        });
        console.log(this.state.data)
    }

    deleteStudent(id) {
        axios.post("http://localhost:5000/api/users/delete", id)
        .then(window.location.reload())
    }

    onSearch(e) {
        e.preventDefault();
        this.setState({
            search: e.target.value,
        });

        if (e.target.value.length === 0) {
            this.setState({
              data: this.state.default,
            });
            return;
        }

        axios.get(
            "http://localhost:5000/api/users/search?value="+e.target.value
        )
        .then((res) => this.setState({data: res.data}))
        .catch((err) =>{
            console.log(err.response)
            alert({"Error": err.response.data})});
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
                    placeholder="Search by user ID or Name"
                    value={this.state.search}
                    onChange={this.onSearch}                    
                  />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
                </form>
              </div>
              <div className="prevNext">
                <button 
                style={{marginLeft: "5rem"}}
                className="btn btn-small waves-effect waves-light hoverable red accent-3 left"
                > Previous </button>
                <button 
                style={{marginRight: "5rem"}}
                className="btn btn-small waves-effect waves-light hoverable red accent-3 right"
                > Next </button>
              </div>
            </div>
            <div className="allUsers" id="allUsers">
              <table className="striped">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item, i) => {
                    return (
                      <tr
                        key={i}
                      >
                        <td>{item.userId}</td>
                        <td>{item.name}</td>
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

export default AdminStudents
