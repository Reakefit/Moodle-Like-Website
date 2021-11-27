import React from "react";
import AdminNavbar from "../components/layout/AdminNavbar";

const AdminHome = () => {
    return (
        <>
            <AdminNavbar />
            <h4 className="center-align" style={{marginTop: "35vh"}}>Welcome Admin, here you can create new courses, manage existing courses and manage students</h4>
            <div className="flex-wrapper"
            style={{display: "flex",
                minHeight: "54vh",
                flexDirection: "column"}}>
            <footer class="page-footer" style={{marginTop: "auto"}}>
                <div class="container">
                  <div class="row">
                    <div class="col l6 s12">
                      <h5 class="white-text">Thanks for Trying BlackBoard</h5>
                      <p class="grey-text text-lighten-4">In case of any bugs/recommendations please mail mouni221100@gmail.com. Would love to work on them.</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                      <h5 class="white-text">Know more about me</h5>
                      <ul>
                        <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/mouni-malyala-121533179/">LinkedIn</a></li>
                        <li><a class="grey-text text-lighten-3" href="https://github.com/Reakefit">GitHub</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
            </footer>
            </div>
        </>
    )
}

export default AdminHome