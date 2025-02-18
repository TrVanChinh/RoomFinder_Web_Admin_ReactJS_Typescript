import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { Link } from 'react-router-dom'
import { AuthenticatedUser } from '../../../store/account/types';

const LeftMenu = () => {
    const [isToggled, setToggled] = useState(false)
    const [isComponentShow, setIsComponentShow] = useState(false)
    const [isRoomComponentShow, setIsRoomComponentShow] = useState(false)
    const user = useSelector((state: AppState) => state.account.user) as AuthenticatedUser;

  return (
    <ul className={'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' + (isToggled ? ' toggled' : '')}
     id="accordionSidebar">

    {/* <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled "
     id="accordionSidebar"> */}
    {/* Sidebar - Brand */}
    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink" />
      </div>
      {user && user.maLTK === 1 ? (
        <div className="sidebar-brand-text mx-3"> Admin</div>
      ) : (
        <div className="sidebar-brand-text mx-3"> Cộng tác viên</div>
      )}
    </Link>
    {/* Divider */}
    <hr className="sidebar-divider my-0" />
    {/* Nav Item - Dashboard */}
    <li className="nav-item active">
      <a className="nav-link" href="index.html">
        <i className="fas fa-fw fa-tachometer-alt" />
        <span>Trang chủ</span></a>
    </li>
    {/* Divider */}
    <hr className="sidebar-divider" />
    {/* Heading */}

    {/* Nav Item - Pages Collapse Menu */}
    <li className="nav-item">
      <a 
        className={'nav-link' + (isComponentShow ? '':' collapsed')}
        data-toggle="collapse" 
        data-target="#collapseTwo" 
        aria-expanded={isComponentShow ? 'true' : 'false'}
        aria-controls="collapseTwo"
        onClick = {() => setIsComponentShow(!isComponentShow)}
        >
        <i className="fas fa-fw fa-cog" />
        <span>Quản lý người dùng</span>
      </a>
      <div id="collapseTwo" className={'collapse' + (isComponentShow ? ' show':'')} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        
      {user && user.maLTK === 1 ? (
          <div className="bg-white py-2 collapse-inner rounded">
          <Link className="collapse-item" to='/user'>Người dùng</Link>
          <Link className="collapse-item" to='/requires-account'>Yêu cầu đăng ký tài khoản</Link>
        </div>
        ) : (
          <div className="bg-white py-2 collapse-inner rounded">
          <Link className="collapse-item" to='/requires-account'>Yêu cầu đăng ký tài khoản</Link>
        </div>
        )}
       
      </div>
    </li>

    <li className="nav-item">
      <a 
        className={'nav-link' + (isRoomComponentShow ? '':' collapsed')}
        data-toggle="collapse" 
        data-target="#collapseTwo" 
        aria-expanded={isRoomComponentShow ? 'true' : 'false'}
        aria-controls="collapseTwo"
        onClick = {() => setIsRoomComponentShow(!isRoomComponentShow)}
        >
        <i className="fas fa-fw fa-cog" />
        <span>Quản lý phòng</span>
      </a>
      <div id="collapseTwo" className={'collapse' + (isRoomComponentShow ? ' show':'')} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <Link className="collapse-item" to='/rooms'>Danh sách phòng</Link>
          <Link className="collapse-item" to='/report-room'>Phòng bị báo cáo</Link>
        </div>
      </div>
    </li>
    {/* Nav Item - Utilities Collapse Menu */}
    {/* <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-wrench" />
        <span>Quản lý phòng</span>
      </a>
      <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Utilities:</h6>
          <a className="collapse-item" href="utilities-color.html">Colors</a>
          <a className="collapse-item" href="utilities-border.html">Borders</a>
          <a className="collapse-item" href="utilities-animation.html">Animations</a>
          <a className="collapse-item" href="utilities-other.html">Other</a>
        </div>
      </div>
    </li> */}
    {/* Divider */}
    <hr className="sidebar-divider" />
    {/* Heading */}
    {/* <div className="sidebar-heading">
      Addons
    </div> */}
    {/* Nav Item - Pages Collapse Menu */}
    {/* <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
        <i className="fas fa-fw fa-folder" />
        <span>Pages</span>
      </a>
      <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Login Screens:</h6>
          <a className="collapse-item" href="login.html">Login</a>
          <a className="collapse-item" href="register.html">Register</a>
          <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
          <div className="collapse-divider" />
          <h6 className="collapse-header">Other Pages:</h6>
          <a className="collapse-item" href="404.html">404 Page</a>
          <a className="collapse-item" href="blank.html">Blank Page</a>
        </div>
      </div>
    </li> */}
    {/* Nav Item - Charts */}
    {/* <li className="nav-item">
      <a className="nav-link" href="charts.html">
        <i className="fas fa-fw fa-chart-area" />
        <span>Charts</span></a>
    </li> */}
    {/* Nav Item - Tables */}
    {/* <li className="nav-item">
      <a className="nav-link" href="tables.html">
        <i className="fas fa-fw fa-table" />
        <span>Tables</span></a>
    </li> */}
    {/* Divider */}
    <hr className="sidebar-divider d-none d-md-block" />
    {/* Sidebar Toggler (Sidebar) */}
    <div className="text-center d-none d-md-inline">
      <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setToggled(!isToggled)} />
    </div>
    {/* Sidebar Message */}

  </ul>
  )
}

export default LeftMenu
