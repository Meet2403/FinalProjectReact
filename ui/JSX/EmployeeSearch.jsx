import React from "react";

export default class EmployeeSearch extends React.Component {
  render() {
    return (
      <div className="container">
        <input
          type="text"
          disabled
          className="form-control form-control-sm p-1"
          placeholder=" Search Component"
        ></input>
      </div>
    );
  }
}
