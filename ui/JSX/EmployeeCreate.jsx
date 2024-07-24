import React from "react";
export default class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.firstName == "") {
      alert("First name should not be empty!");
      return;
    }

    if (this.state.lastName == "") {
      alert("Last name should not be empty!");
      return;
    }

    if (this.state.age < 20 || this.state.age > 70) {
      alert("Age must be between 20 and 70!");
      return;
    }
    const query = `
        mutation {
          addNewEmployee(employee: {
            firstName: "${this.state.firstName}",
            lastName: "${this.state.lastName}",
            age: ${this.state.age},
            dateOfJoining: "${this.state.dateOfJoining}",
            title: "${this.state.title}",
            department: "${this.state.department}",
            employeeType: "${this.state.employeeType}",
          }) {
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
          }
        }
      `;
    const res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const response = await res.json();
    if (response.errors) {
      console.log(response.errors[0].message);
    } else {
      const addedEmployee = response.data.addNewEmployee;
      console.log("New Employee Added!", addedEmployee);
      this.setState({
        employees: [addedEmployee],
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
      });
      window.location.href = '/#/'
    }
  };

  render() {
    return (
      <div className="container h-100">
        <div className="card">
          <div className="card-body p-5">
            <h4 className="text-uppercase text-center mb-5">
              Register a new Employee
            </h4>
            <form name="employeeForm" onSubmit={this.handleSubmit}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Age</label>
                  <div className="form-outline">
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date of Joining</label>
                  <div className="form-outline">
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfJoining"
                      value={this.state.dateOfJoining}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <div className="form-outline">
                    <select
                      name="title"
                      className="form-select form-select p-1"
                      value={this.state.title}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Title</option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Director">Director</option>
                      <option value="VP">VP</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Department</label>
                  <div className="form-outline">
                    <select
                      name="department"
                      className="form-select p-1"
                      value={this.state.department}
                      onChange={this.handleChange}
                    >
                      <option value="">Select  Department</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Employee Type</label>
                  <div className="form-outline">
                    <select
                      name="employeeType"
                      className="form-select p-1"
                      value={this.state.employeeType}
                      onChange={this.handleChange}
                    >
                      <option value="">Select  Employee type</option>
                      <option value="FullTime">Full Time</option>
                      <option value="PartTime">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Seasonal">Seasonal</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Register Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}