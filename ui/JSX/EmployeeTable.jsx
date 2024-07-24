import React from "react";
import { Link } from "react-router-dom";
import EmployeeFilter from "./EmployeeFilter.jsx";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

export default class EmployeeTable extends React.Component {
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

  filterEmp = (employeeType) => {
    const type = employeeType.employeeType
    this.filterEmployee(type)
  }

  async filterEmployee(employeeType) {
    const query = `
      query getEmployeeByType($employeeType: String) {
        getEmployeeByType(employeeType: $employeeType) {
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
    const variables = { employeeType };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    this.setState({ employees: data.data.getEmployeeByType });
  }

  render() {

    const { employees } = this.state;
    async function handleDelete(id, status) {
      const mutation = `
          mutation DeleteEmployee($employeeId: ID!) {
            deleteEmployee(_id: $employeeId) {
              _id
            }
          }
        `;

      const variables = {
        employeeId: id,
      };

      if(status === 0){
        console.log(status)

      try {
        const response = await fetch("http://localhost:8000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: mutation,
            variables,
          }),
        });

        const responseData = await response.json();
        if (responseData.data.deleteEmployee) {
          console.log("Employee deleted:", responseData.data.deleteEmployee);
          window.location.reload();
        } else if (responseData.errors) {
          console.error("GraphQL errors:", responseData.errors);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    } else {
      alert('CANNOT DELETE EMPLOYEE-STATUS ACTIVE')
    }
  }

    return (
      <Container className="mb-5">
      <Row>
        <Col>
          <h4 className="text-uppercase text-center m-5">All Employees List</h4>
        </Col>
      </Row>
      <Row style={{margin: "0 auto", display:"table"}}>
        <Col>
          <EmployeeFilter filterEmployee={this.filterEmp} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Date of Joining</th>
                <th>Title</th>
                <th>Department</th>
                <th>Employee Type</th>
                <th>Current Status</th>
                <th  style={{width: "200px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="text-center">
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.age}</td>
                  <td>{employee.dateOfJoining}</td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employeeType}</td>
                  <td>{employee.currentStatus ? 1 : 0}</td>
                  <td>
                  <Link to={`/details/${employee._id}`}>
                      <Button variant="secondary">&#128712;</Button>
                    </Link>
                    <Link to={`/edit/${employee._id}`}  style={{ marginLeft: "10px" }}>
                      <Button variant="secondary">&#128393;</Button>
                    </Link>
                    <Button
                      variant="secondary"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(employee._id, employee.currentStatus)}
                    >
                      🗑
                    </Button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    );
  }
}
