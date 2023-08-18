import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app)
const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // validation
        setError('');
        setSuccess('')
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('please add two uppercase')
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('please add speacila character')
            return;
        }
        else if (password.length < 6) {
            setError('please add at least 6 character')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)

                setSuccess('user successfully login')
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const hanlePasswordReset = () => {
        const email = emailRef.current.value
        if (!email) {
            alert('please provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your emai')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    return (
        <div className="w-25 mx-auto">
            <h4>Please Login !!!</h4>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" ref={emailRef} name='email' className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <p><small>Forget your pa ssword? please <button onClick={hanlePasswordReset} className="btn btn-link">Reset Password</button></small></p>
            <p>New to the website? Please <Link to="/register">Register</Link></p>
            <p className="text-success">{success}</p>
            <p className="text-danger">{error}</p>
        </div>
    );
};

export default Login;