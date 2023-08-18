import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app)
const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        // collect data from form
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);

        // validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please add at lest two numbers')
            return;
        }
        else if (password.length < 6) {
            setError('please add at least 6 characters')
            return;
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                sendVerificationEmail(loggedUser)
                updateUserData(loggedUser, name)
                event.target.reset();
                setSuccess('User has been successfully done.')


            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })
    }




    const sendVerificationEmail = user => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result)
                alert('please verify your email')
            })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <div className="w-50 mx-auto">
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className="w-50 mb-4 rounded ps-2" type="text" name="name" id="name" placeholder="Your Name" required />
                <br />
                <input className="w-50 mb-4 rounded ps-2" type="email" name="email" id="email" placeholder="Your Email" required />
                <br />
                <input className="w-50 mb-4 rounde  ps-2 " type="password" name="password" id="password" placeholder="Your Password" required />
                <br />
                <input className="btn btn-primary" type="submit" value="Register" />
            </form>
            <p>You have an account? Please <Link to="/login">Login</Link></p>
            <p className="text-danger">{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;