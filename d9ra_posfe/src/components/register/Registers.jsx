import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import logo from "../../asset/img/logo-apple1.png";
import register from "../../asset/img/register.jpeg";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../service/Userservice.js";
import { baseUrl } from "../../service/Userservice.js";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);
  let [userformSign, setUserformsign] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
  });
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
    let errors = [];
    if (!validateEmail(userformSign.email)) {
      toast.error('Email không đúng định dạng hoặc không hợp lệ!');
    }
    if (!validatePassword(userformSign.password)) {
      toast.error('Mật khẩu tối thiểu 8 kia tự bao gồm cả chữ và số!')
    }
    if (!validatePhoneNumber(userformSign.phone)) {
      toast.error('Số điện thoại không đúng định dạng!')
    }
    if(errors.length > 0){
      alert(errors.join("\n"));
      return
    }
    try {
      
      await axios.post(
        `${baseUrl}/sign-up`,
        userformSign
      );
      toast.success('Đăng kí thành công, vui lòng kiểm tra email!')
      navigate("/accuracy");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - Đăng ký</title>

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
          <div className="product-heading">
            <ul>
              <li>
                <a href="./index.html" className="">
                  Trang chủ
                </a>
                <span className="delimiter">&gt;</span>
              </li>
              <li>
                <strong>Đăng ký</strong>
              </li>
            </ul>
          </div>
          <div className="grid wide">
            <div className="box-item">
              <div className="row">
                <div className="col l-7 m-0 c-0">
                  <img src={register} alt="" width={700} height={400} />
                </div>
                <div className="col l-5 m-12 c-12">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="form-fields">
                      <div className="form-fields__title">
                        <h1>Đăng ký</h1>
                      </div>
                      <div className="form-fields__form">
                        <div className="inputs first_name">
                          <label htmlFor="fulltName">Họ và Tên:</label>
                          <input
                            type="text"
                            id="FirstName"
                            name="fullName"
                            className="input-validation-error"
                            onChange={handleOnchangesingUp}
                            value={userformSign.fullName}
                          />
                        </div>

                        <div className="inputs first_name">
                          <label htmlFor="email">E-mail:</label>
                          <input
                            type="text"
                            id="Email"
                            name="email"
                            onChange={handleOnchangesingUp}
                            value={userformSign.email}
                          />
                        </div>
                        <div className="inputs first_name">
                          <label htmlFor="phone">Điện thoại:</label>
                          <input
                            type="tel"
                            id="Phone"
                            name="phone"
                            onChange={handleOnchangesingUp}
                            value={userformSign.phone}
                          />
                        </div>

                        <div className="inputs first_name">
                          <label htmlFor="password">Mật khẩu:</label>
                          <input
                            type="password"
                            id="Password"
                            name="password"
                            onChange={handleOnchangesingUp}
                            value={userformSign.password}
                          />
                        </div>
                        <label className="luu_y">
                          Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ,
                          số và các ký tự đặc biệt
                        </label>
                      </div>
                      <div className="buttons">
                        <button
                          type="submit"
                          name="register-button"
                          id="register-button"
                          className="button-1 register-next-step-button"
                        >
                          Đăng ký
                        </button>
                      </div>
                      <div className="buttons-forgot">
                        <label> Bạn đã có tài khoản? </label>
                        <Link href="/login" className="link_access">
                          Đăng nhập ngay
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="registration">
                <div className="order-completed__icon">
                  <img src="./assets/img/complate_icon.png" alt="" />
                </div>
                
                <div className="show-all continue__shopping">
                  <a
                    href="./Cart.html"
                    className="show-all__link"
                    style={{ marginTop: 0, padding: "10px 30px" }}
                  >
                    <div className="show-all__title">
                      <span>Tiếp tục mua hàng </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterForm;
