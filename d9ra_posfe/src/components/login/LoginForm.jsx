import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import login from "../../asset/img/LogIn.jpeg";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { validateEmail, validatePassword } from "../../service/Userservice.js";
import { baseUrl } from "../../service/Userservice.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);
  const [userform, setUserform] = useState({
    email: "",
    password: "",
  });
  const [cookies, setCookies] = useCookies();
  const [cart, setCart] = useCookies(["cartCookies"]);

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  }, []);

  const handleOnchangeLogin = (e) => {
    const { name, value } = e.target;
    setUserform((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if (!validateEmail(userform.email)) {
      toast.error("Email không hợp lệ !");
    }
    if (!validatePassword(userform.password)) {
      toast.error("Mật khẩu tối thiểu 8 kí tự và bao gồm cả chữ và số!");
    }
    if (errors.length > 0) {
      //  toast.error(errors.join("\n"));
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}/sign-in`, userform);
      if (res && res.data) {
        const cookieOptions = {
          path: "/",
          maxAge: Date.now() + 6 * 60 * 60 * 1000,
        };
        setCookies("token", res.data.token, cookieOptions);
        setCookies("email", res.data.email, cookieOptions);
        setCookies("fullName", res.data.fullName, cookieOptions);
        setCookies("Roles", res.data.roles, cookieOptions);
        setCookies("phone", res.data.phone, cookieOptions);
        setCookies("password", res.data.password, cookieOptions);
        if (res.data.roles.includes("ROLE_ADMIN")) {
          toast.success("Đăng nhập thành công, chào mừng ADMIN");
          navigate("/admin");
        } else {
          toast.success("Đăng nhập thành công!");
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - Đăng nhập</title>

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
                        <h1>Đăng nhập</h1>
                      </div>
                      <div className="form-fields__form">
                        <div className="inputs">
                          <label htmlFor="Email">Email:</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleOnchangeLogin}
                            value={userform.email}
                          />
                        </div>
                        <div className="inputs">
                          <label htmlFor="Password">Mật khẩu:</label>
                          <input
                            type="password"
                            id="Password"
                            name="password"
                            onChange={handleOnchangeLogin}
                            value={userform.password}
                          />
                        </div>
                        {/* <div className="inputs reversed">
                          <input
                            type="checkbox"
                            data-val="true"
                            id="RememberMe"
                            name="RememberMe"
                            defaultValue="true"
                          />
                          <label htmlFor="RememberMe"> Nhớ mật khẩu</label>
                          <span className="forgot-password">
                            <a href="./ForgotPassWord.html" className="">
                              Quên mật khẩu?
                            </a>
                          </span>
                        </div> */}
                      </div>
                      <div className="buttons">
                        <button
                          type="submit"
                          name="register-button"
                          id="register-button"
                          className="button-1 login-button"
                        >
                          Đăng nhập
                        </button>
                      </div>
                      <div className="buttons-forgot">
                        <label> Bạn đã có tài khoản? </label>
                        <Link to="/Register" className="link_access">
                          Tạo tài khoản ngay
                        </Link>
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
