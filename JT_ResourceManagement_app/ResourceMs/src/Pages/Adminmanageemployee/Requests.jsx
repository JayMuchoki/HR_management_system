import axios from "axios";
import { useEffect, useState } from "react";
import FormattedDate from "../../utility/FormattedDate";
import Dropdown from 'react-bootstrap/Dropdown';
import useDeleteRequest from "../../Customhook/UseDeleteleaverequest";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchRequests = async () => {
      setErrors(null);
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:3000/auth/requests", {
          cancelToken: source.token,
        });
        if (result.data.Status) {
          setRequests(result.data.Result);
        } else {
          setErrors(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error(err);
          setErrors("An error occurred while fetching the request.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  const { handleDelete, loading: deleteLoading, errors: deleteErrors } = useDeleteRequest();

  const handleDeleteRequest = async (id) => {
    setLoading(true);
    try {
      await handleDelete(id);
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    } catch (err) {
      console.error(err);
      setErrors("An error occurred while deleting the request.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdateLoading(true);
    try {
      const result = await axios.put(`http://localhost:3000/auth/requests/${id}/status`, { status });
      if (result.data.Status) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status } : request
          )
        );
      } else {
        setErrors(result.data.Error);
      }
    } catch (err) {
      console.error(err);
      setErrors("An error occurred while updating the status.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (errors && deleteErrors) return <p>{errors}</p>;
  if (loading && !updateLoading) return <p>Loading...</p>;

  return (
    <>
      <h5 className="text-primary mb-3">Review Employees Leave Requests</h5>
      <div>
        {requests.map((request) => (
          <div className="card mb-3 col-10 border shadow-sm" key={request.id}>
            <div className="card-body d-flex justify-content-around">
              <div className="col-1">
                <h5 className="card-title">Name</h5>
                <p className="card-text">{request.name}</p>
              </div>
              <div className="col-2">
                <h5 className="card-title">Email</h5>
                <p className="card-text">{request.email}</p>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex flex">
                  <h5 className="card-title">Start Date: </h5>
                  <p className="card-text">
                    <FormattedDate date={request.startdate} />
                  </p>
                </div>
                <div className="d-flex flex mt-3">
                  <h5 className="card-title">End Date: </h5>
                  <p className="card-text">
                    <FormattedDate date={request.enddate} />
                  </p>
                </div>
              </div>
              <div className="col-3">
                <h5 className="card-title">Reason</h5>
                <p className="card-text">{request.reason}</p>
              </div>
              <div className="me-1 flex-column align-items-end">
                <h5>Status: {request.status || "Pending..."}</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={updateLoading}>
                    {updateLoading ? "Updating..." : request.status || "Set Status"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusUpdate(request.id, "Accepted")}>
                      Accept
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusUpdate(request.id, "Declined")}>
                      Decline
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="mt-2 d-flex ">
                  <button
                    disabled={loading || deleteLoading}
                    className="btn btn-warning btn-sm "
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Requests;
