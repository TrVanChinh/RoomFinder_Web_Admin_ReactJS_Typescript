import React from 'react';
import './App.css';
import './styles/sb-admin-2.min.css';
import './assets/font-awesome/css/all.min.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Account/Login';
import Admin from './pages/Admin/Admin';
import {PrivateRoute} from './components/PrivvateRoute';
import {AccountRoute} from './components/AccountRoute';
import Home from './pages/Admin/Home/Home';
import User from './pages/Admin/User/User';
import  AddUser  from './pages/Admin/User/AddUser';
import EditUser from './pages/Admin/User/EditUser';
import RequiresAccount from './pages/Admin/User/RequiresAccount';
import DetailAccount from './pages/Admin/User/DetailAccount';
import Room from './pages/Admin/Room/Room';

function App() {
 
  return (
    <div className="App" id="wrapper">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Admin />}>
              <Route index element={<Home />} /> 
              <Route path="user" element={<User />} />
              <Route path="user-add" element={<AddUser />} />
              <Route path="user-edit/:id" element={<EditUser />} />
              <Route path="requires-account" element={<RequiresAccount />} />
              <Route path="detail-account/:id" element={<DetailAccount />} />
              <Route path="rooms" element={<Room />} />

            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
