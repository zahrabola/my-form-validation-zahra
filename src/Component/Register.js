import React, { useRef, useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
///import axios from "../api/axios";
///https://github.com/gitdagray/react_register_form/blob/main/src/Register.js



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

//new - for the axios section
//const REGISTER_URL = "/register";

const Register = () => {
  //state and hooks
  const userRef = useRef(); ///when for user input focus
  const errorRef = useRef(); /// error reference accesability

  const [user, setUser] = useState(""); //tied to user input
  const [validName, setValidName] = useState(false); //boolean , tied to alidation
  const [userFocus, setUserFocus] = useState(false); // boolean , focused on the input field

  const [password, setPassword] = useState(""); //tied to password input
  const [validPassword, setValidPassword] = useState(false); //boolean , tied to password validation
  const [passwordFocus, setPasswordFocus] = useState(false); // boolean , focused on the password input field

  const [matchpassword, setMatchPassword] = useState(""); //tied to match password input
  const [validMatch, setValidMatch] = useState(false); //boolean , tied to password validation
  const [matchFocus, setMatchFocus] = useState(false); // boolean , focused on the match password input field

  const [errorMsg, setErrorMsg] = useState(""); //if error
  const [success, setSuccess] = useState(false); // if succesful

  ////setting the focus when  the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  ///to the user name check validation - test against the user_Regex
  useEffect(() => {
    /* setValidName(USER_REGEX.test(user));*/
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //// password vlidation , comapring password to match password state return boolean , settinng valid match - checking both in sync
  useEffect(() => {
    /*  setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchpassword);*/
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    const match = password === matchpassword;
    setValidMatch(match);
  }, [password, matchpassword]);

  ///useffect for the error message , changes the state of the user input, password and match input inside the dependency array, then error message will clear
  useEffect(() => {
    setErrorMsg("");
  }, [user, password, matchpassword]);

  //handlesubmit - for beginners
  const handleSubmit = async (event) => {
    event.preventDefault();
    ////if Button enabled with JS Hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMsg("Invalid Entry");
      return;
    }
    console.log(user, password);
    setSuccess(true); // success
    setValidPassword(true)
  };



  /* node.js axios

  ///handle submit adding axios
  const handleSubmit = async (event) => {
    event.preventDefault();
    ////if Button enabled with JS Hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, password }),
        /* JSON.stringify({user: userName, password: userPassword}) if the state name is differ and user property that backend is looking for 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true)
       //clear state and controlled inputs
            //need value attrib on inputs for this
    } catch (error) {
      if(!error?.response){
        setErrorMsg('No Server Response');

      } else if ( error.response?.status === 409){
        setErrorMsg('Username Taken')
      } else {
        setErrorMsg( 'Registration Failed ')
      }
      console.log(error);
      errorRef.current.focus()
    }
  };  */

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <div>
          <section>
            <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}>
              {" "}
              {errorMsg}
            </p>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <>
                <label htmlFor="username">
                  Username:
                  <FaCheck className={validName ? "valid" : "hide"} />
                  <FaTimes
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  value={user}
                  required
                  aria-describedby="uidnote"
                  aria-invalid={validName ? "false" : "true"}
                  onChange={(event) => setUser(event.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />

                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  <small>
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </small>
                </p>
              </>
              <>
                <label htmlFor="password">
                  Password:
                  <FaCheck className={validPassword ? "valid" : "hide"} />
                  <FaTimes
                    className={validPassword || !password ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                   passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </>

              <>
                <label htmlFor="confirm_password">
                  Confirm password:
                  <FaCheck
                    className={validMatch && matchpassword ? "valid" : "hide"}
                  />
                  <FaTimes
                    className={
                      validMatch || !matchpassword ? "hide" : "invalid"
                    }
                  />
                </label>

                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchpassword}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  <small>Must match the first password input field.</small>
                </p>
              </>
              <button
                disabled={
                  !validName || validPassword || !validMatch ? true : false
                }
              >
                {" "}
                Sign Up{" "}
              </button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                {/*put router link here*/}
                <a href="/">Sign In</a>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
///https://github.com/juliamachin/tracker-client/tree/main - helful 