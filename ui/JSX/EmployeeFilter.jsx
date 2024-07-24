import React from "react";

class EmployeeFilter extends React.Component {
  filter = (e) => {
    e.preventDefault();
    const filterEmp = document.forms.filterEmployee;
    const type = { employeeType: filterEmp.employeeType.value };
    this.props.filterEmployee(type);
  };

  render() {
    return (
      <div>
        <form name="filterEmployee" onSubmit={this.filter}>
          <div className="mb-4">
            <select
              className="form-select form-select p-1"
              name="employeeType"
              defaultValue=""
            >
              <option value="">All Types</option>
              <option value="FullTime">Full-Time</option>
              <option value="PartTime">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
            <button type="submit" className="btn btn-secondary" style={{ marginLeft: "15px" }}>Filter</button>
          </div>

        </form>
      </div>
    );
  }
}

export default EmployeeFilter;