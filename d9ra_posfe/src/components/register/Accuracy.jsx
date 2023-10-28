import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import logo from "../../asset/img/logo-apple1.png";
import login from "../../asset/img/register.jpeg";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../service/Userservice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();
    let [userformAccuracy, setUserformAccuracy] = useState({
      email: "",
      password: "",
      verificationCode: "",
    });
    const handleOnchange = (e) => {
      const { name, value } = e.target;
      setUserformAccuracy((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `${baseUrl}/verification`,
          userformAccuracy
        );
        toast.success("Xác thực thành công!");
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data);
      }
    };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - xác nhận</title>
      {/* Link Font awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      {/* Link Fonts Google */}
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:wght@300;400;500;600;700&family=Quicksand:wght@500;700&family=Roboto:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* Swiper JS */}
      <div className="wrapper">
        <div className="main fields">
          <div className="grid wide">
            <div className="box-item">
              <div className="row">
                <div className="col l-7 m-0 c-0">
                  <img src={login} alt="" width={700} height={400} />
                </div>
                <div className="col l-5 m-12 c-12">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="form-fields">
                      <div className="form-fields__title">
                        <h1>Xác Nhận Tài Khoản</h1>
                      </div>
                      <div className="form-fields__form">
                        <div className="inputs">
                          <label htmlFor="Email">Email:</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleOnchange}
                            value={userformAccuracy.email}
                          />
                        </div>
                        <div className="inputs">
                          <label htmlFor="Password">Mật khẩu:</label>
                          <input
                            type="password"
                            id="Password"
                            name="password"
                            onChange={handleOnchange}
                            value={userformAccuracy.password}
                          />
                        </div>
                        <div className="inputs">
                          <label htmlFor="Password">Mã xác nhận</label>
                          <input
                            type="text"
                            id="verification_code"
                            name="verificationCode"
                            onChange={handleOnchange}
                            value={userformAccuracy.verificationCode}
                          />
                        </div>
            
                      </div>
                      <div className="buttons">
                        <button
                          type="submit"
                          name="register-button"
                          id="register-button"
                          className="button-1 login-button"
                        >
                          Xác nhận
                        </button>
                      </div>
                  
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
