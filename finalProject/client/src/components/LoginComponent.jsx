import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import LoginForm from "./LoginForm";


const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: "",
        passsword: "",
    });
    const history = useHistory()

    const [userCreated, setUserCreated] = useState(false);

    const [errors, setErrors] = useState([]);

    function handleChange(event) {
        console.log(event.target.value, event.target.name)
        setLoginUser({ ...loginUser.email, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setUserCreated(false);
        setErrors([]);
        axios
            .post("http://localhost:8000/api/login", loginUser)
            .then((response) => {
                setUserCreated(true);
                console.log("login");
                history.push("/")
            })
            .catch((err) => {
                console.log("no login");
                console.log(err.response);
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                    for (let field in data.errors) {
                        const validationError = data.errors[field];
                        errorMessages.push(validationError.message);
                    }
                }
                setErrors(errorMessages);
            });

    }
    return (
        <div style={{ margin: "20px" }}>
            <h1 >Create user</h1>
            {errors.map((errorMessage, index) => (
                <div key={index} className="error ">Error: {errorMessage}</div>
            ))}
            {userCreated && <div className="success" >User has been successfully created</div>}
            {/* <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} {...loginUser} />
            <button style={{backgroundColor:"blue", color:"white", padding:"8px"}} onClick={handleSubmit}>login</button> */}

            <form className="form container px-5"  onSubmit={handleSubmit}>
                <div className="form container px-5"  >
                    <label className="form-label w-100" >Email:</label>
                    <input className="form-control" name="email" value={loginUser.email} onChange={handleChange} />
                    <label className="form-label w-100" >Password:</label>
                    <input  type="password" className="form-control" name="password" value={loginUser.passsword} onChange={handleChange} />
                    <button className="btn btn-primary m-2" onClick={handleSubmit}>login</button>
                </div>
                <Link to={"/api/signup"}> Create User </Link>
                
            </form>
        </div>
    );
};

export default Login;
