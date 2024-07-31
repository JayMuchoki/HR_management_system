

const PasswordInput = ({ value, onChange }) => {
    return (
        <div className='mb-3'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
                id='password'
                type="password"
                name='password'
                placeholder='Enter Password'
                className='form-control rounded-0'
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default PasswordInput;
