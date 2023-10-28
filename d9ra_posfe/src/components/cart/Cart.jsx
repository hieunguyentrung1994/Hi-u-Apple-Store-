
import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";

import { baseUrl } from "../../service/Userservice";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../../service/Userservice";
import chuyenkhoan from "../../asset/img/chuyenkhoannganhang.jpg";;



const CartPage = () => {
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0.0);
  const [promotion, setPromotion] = useState(0.0);
  const [promotionId, setPromotionId] = useState(0);
  const [urlPayment, setUrlPayment] = useState("");
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "phone",
    "password",
  ]);
  const removeCartItem = async (productId) => {
    await axios.delete(`${baseUrl}/cart/removeProduct/${productId}`);
  };
  const minusQuantity = async (productId) => {
    await axios.put(`${baseUrl}/cart/minus/${productId}`);
    const updatedCart = newCart.map((item) => {
      if (item.productId === productId) {
        if (item.quantity <= 1) {
          removeCartItem(item.productId);
        }
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
    setNewCart(updatedCart);
  };
  const plusQuantity = async (productId) => {
    await axios.put(`${baseUrl}/cart/plus/${productId}`);
  };

  const [newCart, setNewCart] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const calculateTotal = () => {
    const total = newCart.reduce((acc, cartItem) => {
      return acc + cartItem.total;
    }, 0);
    setTotalPayment(total);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/cart/getAll`)
      .then((response) => setNewCart(response.data));
    calculateTotal();
  }, [removeCartItem, plusQuantity, minusQuantity]);

  const handleInputName = (e) => {
    setReceiverName(e.target.value);
  };
  const handleInputPhone = (e) => {
    setPhone(e.target.value);
  };
  const handleInputAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleInputNote = (e) => {
    setNote(e.target.value);
  };
  const handleInputDiscountCode = (e) => {
    setDiscountCode(e.target.value);
  };
  const handleChangeEvent = (e) => {
    setPromotionId(e.target.value);
    fetchEventsById(e.target.value);
  };

  const handleChangeDiscount = (e) => {
    setDiscountId(e.target.value);
    fetchDiscountById(e.target.value);
  };
  const fetchDiscountById = async (id) => {
    const res = await axios.get(`${baseUrl}/discount/${id}`);
    setDiscountAmount(res.data.discount_percent);
  };
  const fetchEventsById = async (promotionId) => {
    const res = await axios.get(`${baseUrl}/promotion/${promotionId}`);
    setPromotion(res.data.discountPrice);
  };

  const totalAmount =
    totalPayment - promotion - (totalPayment * discountAmount) / 100;

  const handleSearchDiscountCode = async (e) => {
    const res = await axios.get(`${baseUrl}/discount/search/${discountCode}`);
    setDiscounts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formOrder = new FormData();
      if (receiverName === "" || phone === "" || address === "") {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
      formOrder.append("receiverName", receiverName);
      formOrder.append("phone", phone);
      formOrder.append("address", address);
      formOrder.append("note", note);
      formOrder.append("userEmail", cookies.email);
      formOrder.append("discountIds", discountId);
      formOrder.append("promotionEventIds", promotionId);
      formOrder.append("totalAmount", totalPayment);

      await axios
        .post(`${baseUrl}/payments/submitOrder`, formOrder)
        .then((res) => {
          console.log(res.data);
          window.location.href = res.data.vnpayUrl;
        });
    } catch (error) {
      console.log(error);
    }
  };
  // Logout
  const logout = () => {
   
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
      removeCookie("phone");
      removeCookie("password");
   
      window.location.reload();
    
  };

  const isLoggedIn = !!cookies.token;

  useEffect(() => {
    if (!cookies.token) {
      toast.error("Bạn cần đăng nhập trước");
      navigate("/login");
    }
  }, [cookies]);
  const showAllListEvent = async () => {
    let response = await axios.get(`${baseUrl}/promotion/all`);
    return response;
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await showAllListEvent();
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - Giỏ hàng</title>
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
          <div className="product-heading">
            <ul>
              <li>
                <a href="./index.html" className="">
                  Trang chủ
                </a>
                <span className="delimiter">&gt;</span>
              </li>
              <li>
                <strong>Giỏ hàng</strong>
              </li>
            </ul>
          </div>
          <div className="grid wide">
            <div className="box-item">
              <div className="cart-empty">
                <span>Giỏ hàng của bạn chưa có sản phẩm nào!</span>
              </div>
            </div>
            <div className="row">
              {/* --Left Cart-- */}
              <div className="col l-8 m-12 c-12">
                <div className="shopping-cart-info">
                  <div className="cart-details">
                    <div className="table-wrapper">
                      <table className="cart">
                        <thead>
                          <tr>
                            <th className="product-picture">Hình ảnh</th>
                            <th className="product">Tên sản phẩm</th>
                            <th className="unit-price">Giá bán</th>
                            <th className="quantity">Số lượng</th>
                            <th className="remove-from-cart" />
                          </tr>
                        </thead>
                        <tbody>
                          {newCart.map((cart) => (
                            <tr key={cart.productId}>
                              <td className="product-picture">
                                <a href="./Product-details.html">
                                  <img src={cart.img} />
                                </a>
                              </td>
                              <td className="product">{cart.productName}</td>
                              <td className="unit-price">
                                <label className="td-title">Giá bán:</label>
                                <span>{formatPrice(cart.unitPrice)}</span>
                              </td>
                              <td className="quantity">
                                <button
                                  className="btn"
                                  onClick={() => minusQuantity(cart.productId)}
                                >
                                  -
                                </button>
                                <label
                                  className="td-title"
                                  htmlFor="itemquantity82586"
                                >
                                  Số lượng:
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  className="qty-inpu"
                                  value={cart.quantity}
                                />
                                <button
                                  className="btn"
                                  onClick={() => plusQuantity(cart.productId)}
                                >
                                  +
                                </button>
                              </td>
                              <td className="remove-from-cart">
                                <button
                                  onClick={() => removeCartItem(cart.productId)}
                                  className="remove-btn"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="title-checkout__billing">
                    Thông tin thanh toán
                  </div>
                  <div className="all-check__billing">
                    <div id="checkout-billing-load">
                      <div className="choose-payment">
                        <div className="select-billing-address">
                          <label className="tt-address-select">
                            Thông tin cá nhân
                          </label>
                        </div>
                        <div className="new-billing-address">
                          <div className="enter-address">
                            <div className="edit-address">
                              <div className="inputs">
                                <input
                                  placeholder="Tên người nhận"
                                  type="text"
                                  id="BillingNewAddress_FirtsName"
                                  required
                                  name="receiverName"
                                  value={receiverName}
                                  onChange={handleInputName}
                                />
                              </div>
                              <div className="inputs two_col left">
                                <input
                                  placeholder="Số điện thoại"
                                  type="tel"
                                  id="BillingNewAddress_PhoneNumber"
                                  required
                                  name="phone"
                                  value={phone}
                                  onChange={handleInputPhone}
                                />
                              </div>
                              <div className="inputs two_col right">
                                <input
                                  placeholder="Ghi chú"
                                  type="text"
                                  id="BillingNewAddress_Email"
                                  name="note"
                                  value={note}
                                  onChange={handleInputNote}
                                />
                              </div>
                              <div className="inputs one_col">
                                <input
                                  type="text"
                                  id="BillingNewAddress_Address1"
                                  placeholder="Địa chỉ"
                                  required
                                  name="address"
                                  value={address}
                                  onChange={handleInputAddress}
                                />
                              </div>

                              <div className="search_discount_input">
                                <input
                                  type="search"
                                  id="search_discount"
                                  placeholder="Nhập mã giảm giá"
                                  className="discountId"
                                  value={discountCode}
                                  onChange={handleInputDiscountCode}
                                />
                                {discountCode === "" ? (
                                  <>
                                    <button
                                      disabled
                                      className="search_discount"
                                    >
                                      <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="search_discount"
                                      onClick={handleSearchDiscountCode}
                                    >
                                      <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                  </>
                                )}
                              </div>
                              <ul className="show_listDiscount">
                                {discounts.map((discount) => (
                                  <div
                                    className="discount_code"
                                    key={discount.id}
                                  >
                                    <div className="discount-details">
                                      <input
                                        type="radio"
                                        className="discount_search"
                                        name="discountRadio"
                                        value={discount.id}
                                        onChange={handleChangeDiscount}
                                      />
                                      <div className="render_discount">
                                        Mã {discount.discountCode} giảm{" "}
                                        {discount.discountPercent} %
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </ul>

                              <label className="tt-address-select">
                                Sự kiện giảm giá
                              </label>
                              <ul className="event_list">
                                {events.map((event) => (
                                  <div
                                    className="event_code"
                                    key={event.id}
                                  >
                                    <div className="event_name">
                                      <input
                                        type="radio"
                                        className="eventmethod"
                                        name="selectedEvent"
                                        value={event.id}
                                        id={`event_${event.id}`}
                                        onChange={handleChangeEvent}
                                      />
                                      <label
                                        htmlFor={`event_${event.id}`}
                                      >
                                        <div className="render_event">
                                          Mã {event.name} giảm{" "}
                                          {event.discountPrice} VNĐ
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="checkout-payment-load">
                      <div className="choose-payment">
                        <div className="payment-method">
                          <div className="address-select">
                            Phương thức thanh toán
                          </div>
                          <ul className="method-list">
                            <li>
                              <div className="method-name">
                                <div className="payments-details">
                                  <div className="">
                                    <input
                                      id="paymentmethod_1"
                                      type="radio"
                                      name="paymentmethod"
                                      defaultValue="Payments.VietQr"
                                      defaultChecked="checked"
                                    />
                                  </div>
                                  <div className="payment-logo">
                                    <label htmlFor="paymentmethod_1">
                                      <img
                                        src={chuyenkhoan}
                                        width={36}
                                        height={36}
                                      />
                                    </label>
                                  </div>
                                  <div className="item_paymentmethod">
                                    <label htmlFor="paymentmethod_1">
                                      Vn Pay QR
                                    </label>
                                  </div>
                                </div>
                              </div>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --Right Cart-- */}
              <div className="col l-4 m-12 c-12">
                <div className="sidebar-cart">
                  <div className="totals">
                    <div className="totals-info">
                      <table className="cart-total">
                        <tbody>
                          <tr className="order-subtotal">
                            <td className="cart-total-left">
                              <label>Tạm tính:</label>
                            </td>
                            <td className="cart-total-right">
                              <span className="cart-value">
                                {formatPrice(totalPayment)}
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <td className="cart-total-left">
                              <label>Tổng cộng:</label>
                            </td>
                            <td className="cart-total-right">
                              <span className="cart-total-value">
                                {totalAmount < 0 ? 0 : formatPrice(totalAmount)}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="checkout-button">
                      <button
                        className="btn-cart"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        Tiến hành đặt hàng
                      </button>
                    </div>
                    <div className="note-ck">
                      (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartPage;
