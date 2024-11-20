import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import LeftMenu from './LeftMenu/LeftMenu'
import TopBar from './TopBar/TopBar'
import { getCurrentLoginUser } from '../../store/account/thunks';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const alert = useSelector((state: AppState) => state.alert)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentLoginUser())
  },[dispatch])
  return (
    <Fragment>
    {/* Sidebar */}
    <LeftMenu/>
    {/* End of Sidebar */}
    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
        <TopBar/>
        {/* End of Topbar */}
        {/* Begin Page Content */}

        { alert.message && (
          <div className={`alert ${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <div className="container-fluid">
        <Outlet />
        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
      {/* Footer */}
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright © Your Website 2021</span>
          </div>
        </div>
      </footer>
      {/* End of Footer */}
    </div>
    {/* End of Content Wrapper */}
  </Fragment>

  )
}

export default Admin
