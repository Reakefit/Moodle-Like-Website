import { Link } from 'react-router-dom';
import image from './images/511752.jpg';
import Navbar from './Navbar';

const Landing = () => {
    return (
        <>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <img src={image} alt="Welcome" style={{
              borderRadius: 8,
              width: 100,
              height: 100
            }} />
            <h4>
              <b>Login or Register</b> to use the student portal
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Please login to access courses and assignments, if you are a new student
              register in the portal before you can access all your courses.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable grey accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div></>
      );
}

export default Landing;
