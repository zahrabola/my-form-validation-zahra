import React, { useRef, useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  //state and hooks
  const userRef = useRef(); ///when for user input focus
  const errorRef = useRef(); /// error reference accesability

  const [user, setUser] = useState(""); //tied to user input
  const [validName, setValidName] = useState(false); //boolean , tied to alidation
  const [userFocus, setUserFocus] = useState(false); // boolean , focused on the input field

  const [password, setPassword] = useState(""); //tied to password input
  const [validPassword, setValidPassword] = useState(false); //boolean , tied to password validation
  const [paasswordFocus, setPasswordFocus] = useState(false); // boolean , focused on the password input field

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

  ///useffect for the error message , changes the state of theruser input, password and match input inside the dependency array, then error message will clear
  useEffect(() => {
    setErrorMsg("");
  }, [user, password, matchpassword]);
  return (
    <div>
      <section>
        <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}>
          {" "}
          {errorMsg}
        </p>
        <h1>Register</h1>

        <form>
          <>
            <label htmlFor="username">
              Username:
              <FaCheck className={validName ? "valid" : "hide"} />
              <FaTimes className={validName || !user ? "hide" : "invalid"} />
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
                userFocus && user && !validName ? "instructions" : "offscreen"
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
              password:
              <FaCheck className={validPassword ? "valid" : "hide"} />
              <FaTimes
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>

            <input
              type="text"
              id="password"
              autoComplete="off"
              value={password}
              required
              aria-describedby="uidnote"
              aria-invalid={validPassword ? "false" : "true"}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                paasswordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              <small>
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
              </small>
            </p>
          </>
        </form>
      </section>
    </div>
  );
};

export default Register;
