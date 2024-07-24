import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            department: "",
            employeeType: "",
            currentStatus: parseInt(1),
            years: "", 
            months: "",
            days: ""
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
            const retirementAge = 70;
const currentDate = new Date();
const doj = new Date(employeeDetails.dateOfJoining);

const years = retirementAge - doj.getFullYear() + currentDate.getFullYear() - employeeDetails.age;
const months = 12 - doj.getMonth() + currentDate.getMonth();
const days = 31 - doj.getDate() + currentDate.getDate();

            this.setState({
                firstName: employeeDetails.firstName,
                lastName: employeeDetails.lastName,
                age: employeeDetails.age,
                dateOfJoining: employeeDetails.dateOfJoining,
                title: employeeDetails.title,
                department: employeeDetails.department,
                employeeType: employeeDetails.employeeType,
                currentStatus: employeeDetails.currentStatus,
                years: years,
                months: months,
                days: days,
            });
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    render() {
        return (
            <Container className="h-100">
                <div className="card">
                    <div className="card-body p-5">
                        <h4 className="text-uppercase text-center mb-5">
                            Employee Details
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
                                    <Form.Control
                                        type="text"
                                        name="Title"
                                        value={this.state.title || ''}
                                        readOnly
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={this.state.department || ''}
                                        readOnly
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Label>Employee Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="employeeType"
                                        value={this.state.employeeType || ''}
                                        readOnly
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Current Status</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="currentStatus"
                                        value={this.state.currentStatus}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                        </Form>
                        <div className="mt-6">
                        <h5 className="text-center mb-3">Retirement Details</h5>
                        <Row className="mb-3">
                            <Col md={4}>
                                <p className="mb-0">Years:</p>
                                <p>{this.state.years}</p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-0">Months:</p>
                                <p>{this.state.months}</p>
                            </Col>
                            <Col md={4}>
                                <p className="mb-0">Days:</p>
                                <p>{this.state.days}</p>
                            </Col>
                        </Row>
                    </div>
                    </div>
                </div>
            </Container>
        );
    }
}
