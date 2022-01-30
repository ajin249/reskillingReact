import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "views/Login";
import Register from "views/Register";

function SiteLayout(props) {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
      </Switch>
    </div>
  );
}

export default SiteLayout;