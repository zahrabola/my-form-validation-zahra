
///https://www.youtube.com/watch?v=X3qyxo_UTR4&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=2
import React, { useRef, useState, useEffect } from "react";


const Login = () => {
    const userRef = useRef(); ///when for user input focus
    const errorRef = useRef(); /// error reference accesability


    const [user, setUser] = useState(""); //tied to user input
    const [password, setPassword] = useState(""); //tied to password input
    const [errorMsg, setErrorMsg] = useState(""); //if error
    const [success, setSuccess] = useState(false); // if succesfull

     ////setting the focus when  the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

///empty error message if/when the user or password changes 
   useEffect(() => {
    setErrorMsg('');
   }, [user, password])

    return (
        <section>
       <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}>
              {" "}
              {errorMsg}
            </p>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                value={user}
                required
                />
                 <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                required
                />
                <button>Sign In</button>
            </form>
            <p>
                </p>
        </section>
    );
}

export default Login;
