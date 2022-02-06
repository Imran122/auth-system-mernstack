import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import fb from '../../../image/facebook.png';
import google from '../../../image/google.png';
const LogIn = () => {
    const { user, isLoading, authError, signInWithGoogle, loginUser } = useAuth()
    const [loginData, setLoginData] = useState({})
    const location = useLocation()
    const history = useHistory()
    //google signin metyhod
    const redirect_uri = location.state?.form || '/home'
    const handelGoogleSignIn = () => {
        signInWithGoogle(location, history)
            .then((result) => {

                history.push(redirect_uri)
            })
    }

    //user email and password login system

    const handelOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);


    }


    const handleLoginSubmit = (e) => {
        loginUser(loginData.email, loginData.password, location, history)
        e.preventDefault()
    }



    return (
        <section className="form-section">
            <div className="container">
                <div className="mx-auto form-area">
                    <div className="form border p-5 mb-4">
                        <div className="form-title mb-4">
                            <h1 className="fw-bold mb-3">Sign <span>In</span></h1>
                        </div>
                        {authError &&
                            <div class="alert alert-warning" role="alert">
                                {authError}
                            </div>
                        }
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <input type="email" className="form-control" id="email *" placeholder="Your Email" name="email" onChange={handelOnChange} required />
                            </div>
                            <div className="mb-4">
                                <input type="password" className="form-control" id="password *" placeholder="Your Password" name="password" onChange={handelOnChange} required />
                            </div>
                            {/*       <div className="c-f-form mb-4 d-flex align-items-center justify-content-between">
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
                                <input type="submit" value="Sign In →" className="text-white fw-500 w-100 rounded" />
                            </div>
                        </form>
                        <div className="create-new-account">
                            <p className="text-center">
                                <span>Don't have an account?</span>
                                <Link to="/registration" className="underline ms-2">Create an account</Link>
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
    );
};

export default LogIn;