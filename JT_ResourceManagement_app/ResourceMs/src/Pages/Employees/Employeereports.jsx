import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Employeereports = () => {
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
                    cancelToken: source.token
                });
                if (result.data.Status) {
                    setReports(result.data.Result);
                } else {
                    setErrors(result.data.Error);
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    console.error(err);
                    setErrors('An error occurred while fetching the reports.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReports();

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, []);
   
        

    if (errors) return <p>{errors}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div>
                {reports.map((r) => (
                    <div className='card mb-3 col-10 border shadow-sm ' key={r.id}>
                        <div className='card-body d-flex '>
                            <div className='col-10 '>
                            <h3 className='card-title'>Agenda</h3>
                            <p className='card-text'>{r.report}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Employeereports;
