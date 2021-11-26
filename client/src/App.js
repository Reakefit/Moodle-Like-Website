import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Home from "./Pages/Home";
import Register from './components/auth/Register';
import StudentLogin from './Pages/StudentLogin';
import MyCoursePage from './Pages/MyCoursePage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/Home' element={<StudentLogin />} />
          <Route exact path='/UserCourses' element={<MyCoursePage />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
