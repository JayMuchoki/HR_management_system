const LoginForm = ({ values, handleChange, handleSubmit ,loading}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input
                    id='email'
                    type="email"
                    name='email'
                    autoComplete='off'
                    placeholder='Enter Email'
                    className='form-control rounded-0'
                    
                    onChange={handleChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input
                    id='password'
                    type="password"
                    name='password'
                    placeholder='Enter Password'
                    className='form-control rounded-0'
                   
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0' disabled={loading}>
                {loading ?'logging in ':'Login'}</button>
        </form>
    );
}

export default LoginForm;
