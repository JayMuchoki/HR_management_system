import React, { useState } from "react";

const FilterEmployees = ({ employees, setFilteredEmployees }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterEmployees(term, departmentFilter);
  };

  const handleDepartmentFilter = (e) => {
    const department = e.target.value.toLowerCase();
    setDepartmentFilter(department);
    filterEmployees(searchTerm, department);
  };

  const filterEmployees = (term, department) => {
    if (term === "" && department === "") {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter((employee) => {
      const nameMatch = employee.name.toLowerCase().includes(term);
      const departmentMatch =
        department === "" || employee.department.toLowerCase().includes(department);
      const emailMatch = employee.email.toLowerCase().includes(term);
      const salaryMatch = employee.salary.toString().includes(term);

      return nameMatch || departmentMatch || emailMatch || salaryMatch;
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Filters</h5>
        <div className="mb-3">
          <label htmlFor="generalSearch" className="form-label">
            General Search:
          </label>
          <input
            type="text"
            className="form-control"
            id="generalSearch"
            placeholder="Search by name, email, salary..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departmentSearch" className="form-label">
            Filter by Department:
          </label>
          <input
            type="text"
            className="form-control"
            id="departmentSearch"
            placeholder="Type department name..."
            value={departmentFilter}
            onChange={handleDepartmentFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterEmployees;
