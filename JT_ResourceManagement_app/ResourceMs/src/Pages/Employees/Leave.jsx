import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormattedDate from "../../utility/FormattedDate";
import useDeleteRequest from "../../Customhook/UseDeleteleaverequest";


const Leave = () => {
  const [request, setRequest] = useState([]);
  const [fetchErrors, setFetchErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleDelete, loading: deleteLoading, errors: deleteErrors } = useDeleteRequest();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchRequest = async () => {
      setFetchErrors(null);
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:3000/employee/userrequest", {
          cancelToken: source.token,
          withCredentials: true
        });

        if (result.data.Status) {
          if (result.data.Result.length === 0) {
            setFetchErrors("No current request made");
          } else {
            setRequest(result.data.Result);
          }
        } else {
          setFetchErrors(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          // Enhanced error handling based on response status
          const errorMsg = err.response ? err.response.data : err.message;
          setFetchErrors("No Request Found");
          console.error("Error details:", errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  return (
    <>
      <Link to={'/dashboardemployee/request_leave'} className="btn btn-primary mb-3">Request For Leave</Link>
      <div>
        {loading && <p>Loading...</p>}
        {fetchErrors && <p>{fetchErrors}</p>}
        {deleteErrors && <p>{deleteErrors}</p>}
        {request.length > 0 ? (
          request.map((r) => (
            <div className="card mb-3 col-10 border shadow-sm" key={r.id}>
              <div className="card-body d-flex justify-content-around">
                <div className="col-1">
                  <h5 className="card-title">Name</h5>
                  <p className="card-text">{r.name}</p>
                </div>
                <div className="col-2">
                  <h5 className="card-title">Email</h5>
                  <p className="card-text">{r.email}</p>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex flex">
                    <h5 className="card-title">Start Date: </h5>
                    <p className="card-text">
                      <FormattedDate date={r.startdate} />
                    </p>
                  </div>
                  <div className="d-flex flex mt-3">
                    <h5 className="card-title">End Date: </h5>
                    <p className="card-text">
                      <FormattedDate date={r.enddate} />
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <h5 className="card-title">Reason</h5>
                  <p className="card-text">{r.reason}</p>
                </div>
                <div className="me-1 flex-column align-items-end">
                  <h5>Status:</h5>
                  <button
                    className={`
                      status-button ${
                      r.status === "Accepted" ? "status-accepted" :
                      r.status === "Declined" ? "status-declined" :
                      "status-pending"
                    }`}
                    disabled
                  >
                    {r.status || "Pending..."}
                  </button>
                  <div className="mt-2">
                    <Link
                      to={"/dashboardemployee/edit_request/" + r.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      disabled={deleteLoading}
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(r.id, () => window.location.reload())}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && !fetchErrors && <p>No current request made</p>
        )}
      </div>
    </>
  );
}

export default Leave;
