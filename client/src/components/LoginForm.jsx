const LoginForm = (props) => {
    const { email, password, handleChange, handleSubmit } = props;
    return (
        <>
        <form className="form container px-5"  onSubmit={handleSubmit}>
            <div>
                <label className="form-label w-100"> Email:</label>
                <input className="form-control" name="email" value={email} onChange={handleChange} />
                <label className="form-label w-100"> Password:</label>
                <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
            </div>
        </form>
        </>
    );
};

export default LoginForm;