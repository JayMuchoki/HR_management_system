import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchReports = async () => {
      setErrors(null);
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:3000/auth/reports", {
          cancelToken: source.token,
        });
        if (result.data.Status) {
          setReports(result.data.Result);
        } else {
          setErrors(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error(err);
          setErrors("An error occurred while fetching the reports.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);
  const handleDelete = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const result = await axios.delete(
        "http://localhost:3000/auth/delete_report/" + id
      );
      if (result.data.Status) {
        window.location.reload();
      } else {
        setErrors(result.data.Error);
      }
    } catch (error) {
      console.error(error);
      alert("unable to delete");
    } finally {
      setLoading(false);
    }
  };

  if (errors) return <p>{errors}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Link to={"/dashboard/create_report"} className="btn btn-primary mb-3">
        Create a new Report/Event
      </Link>
      <div>
        {reports.map((r) => (
          <div className="card mb-3 col-10 border shadow-sm " key={r.id}>
            <div className="card-body d-flex justify-content-around">
              <div className="col-10 ">
                <h3 className="card-title">Agenda</h3>
                <p className="card-text">{r.report}</p>
              </div>
              <div className="me-1 flex-column align-items-end">
                <h3>Action</h3>
                <div>
                  <Link
                    to={"/dashboard/edit_report/" + r.id}
                    className="btn btn-success btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={loading}
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(r.id)}
                  >
                    {loading ? "Deleting..." : "Delete"}
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

export default Reports;
