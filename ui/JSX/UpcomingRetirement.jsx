    import React from "react";
    import EmployeeFilter from "./EmployeeFilter.jsx";
    import { Container, Table, Row, Col } from "react-bootstrap";

    export default class UpcomingRetirement extends React.Component {
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

    UpcomingRetirements() {
        const { employees } = this.state;
        const today = new Date();
        const toRetire = new Date(today)
        toRetire.setMonth(toRetire.getMonth() + 6);
    
    
        const upcomingRetirements = employees.filter(employee => {
          const doj = new Date(employee.dateOfJoining);
          const age = employee.age;
          const retirementAge = 70;
          const retirementDate = new Date(doj.setFullYear(doj.getFullYear() + retirementAge - age));
          return retirementDate > today && retirementDate <= toRetire
        });
    
        return upcomingRetirements;
      }

    

    render() {
        
        const upcomingRetirements = this.UpcomingRetirements();

        console.log(upcomingRetirements);

        return (
            <Container className="mb-5">
                <h4 className="text-uppercase text-center m-5">Employees With Upcoming Retirement</h4>
                <Row style={{margin: "0 auto", display:"table"}}>
        <Col>
          <EmployeeFilter filterEmployee={this.filterEmp} />
        </Col>
      </Row>
                <Table striped bordered hover className="align-middle mb-0 bg-white">
                    <thead className="bg-light">
                        <tr className="text-center">
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingRetirements.map((employee) => (
                            <tr key={employee._id} className="text-center">
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.age}</td>
                                <td>{employee.dateOfJoining}</td>
                                <td>{employee.title}</td>
                                <td>{employee.department}</td>
                                <td>{employee.employeeType}</td>
                                <td>{employee.currentStatus ? 1 : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
    }
