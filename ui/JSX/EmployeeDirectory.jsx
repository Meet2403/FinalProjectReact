import React from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeTable from "./EmployeeTable.jsx";

import { useLocation, useParams } from 'react-router-dom';

function Params(EmpList) {
  return (props) => <EmpList {...props} {...useParams()} loc={useLocation()} />;
}

class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  async componentDidMount() {
    const fetchEmployees = `
    query{
      getAllEmployees{
        _id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
    }
  }
`;
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fetchEmployees }),
      });

      const data = await response.json();
      console.log("Data from server", data.data.getAllEmployees);
      this.setState({ employees: data.data.getAllEmployees });
    } catch (error) {
      console.log("Error", error);
    }
  }

  render() {
    return (
      <div>
        <EmployeeSearch />
        <div className="row">
          <div className="col-md-6">
            <EmployeeCreate onEmployeeAdded={this.handleEmployeeAdded} />
          </div>
          <div className="col-md-6">
            {/* <EmployeeTable employees={this.state.employees}/> */}
          </div>
        </div>
      </div>
    );
  }
}


export default Params(EmployeeDirectory);
