/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";


import logo from "../../assets/img/logo-small.png";
import { useState } from "react/cjs/react.production.min";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();

  // verifies if routeName is the one active (in browser input)
  // const activeRoute = (routeName) => {
  //   return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const userData = JSON.parse(localStorage.userData);
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="/admin/dashboard"
          className="simple-text logo-normal"
        >
          DASHBOARD
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>

          <li>
            <NavLink to="/admin/dashboard" className="nav-link" activeClassName="active">
              <i className="nc-icon nc-tile-56" />
              <p>Dashbord</p>
            </NavLink>
          </li>
          {userData.user.role === "admin" &&
            <>
              <li>
                <NavLink to="/admin/departments" className="nav-link" activeClassName="active" >
                  <i className="nc-icon nc-bank" />
                  <p>Departments</p>
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/employees" className="nav-link" activeClassName="active">
                  <i className="nc-icon nc-single-02" />
                  <p>Employees</p>
                </NavLink>
              </li>
            </>
          }


          {/* <li >
            <NavLink to="/admin/icons" className="nav-link" activeClassName="active" >
              <i className="nc-icon nc-alert-circle-i" />
              <p>Icons</p>
            </NavLink>
          </li> */}

          {/* routes from route.js file */}
          {/* {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })} */}
        </Nav>
      </div>
    </div >
  );
}

export default Sidebar;
