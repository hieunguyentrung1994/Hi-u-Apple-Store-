// import { useNavigate, Link, Navigate } from "react-router-dom";
// import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";
// import { GoogleOAuthProvider } from "react-google-login";
// import axios from "axios";

// const MyComponent = () => {
//   const navigate = useNavigate();
//   let [userformSignUp, setUserformsignUP] = useState({
//     email: "",
//     password: "",
//     phone: "",
//     fullName: "",
//   });
//   const responseGoogle = async (response) => {
//     console.log(response);
//     // bạn có thể sử dụng thông tin trong response để thực hiện việc đăng nhập hoặc đăng ký
//     // await axios.post(
//     //     "http://localhost:8888/api/v4/auth/sign-up",
//     //     userformSignUp
//     //   );
//     //   Navigate("/login");
//   };

//   return (
//     <>
//       <div>
//         {/* <Link to="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:7777/login-google&response_type=code
// 		&client_id=35337034345-fdk4tbntcoo4u3t4g72bjgj4791k1v3b.apps.googleusercontent.com&approval_prompt=force" /> */}

//         <GoogleLogin
//           clientId="524572713300-bagi2ju9bu1oro5afkblt0j3ktidrm75.apps.googleusercontent.com"
//           clientSecretKey="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"
//           buttonText="Login with Google"
//           onSuccess={responseGoogle}
//           onFailure={responseGoogle}
//           cookiePolicy={"single_host_origin"}
//         />
//       </div>
//     </>
//   );
// };

// export default MyComponent;
