import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginForm";
import RegisterForm from "./components/register/Registers";
import Accuracy from "./components/register/Accuracy";
import CategoryAdminPage from "./components/category/Category";
import IndexAdminPage from "./components/admin/homeAdmin";
import ProductAdminPage from "./components/product/Product";
import CartPage from "./components/cart/Cart";
import UserAdminPage from "./components/user/User";
import VerificationAdminPage from "./components/verification/Event";
import withRequireAuth from "./RequireAuth";
import ShowCategoryPage from "./components/Ification/ShowCategory";
import UserEdit from "./components/user/UserEdit";
import ProductDetailPage from "./components/Ification/ProductDetail";
import NonLayout from "./components/layout/NonAdminLayout";
import SupplierAdminPage from "./components/suppliers/Supplier";
import DiscountAdminPage from "./components/discount/Discount";
import Advertisement from "./components/advertisement/Advertisement";
import PayPage from "./components/Payment/pay";
import PayErrorPage from "./components/Payment/PayError";
import History from "./components/user/History";
import Favorite from "./components/user/Favorite";
import BestSell from "./components/Ification/BestSell";
import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ProtectedCategoryAdminPage = withRequireAuth(CategoryAdminPage);
const ProtectedIndexAdminPage = withRequireAuth(IndexAdminPage);
const ProtectedProductAdminPage = withRequireAuth(ProductAdminPage);
const ProtectedUserAdminPage = withRequireAuth(UserAdminPage);
const ProtectedVerificationAdminPage = withRequireAuth(VerificationAdminPage);
const ProtectedSupplierAdminPage = withRequireAuth(SupplierAdminPage);
const ProtectedDiscountAdminPage = withRequireAuth(DiscountAdminPage);
const ProtectedAdvertisementAdminPage = withRequireAuth(Advertisement);

function App() {
  return (
    <Routes>
      <Route path="/" element={<NonLayout><HomePage /></NonLayout>} />
      <Route path="/login" element={<NonLayout><LoginPage /></NonLayout>} />
      <Route path="/register" element={<NonLayout><RegisterForm /></NonLayout>} />
      <Route path="/accuracy" element={<NonLayout><Accuracy /></NonLayout>} />
      <Route path="/home/user/edit" element={<NonLayout><UserEdit /></NonLayout>} />
      <Route path="/home/cart" element={<NonLayout><CartPage /></NonLayout>} />
      <Route path="/product/:productId" element={<NonLayout><ProductDetailPage /></NonLayout>} />
      <Route path="/home/cart/pay" element={<NonLayout><PayPage /></NonLayout>} />
      <Route path="/home/cart/payeror" element={<NonLayout><PayErrorPage /></NonLayout>} />
      <Route path="/home/user/history" element={<NonLayout><History /></NonLayout>} />
      <Route path="/home/user/favorite" element={<NonLayout><Favorite /></NonLayout>} />
      <Route path="/home/bestsell" element={<NonLayout><BestSell /></NonLayout>} />
      <Route path="/home/:categoryId" element={<NonLayout><ShowCategoryPage /></NonLayout>} />

      {/* Routes chỉ dành cho ROLE_ADMIN */}
      <Route path="/admin/categories" element={<ProtectedCategoryAdminPage />} />
      <Route path="/admin/supplier" element={<ProtectedSupplierAdminPage />} />
      <Route path="/admin" element={<ProtectedIndexAdminPage />} />
      <Route path="/admin/products" element={<ProtectedProductAdminPage />} />
      <Route path="/admin/user" element={<ProtectedUserAdminPage />} />
      <Route path="/admin/discount" element={<ProtectedDiscountAdminPage />} />
      <Route path="/admin/event" element={<ProtectedVerificationAdminPage />}/>
      <Route path="/admin/advertisement" element={<ProtectedAdvertisementAdminPage />}
      />
    </Routes>
  );
}

export default App;
