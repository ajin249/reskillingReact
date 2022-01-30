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
// react plugin used to create charts
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components

function Dashboard() {
  const userData = JSON.parse(localStorage.userData);
  return (
    <>
      <div className="content">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Login Details</CardTitle>
              </CardHeader>
              <CardBody>
                First Name: {userData.user.firstName}<br />
                Last Name: {userData.user.lastName}<br />
                Email: {userData.user.email}<br />
                Role: {userData.user.role}<br />
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
