import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            department: "",
            employeeType: "",
            currentStatus: parseInt(1),
        };
    }

    componentDidMount() {
        const employeeId = window.location.href.split("/").pop();
        this.getEmployeeDetails(employeeId);
    }

    getEmployeeDetails = async (employeeId) => {
        const query = `
            query getEmployeeById($id: ID!) {
                getEmployeeById(_id: $id) {
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

        const variables = {
            id: employeeId,
        };

        try {
            const response = await fetch("http://localhost:8000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });

            const data = await response.json();
            const employeeDetails = data.data.getEmployeeById;
            this.setState({
                firstName: employeeDetails.firstName,
                lastName: employeeDetails.lastName,
                age: employeeDetails.age,
                dateOfJoining: employeeDetails.dateOfJoining,
                title: employeeDetails.title,
                department: employeeDetails.department,
                employeeType: employeeDetails.employeeType,
                currentStatus: employeeDetails.currentStatus,
            });
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleNumChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: parseInt(value) });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, department, employeeType, currentStatus } = this.state;
        const employeeId = window.location.href.split("/").pop();
        const mutation = `
            mutation editEmployee($employeeId: ID!, $employee: editEmployee!) {
                editEmployee(_id: $employeeId, employee: $employee) {
                    title
                    department
                    employeeType
                    currentStatus
                }
            }
        `;

        const variables = {
            employeeId,
            employee: {
                title,
                department,
                employeeType,
                currentStatus,
            },
        };
        console.log(variables);

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

            const data = await response.json();
            if (data.data.editEmployee) {
                console.log("Employee updated successfully");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    render() {
        return (
            <Container className="h-100">
                <div className="card">
                    <div className="card-body p-5">
                        <h4 className="text-uppercase text-center mb-5">
                            Edit Employee Details
                        </h4>
                        <Form name="employeeEditForm" onSubmit={this.handleSubmit}>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={this.state.firstName || ''}
                                        readOnly
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={this.state.lastName || ''}
                                        readOnly
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={this.state.age || ''}
                                        readOnly
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Date of Joining</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dateOfJoining"
                                        value={this.state.dateOfJoining || ''}
                                        readOnly
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Select
                                        name="title"
                                        value={this.state.title || ''}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Title</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Director">Director</option>
                                        <option value="VP">VP</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select
                                        name="department"
                                        value={this.state.department || ''}
                                        onChange={this.handleChange}
                                    >
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Engineering">Engineering</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Label>Employee Type</Form.Label>
                                    <Form.Select
                                        name="employeeType"
                                        value={this.state.employeeType || ''}
                                        onChange={this.handleChange}
                                    >
                                        <option value="FullTime">Full Time</option>
                                        <option value="PartTime">Part Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Seasonal">Seasonal</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Current Status</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="currentStatus"
                                        value={this.state.currentStatus}
                                        onChange={this.handleNumChange}
                                    />
                                </Col>
                            </Row>

                            <div className="text-center">
                                <Button type="submit" variant="primary">
                                    Update Employee
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        );
    }
}

export default EditEmployee;
