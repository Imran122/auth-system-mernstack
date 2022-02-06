import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

import fb from '../../../image/facebook.png';
import google from '../../../image/google.png';
import Header from '../../Shared/Header';
const Registration = () => {
    const [registerData, setRegisterData] = useState({})
    //to redirevt the previous pages
    //to redirevt the previous pages
    const location = useLocation()
    const history = useHistory()

    const { user, isLoading, authError, signInWithGoogle, registerUser } = useAuth()


    const handelOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData }
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);


    }
    console.log(registerData)
    //submittting register data
    const handelRegisterSubmit = e => {
        if (registerData.password !== registerData.password2) {
            alert("password didn't match")
            return;
        }
        //submitttingconsole.log(registerData.email, registerData.password)
        registerUser(registerData.email, registerData.password, registerData.name, history)
        e.preventDefault();
    }

    //google signin metyhod
    const redirect_uri = location.state?.form || '/home'
    const handelGoogleSignIn = () => {
        signInWithGoogle(location, history)
            .then((result) => {

                history.push(redirect_uri)
            })
    }

    return (
        <div>

            <section className="form-section">
                <div className="container">
                    <div className="mx-auto form-area">
                        <div className="form border p-5 mb-4">
                            <div className="form-title mb-4">
                                <h1 className="fw-bold mb-3">Sign <span>Up</span></h1>
                            </div>
                            {user?.email &&
                                <div className="alert alert-success" role="alert">
                                    Account created successfully.!
                                </div>
                            }
                            {authError &&
                                <div class="alert alert-warning" role="alert">
                                    {authError}
                                </div>
                            }
                            <form onSubmit={handelRegisterSubmit}>
                                <div className="mb-4">
                                    <input type="text" className="form-control" id="name *" name="name" onBlur={handelOnBlur} placeholder="Your Name" required />
                                </div>
                                <div className="mb-4">
                                    <input type="email" className="form-control" id="email *" placeholder="Your Email" name="email" onBlur={handelOnBlur} required />
                                </div>
                                <div className="mb-4">
                                    <input type="password" className="form-control" id="password *" placeholder="Your Password" name="password" onBlur={handelOnBlur} required />
                                </div>
                                <div className="mb-4">
                                    <input type="password" className="form-control" id="password2 *" placeholder="Re-type Password" name="password2" onBlur={handelOnBlur} required />
                                </div>
                                {/*  <div className="c-f-form mb-4 d-flex align-items-center justify-content-between">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" style={{ marginTop: "1px" }} htmlFor="flexCheckChecked">
                                            Remember Me!
                                        </label>
                                    </div>
                                    <div className="forgot-password-text text-end">
                                        <Link to="/" className="underline">Forgot Password?</Link>
                                    </div>
                                </div> */}
                                <div className="form-submit-btn mb-4 text-center">
                                    <input type="submit" value="Sign Up →" className="text-white fw-500 w-100 rounded" />
                                </div>
                            </form>
                            <div className="create-new-account">
                                <p className="text-center">
                                    <span> Have an account?</span>
                                    <Link to="/login" className="underline ms-2">Please LogIn Here</Link>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="or-text line text-center mb-3">
                                <span className="position-relative">Or</span>
                            </div>
                            <div className="signin-icon">
                                <button className="mb-3 mx-auto d-table rounded-pill border d-flex align-items-center  justify-content-center p-2">
                                    <img src={fb} alt="fb" className="rounded-circle me-2" />
                                    <p>Continue With Facebook</p>
                                </button>
                                <button onClick={handelGoogleSignIn} className="mx-auto d-table rounded-pill border d-flex align-items-center  justify-content-center p-2">
                                    <img src={google} alt="google" className="rounded-circle me-2" />
                                    <p>Continue With Google</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Registration;