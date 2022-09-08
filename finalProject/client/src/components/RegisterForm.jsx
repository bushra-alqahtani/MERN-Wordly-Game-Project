const RegisterForm = (props) => {
    const { name, email, password, confirmPassword, handleChange, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form container px-5">
                <label className="form-label w-100"  >Name:</label>
                <input className="form-control" name="name" value={name} onChange={handleChange} />
                <label className="form-label w-100" >Email:</label>
                <input className="form-control" name="email" value={email} onChange={handleChange} />
                <label className="form-label w-100" >Password:</label>
                <input type = "password" className="form-control"  name="password" value={password} onChange={handleChange} />
                <label className="form-label w-100" >Confirm Password</label>
                <input type = "password" className="form-control"  name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                
            </div>
            
        </form>
    );
};

export default RegisterForm;