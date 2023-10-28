import style from "./registerStyle.css";
import React, { useState, useEffect } from "react";
import { userRegister } from "../../service/Userservice";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);
  let [userformSign, setUserformsign] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
  });
  const [cookies, setCookies] = useCookies();
  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  });
  const handleOnchangesingUp = (e) => {
    const { name, value } = e.target;
    setUserformsign((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${baseUrl}/sign-up`, userformSign);
    navigate("/login");
  };
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>CodePen - A Pen by Mohithpoojary</title>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css"
      />
      <link rel="stylesheet" href={style} />
      {/* partial:index.partial.html */}
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form
              className="login"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="email"
                  className="login__input"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnchangesingUp}
                  value={userformSign.email}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="password"
                  onChange={handleOnchangesingUp}
                  className="login__input"
                  name="password"
                  placeholder="Password"
                  value={userformSign.password}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-phone" />
                <input
                  type="text"
                  onChange={handleOnchangesingUp}
                  className="login__input"
                  name="phone"
                  placeholder="Phone Number"
                  value={userformSign.phone}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  onChange={handleOnchangesingUp}
                  className="login__input"
                  name="fullName"
                  placeholder="Full Name"
                  value={userformSign.fullName}
                />
              </div>
              <button className="button login__submit">
                <span className="button__text">Register</span>
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
            <div className="social-login">
              <h3>Register via</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram" />
                <a href="#" className="social-login__icon fab fa-facebook" />
                <a href="#" className="social-login__icon fab fa-twitter" />
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>
      {/* partial */}
    </div>
  );
};
export default RegisterForm;
