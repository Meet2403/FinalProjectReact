class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: fetchEmployees
        })
      });
      const data = await response.json();
      console.log("Data from server", data.data.getAllEmployees);
      this.setState({
        employees: data.data.getAllEmployees
      });
    } catch (error) {
      console.log("Error", error);
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(EmployeeCreate, {
      onEmployeeAdded: this.handleEmployeeAdded
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }))));
  }
}
class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container mb-5"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      disabled: true,
      className: "form-control form-control-lg p-1",
      placeholder: " Search Component (In Development) \uD83D\uDEE0\uFE0F"
    }));
  }
}
class EmployeeTable extends React.Component {
  render() {
    const {
      employees
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "container mb-5"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-uppercase text-center m-5"
    }, "All Employees List"), /*#__PURE__*/React.createElement("table", {
      className: "table align-middle mb-0 bg-white table-striped"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "bg-light "
    }, /*#__PURE__*/React.createElement("tr", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, employees.map(employee => /*#__PURE__*/React.createElement("tr", {
      key: employee._id,
      className: "text-center"
    }, /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.age), /*#__PURE__*/React.createElement("td", null, employee.dateOfJoining), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, employee.currentStatus ? "1" : "0"))))));
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: ""
    };
  }
  handleChange = event => {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async event => {
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
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
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
        employeeType: ""
      });
      window.location.reload();
    }
  };
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container h-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body p-5"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-uppercase text-center mb-5"
    }, "Register a new Employee"), /*#__PURE__*/React.createElement("form", {
      name: "employeeForm",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "row mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "First Name"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "firstName",
      value: this.state.firstName,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Last Name"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "lastName",
      value: this.state.lastName,
      onChange: this.handleChange
    })))), /*#__PURE__*/React.createElement("div", {
      className: "row mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Age"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      name: "age",
      value: this.state.age,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Date of Joining"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("input", {
      type: "date",
      className: "form-control",
      name: "dateOfJoining",
      value: this.state.dateOfJoining,
      onChange: this.handleChange
    })))), /*#__PURE__*/React.createElement("div", {
      className: "row mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Title"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("select", {
      name: "title",
      className: "form-select form-select p-1",
      value: this.state.title,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Title"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Department"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("select", {
      name: "department",
      className: "form-select p-1",
      value: this.state.department,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select  Department"), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering"))))), /*#__PURE__*/React.createElement("div", {
      className: "row mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Employee Type"), /*#__PURE__*/React.createElement("div", {
      className: "form-outline"
    }, /*#__PURE__*/React.createElement("select", {
      name: "employeeType",
      className: "form-select p-1",
      value: this.state.employeeType,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select  Employee type"), /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "Full Time"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "Part Time"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal"))))), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary"
    }, "Register Employee"))))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById("root"));