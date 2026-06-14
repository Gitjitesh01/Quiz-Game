import { Alert, Stack } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios';

function ForgotPass() {

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [oobCode, setOobCode] = useState('');

    const sendOtp = async (event) => {
        event.preventDefault();
        const data = {
            requestType: "PASSWORD_RESET",
            email: email,
            userIp: "",
            captchaResp: ""
        };
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANmzM-Q-qWaC5QgVx1pLFxK74uUp7Ghsw", data)
            .then((response) => {
                // Handle success response if needed
                console.log('Response:', response.data);
                setOtpSent(true)
                alert("Password Rest Link sent to email")
            })
            .catch((error) => {
                // Handle error response if needed
                console.error('Error:', error);
                alert("Account doesn't exist with this Email")
            })
    }

    const changePassword = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyANmzM-Q-qWaC5QgVx1pLFxK74uUp7Ghsw", data)
            .then((response) => {
                // Handle success response if needed
                //console.log('Response:', response.data);
                setPasswordConfirmed(true)
                alert("Password Changed")
            })
            .catch((error) => {
                // Handle error response if needed
                console.error('Error:', error);
            })
    }

  return (
    <section className="bg-gray-50  ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900   ">
                    Welcome to
                    <span className='ml-1 text-cyan-400'>letsquiz</span>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Stack sx={{ display: 'none', width: '100%' }} spacing={2} id="cantLogInAlert">
                            <Alert severity="error" onClose={() => { document.getElementById("cantLogInAlert").style.display = "none" }}>Incorrect username or password.</Alert>
                        </Stack>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl   ">
                            Enter your email to reset password
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={sendOtp}>
                            
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 tracking-tight">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    value={email}
                                    placeholder='abcd@abcd.com'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>
                            {/* get otp */}

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center" >
                                Get Password Reset Link</button>
                            {/* <p className="text-sm font-light text-gray-500">
                                <a href="/forgot-password" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot Password ?</a>
                            </p>
                            <p className="text-sm font-light text-gray-500 -top-6">
                                Don't have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default ForgotPass