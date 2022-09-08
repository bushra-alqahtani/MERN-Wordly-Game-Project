import { useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import "../bootstrap.min.css"



const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        passsword: "",
        confirmPassword:""
    });
    const history = useHistory()

    const [userCreated, setUserCreated] = useState(false);

    const [errors, setErrors] = useState([]);

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setUserCreated(false);
        setErrors([]);
        axios
            .post("http://localhost:8000/api/signup", user)
            .then((response) => {
                setUserCreated(true);
                history.push({
                    pathname: '/',
                    state: { detail: user.name }
                });

            })
            .catch((err) => {
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
        <>
      
        
        <div className="form container px-5" >
            <div className="sketchy">
            <h1 >Create user</h1>
            {errors.map((errorMessage, index) => (
                <div key={index} className="alert alert-dismissible alert-danger ">Error: {errorMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
                
            ))}
            {userCreated && <div className="success">user has been successfully created</div>}
            <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} {...user} /><br/>
            <button className="btn btn-dark" onClick={handleSubmit}>Create</button><br/>
            <Link to={"/api/login"}> log in ? </Link>
            </div>
        </div>
    
        </>
    );
};

export default Register;
