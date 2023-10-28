// import FacebookLogin from 'react-facebook-login';
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function FacebookSignInComponent() {
//     const navigate = useNavigate();
//     let [userformSignUp, setUserformsignUP] = useState({
//         email: "",
//         password: "",
//         phone: "",
//         fullName: "",
//       });
//     const responseFacebook = async (response) => {
//         console.log(response);
        
//         // await axios.post(
//         //     "http://localhost:8888/api/v4/auth/sign-up",
//         //     userformSignUp
//         //   );
//         //   navigate("/login");
//     }

//     return (
//         <FacebookLogin
//             appId="YOUR_FACEBOOK_APP_ID" 
//             fields="name,email,picture"
//             callback={responseFacebook}
//         />
//     );
// }

// export default FacebookSignInComponent;
