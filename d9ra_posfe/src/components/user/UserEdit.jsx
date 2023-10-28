import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import logo from "../../asset/img/logo-apple1.png";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../service/Userservice.js";
import { baseUrl } from "../../service/Userservice.js";

const UserEdit = () => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "password",
    "phone",
  ]);

  const navigate = useNavigate();
  if (cookies.token === undefined) {
    navigate("/login");
  }
  const [isToggle, setToggle] = useState(false);
  let [userformSign, setUserformsign] = useState({
    email: cookies.email || "",
    password: cookies.password || "",
    phone: cookies.phone || "",
    fullName: cookies.fullName || "",
  });

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  });
  const handleOnchangeUserEdit = (e) => {
    const { name, value } = e.target;
    setUserformsign((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if (!validatePassword(userformSign.password)) {
      errors.push(
        "password Bạn nhập cần tối thiêu 8 ký tự cần có cả chứ và số"
      );
    }
    if (!validatePhoneNumber(userformSign.phone)) {
      errors.push("Số điện thoại bạn nhập không đúng ");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    try {
      await axios.post(`${baseUrl}/users/edit`, userformSign);
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
      removeCookie("phone");
      removeCookie("password");
      alert("bạn hãn đang nhập lại !!!");
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
  };
  const [isEditing, setIsEditing] = useState(true); // Trạng thái chỉnh sửa

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - UserEdit</title>
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
        <div className="main">
          <form className="formus">
            <div>
              <div style={{ textAlign: "center" }}>
                <h style={{ fontSize: "25px" }}>Cập nhật thông tin cá nhân</h>
              </div>
              <br />
              <br />
              <div>
                <label htmlFor="email">Gmail: </label>
                {isEditing ? (
                  <input
                    type="text"
                    data-val="true"
                    id="Email"
                    name="email"
                    value={userformSign.email}
                  />
                ) : (
                  <span>{userformSign.email}</span>
                )}
              </div>
              <div>
                <div>
                  <label htmlFor="fullName">Họ và Tên:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      data-val="true"
                      id="FullName"
                      name="fullName"
                      value={userformSign.fullName}
                      onChange={handleOnchangeUserEdit}
                    />
                  ) : (
                    <span>{userformSign.fullName}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="phone">Điện thoại:</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      data-val="true"
                      id="Phone"
                      name="phone"
                      value={userformSign.phone}
                      onChange={handleOnchangeUserEdit}
                    />
                  ) : (
                    <span>{userformSign.phone}</span>
                  )}
                </div>
                {isEditing && (
                  <div>
                    <div className="inputs first_name">
                      <label htmlFor="currentPassword">Mật khẩu cũ:</label>
                      <input
                        type="password"
                        data-val="true"
                        id="CurrentPassword"
                        name="currentPassword"
                        value={userformSign.currentPassword}
                        onChange={handleOnchangeUserEdit}
                      />
                    </div>
                    <div className="inputs first_name">
                      <label htmlFor="newPassword">Mật khẩu mới:</label>
                      <input
                        type="password"
                        data-val="true"
                        id="NewPassword"
                        name="newPassword"
                        value={userformSign.newPassword}
                        onChange={handleOnchangeUserEdit}
                      />
                    </div>
                    <div className="inputs first_name">
                      <label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới:</label>
                      <input
                        type="password"
                        data-val="true"
                        id="ConfirmNewPassword"
                        name="confirmNewPassword"
                        value={userformSign.confirmNewPassword}
                        onChange={handleOnchangeUserEdit}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              {isEditing ? (
                <button type="submit" name="save-button" onClick={toggleEdit}>
                  Lưu
                </button>
              ) : (
                <button type="button" name="edit-button" onClick={toggleEdit}>
                  Chỉnh sửa
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserEdit;
