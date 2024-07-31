import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleting,setdeleting]=useState(false)
  

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create cancel token
    
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await axios.get('http://localhost:3000/auth/category', {
                    cancelToken: source.token // Attach cancel token to fetch request
                });
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    setError(result.data.Error);
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    console.error(err);
                    setError('An error occurred while fetching the categories.');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchCategories();
    
      //here i used it to Cleanup function to cancel ongoing requests if the component unmounts
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, []);

    const handledelete=async(id)=>{
        setError(null);
        setdeleting(true);
        try {
            const result=await axios.delete("http://localhost:3000/auth/delete_category/"+id)
            if(result.data.Result){
                window.location.reload()
            }else{
                setError(result.data.Error)
            }
            
        } catch (error) {
            console.error(error)
            alert("Failure occured while deleting category")
        }finally{
            setdeleting(false)
        }
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
 
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link className='btn btn-success' to="/dashboard/add_category">Add Category</Link>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((c) => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>
                                    <button className='btn btn-warning ms-6 btn-sm'
                                    onClick={()=> handledelete(c.id)}
                                    disabled={deleting}
                                    >{deleting ?"Deleting ...":"Delete Category"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
