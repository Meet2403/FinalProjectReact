import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditEmployee from "./EditEmployee.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import UpcomingRetirement from "./UpcomingRetirement.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";

const NotFound = () => <h1>Page Not Found</h1>;

export default function Navbar() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="#" style={{ color: "white" }}>Employee Management System</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/"} style={{ color: "white" }}>All Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-employee"} style={{ color: "white" }}>Add an Employee</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/upcoming-retirement"} style={{ color: "white" }}>Upcoming Retirement</Link>
            </li>
            <li className="nav-item" style={{ marginLeft: "400px" }}>
              <EmployeeSearch />
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" exact element={<EmployeeTable />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/details/:id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<EmployeeCreate />} />
        <Route path="/upcoming-retirement" element={<UpcomingRetirement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
