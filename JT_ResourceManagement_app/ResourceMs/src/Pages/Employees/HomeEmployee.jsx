import useEmployeeInfo from '../../Customhook/Useemployeeinfo';

const HomeEmployee = () => {
  const { employeeInfo, loading, error } = useEmployeeInfo();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid bg-lightblue">
      <div className="row justify-content-center py-5">
        <div className="col-lg-8">
          <div className="d-flex align-items-center p-4 bg-white rounded shadow-sm">
            <div className="flex-grow-1">
              <h3 className="display-4 font-italic text-primary mb-3">Welcome back, {employeeInfo.name}</h3>
              <h5 className="text-muted">You are an employee at <span className="text-secondary">J&J LTD</span></h5>
            </div>
            <img
              src={"http://localhost:3000/images/" + employeeInfo.image}
              alt="Admin"
              className="adminimage rounded-circle ms-3 "
            />
          </div>
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="px-3 pt-4 pb-2 border bg-white rounded shadow-sm text-center">
            <h4 className="text-success">Monthly Salary</h4>
            <hr />
            <h5 className="text-dark">Ksh {employeeInfo.salary}</h5>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h3 className="text-info mb-5">You are currently posted at <span className="text-primary">{employeeInfo.station}</span></h3>
            <h4 className="text-muted">Work post is at the <span className="text-secondary">{employeeInfo.department}</span> department</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEmployee;
