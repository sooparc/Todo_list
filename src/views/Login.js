import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "../views/Login.module.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  // When the form is being submitted.
  const [busy, setBusy] = useState(false);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [loginErr, setLoginErr] = useState(null);

  const userRef = useRef();
  const navigate = useNavigate();

  const userIcon = <FontAwesomeIcon size="lg" icon={faUser} />;
  const lockIcon = <FontAwesomeIcon size="lg" icon={faLock} />;

  useEffect(() => {
    const getObj = localStorage.getItem("user_token");
    // Check for valid token against api
    getObj && navigate("/home");
  }, [navigate]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setBusy(true);
    axios({
      method: "post",
      url: "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
      data: {
        email: data.email,
        password: data.password,
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(function (response) {
        setBusy(false);
        localStorage.setItem("user_token", response.data.user_token);
        navigate("/home");
      })
      .catch(function (error) {
        setLoginErr("The server could not be reached. Please try again later.");
        setBusy(false);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.mainBox}>
          <div className={classes.signinBox}>
            <h1>sign in</h1>
            <div className={classes.formContainer}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                onChange={(e) => {
                  if (e.target.id === "email") {
                    let validRegex =
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (
                      e.target.value.length > 50 ||
                      !e.target.value.match(validRegex)
                    ) {
                      setEmailErr("Invalid Email");
                    } else {
                      setEmailErr(null);
                    }
                  } else if (e.target.id === "password") {
                    if (
                      e.target.value.length < 4 ||
                      e.target.value.length > 16
                    ) {
                      setPasswordErr(
                        "Password must be at 4-16 characters long"
                      );
                    } else {
                      setPasswordErr(null);
                    }
                  }
                }}
              >
                <label htmlFor="email">Email</label>
                <div className={classes.inputForm}>
                  <span className={classes.inputIcon}>{userIcon}</span>
                  <input
                    type="email"
                    placeholder="user@rapptrlabs.com"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    className={emailErr && "invalid"}
                    {...register("email", {
                      required: true,
                      maxLength: {
                        value: 50,
                      },
                    })}
                  />
                </div>
                {emailErr && <p className={classes.errMsg}>{emailErr}</p>}

                <label htmlFor="password">Password</label>
                <div className={classes.inputForm}>
                  <span className={classes.inputIcon}>{lockIcon}</span>
                  <input
                    type="password"
                    placeholder="Must be at least 4 characters"
                    id="password"
                    ref={userRef}
                    autoComplete="off"
                    className={passwordErr && "invalid"}
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 4,
                      },
                      maxLength: {
                        value: 16,
                      },
                    })}
                  />
                </div>
                {passwordErr && <p className={classes.errMsg}>{passwordErr}</p>}

                <button
                  className={
                    emailErr || passwordErr || busy ? "invalid-button" : ""
                  }
                  disabled={emailErr || passwordErr || busy ? true : false}
                >
                  Login
                </button>
                {loginErr && <p className={classes.loginErrMsg}>{loginErr}</p>}
              </form>
            </div>
          </div>

          <div className={classes.leftbox}>
            <img className={classes.logo} src={logo} alt="logo" />
            <h2 className={classes.title}>
              <span className={classes.firstSpan}>Rapptr</span>
              <span> </span>
              <span className={classes.secondSpan}>Labs</span>
            </h2>
            <p className={classes.leftboxText}>From Idea to Adoption.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
