import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function withRequireAuth(WrappedComponent) {
  return function RequireAuthComponent(props) {
    const [cookies] = useCookies(['Roles']); 
    const navigate = useNavigate();

    const userRoles = cookies.Roles;

    // Kiểm tra xem mảng userRoles có chứa ROLE_ADMIN không
    if (!userRoles || !userRoles.includes('ROLE_ADMIN')) {
      alert("Bạn không có quyền truy cập trang này!"); // Thông báo lỗi bằng react-hot-toast
      navigate('/'); // Nếu không có ROLE_ADMIN, chuyển hướng người dùng về trang chính
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRequireAuth;




