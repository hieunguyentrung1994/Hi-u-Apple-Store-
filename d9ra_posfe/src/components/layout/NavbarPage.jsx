import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import logo from "../../asset/img/logo-apple1.png";

import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "phone",
    "password",
  ]);

  const isLoggedIn = !!cookies.token;
  const [categories, setCategories] = useState([]);
  const isRoles = !!(cookies.Roles == "ROLE_ADMIN");
  const logout = () => {

    removeCookie("token");
    removeCookie("email");
    removeCookie("fullName");
    removeCookie("Roles");
    removeCookie("phone");
    removeCookie("password");
    navigate("/");
    window.location.reload();
  }
  useEffect(() => {
    axios
      .get(`${baseUrl}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);



  return (
    <>
      <header className="header">
        <nav className="header__navbar">
          {/* Navbar Mobile */}
          <div className="burger">
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
          </div>
          <div className="header__navbar-logo">
            <Link to="/">Trung Hiếu</Link>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <ul className="header__navbar-menu">
          <li className="header__navbar-item"><Link to={`/home/bestsell`} className="header__navbar-item-link">Bán chạy</Link></li>
            {categories
              .filter((category) => category.status) 
              .map((category) => (
                <li className="header__navbar-item" key={category.id}>
                  <Link to={`/home/${category.id}`} className="header__navbar-item-link">
                    {category.name}
                  </Link>
                </li>
              ))}
             
          </ul>

          <div className="nav_cartanduser">
            {/* Cart layout*/}
            {isLoggedIn && (
              <div className="header__navbar-cart">
                <div className="header__navbar-cart-wrap">
                  <Link to="/home/cart" className="header__navbar-wrapper-link">
                    <i className="header__navbar-wrapper-icon fa-solid fa-bag-shopping" />
                    {/* <span className="header__navbar-cart-notice"></span> */}
                  </Link>
                  {/* No cart: header__navbar-cart-list--no-cart */}
                  <div className="header__navbar-cart-list" />
                </div>
              </div>
            )}
            <div className="header__navbar-user">
              <a href="" className="header__navbar-wrapper-link">
                <i className="header__navbar-wrapper-icon fa-regular fa-user" />
              </a>
              {!isLoggedIn && (
                // Chưa Login
                <div className="header-links">
                  <ul className="account-desktop">
                    <li className="account-desktop__register">
                      <Link to="/register">Tạo tài khoản ngay</Link>
                    </li>
                    <li className="account-desktop__login">
                      <Link to="/login">Đăng nhập</Link>
                    </li>
                  </ul>
                </div>
              )}
              {isLoggedIn && (
                // Đã Login
                <div className="header-links">
                  <ul className="account-desktop">
                    <li className="account-desktop__user">
                      <span>Xin chào {cookies.fullName}</span>
                    </li>
                    <li className="account-desktop__CustomerInfo">
                      <Link to="/home/user/edit">Tài khoản của tôi</Link>
                      <Link to="/home/user/history">Lịch sử mua hàng</Link>
                      <Link to="/home/user/favorite">Sản phẩm yêu thích</Link>
                      {isRoles ?
                        (<Link to="/admin">Đến trang Admin </Link>) :
                        (<div></div>)
                      }
                    </li>
                    <li>
                      <button className="btn_logout111" onClick={logout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;