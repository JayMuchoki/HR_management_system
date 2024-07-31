

const EmailInput = ({ value, onChange }) => {
    return (
        <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
                id='email'
                type="email"
                name='email'
                autoComplete='off'
                placeholder='Enter Email'
                className='form-control rounded-0'
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default EmailInput;
