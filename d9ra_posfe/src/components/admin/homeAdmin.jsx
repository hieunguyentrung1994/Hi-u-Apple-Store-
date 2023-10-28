import "../../asset/css/admin.css";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../service/Userservice";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { formatPrice } from "../../service/Userservice.js";
import { formatDate } from "../../service/Userservice.js";


const HomeAdmminPage = () => {
  const date = new Date();
  const [isEditing, setEditing] = useState({});
  const [orderStatusCode, setOrderStatusCode] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [dateSearch, setDateSearch] = useState(date.toLocaleDateString());
  const [countOrder, setCountOrder] = useState(0.0);
  const [countPending, setCountPending] = useState(0);
  const [countCancel, setCountCancel] = useState(0);
  const [countSuccess, setCountSuccess] = useState(0);
  const [totalInCome, setTotalInCome] = useState(0.0);
  const [countMonthly, setCountMonthly] = useState(0.0);
  const [totalMonthly, setTotalMonthly] = useState(0.0);
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2023);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async (orderId) => {
    const response = await axios.get(
      `${baseUrl}/orderDetail/${orderId}`
    );
    setOrderDetails(response.data);
    setShow(true);
  };

  const handleEditClick = (orderId) => {
    setEditing({ [orderId]: true });
  };
  const handleCloseClick = (orderId) => {
    setEditing({ [orderId]: false });
  };
  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setOrderStatusCode(selectedValue);
  };
  const handleDateChange = (event) => {
    setDateSearch(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  // logout
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
  ]);
  const handleSubmit = (e, orderId) => {
    e.preventDefault();
    axios.put(
      `${baseUrl}/order/changeStt/${orderId}/${orderStatusCode}`
    );
    window.location.reload();
  };

  const logout = () => {
    
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
      window.location.reload();
   
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await axios.get(
          `${baseUrl}/order/total/${dateSearch}`
        );
        setTotalInCome(totalResponse.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [dateSearch]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await axios.get(`${baseUrl}/order`);
        // setOrders(orderResponse.data);
        console.log(orderResponse.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchCountOrder = async () => {
      try {
        const countOrderResponse = await axios.get(
          `${baseUrl}/order/count/${dateSearch}`
        );
        setCountOrder(countOrderResponse.data);

        const countPending = await axios.get(
          `${baseUrl}/order/countPending/${dateSearch}`
        );
        setCountPending(countPending.data);

        const countSuccess = await axios.get(
          `${baseUrl}/order/countSuccess/${dateSearch}`
        );
        setCountSuccess(countSuccess.data);

        const countCancel = await axios.get(
          `${baseUrl}/order/countCancel/${dateSearch}`
        );
        setCountCancel(countCancel.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchCountOrder();
  }, [dateSearch]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const totalResponse = await axios.get(
          `${baseUrl}/order/totalMonth/${month}/${year}`
        );
        setTotalMonthly(totalResponse.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData2();
  }, [month, year]);

  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const totalResponse = await axios.get(
          `${baseUrl}/order/countMonth/${month}/${year}`
        );
        setCountMonthly(totalResponse.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData3();
  }, [month, year]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        name="description"
        content="Responsive Admin & Dashboard Template based on Bootstrap 5"
      />
      <meta name="author" content="AdminKit" />
      <meta
        name="keywords"
        content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="shortcut icon" href="img/icons/icon-48x48.png" />
      <link rel="canonical" href="https://demo-basic.adminkit.io/" />
      <title>Admin Trung Hiếu Mobile</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <div className="wrapper">
      <nav className="sidebar">
          <Link to="/admin">
            <span>Trung Hiếu Mobile</span>
          </Link>
          <div className="dropdown">
            <ul className="sidebar-item">
            <li>
                <Link to="/">
                  <span>Back to home</span>
                </Link>
              </li>
              <li>
                <Link to="/admin">
                  <span>Doanh Thu</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/categories">
                  <span className="align-middle">Danh Mục</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/supplier">
                  <span className="align-middle">Nhà cung cấp</span>
                </Link>
              </li>
              <li>
                <Link className="sidebar-link" to="/admin/products">
                  <span>Sản Phẩm</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/user">
                  <span className="align-middle">Khách Hàng</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/discount">
                  <span>Mã giảm giá</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/advertisement">
                  <span>Quảng Cáo</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/event">
                  <span>Sự kiện Khuyến Mãi</span>
                </Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  <span>Đăng Xuất</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mainadmin" style={{ width: "1218px" }}>
          <main className="content">
            <div className="container-fluid p-0">
              <h1 className="h3 mb-3">
                
                Doanh thu theo tháng
              </h1>
              <span>
                <label htmlFor="month">Tháng</label>
                <input
                  type="number"
                  name="month"
                  value={month}
                  onChange={handleMonthChange}
                />
                <label htmlFor="year">Năm</label>
                <input
                  type="number"
                  name="year"
                  value={year}
                  onChange={handleYearChange}
                />
              </span>
              <div className="row">
                <div className="col-xl-6 col-xxl-5 d-flex">
                  <div className="w-100">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">Khách hàng</h5>
                              </div>
                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <i
                                    className="align-middle"
                                    data-feather="users"
                                  />
                                </div>
                              </div>
                            </div>
                            <h1 className="mt-1 mb-3">14.212</h1>
                            <div className="mb-0">
                              <span className="text-success">
                                {" "}
                                <i className="mdi mdi-arrow-bottom-right" />{" "}
                                5.25%{" "}
                              </span>
                              <span className="text-muted">
                                Kể từ ngày hôm qua
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">Thu nhập</h5>
                              </div>
                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <i
                                    className="align-middle"
                                    data-feather="dollar-sign"
                                  />
                                </div>
                              </div>
                            </div>
                            <h4 className="mt-1 mb-3">{formatPrice(totalMonthly)}</h4>
                            <div className="mb-0">
                              <span className="text-success">
                                {" "}
                                <i className="mdi mdi-arrow-bottom-right" />{" "}
                                6.65%{" "}
                              </span>
                              <span className="text-muted">
                                Kể từ ngày hôm qua
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">Đơn Đặt hàng</h5>
                              </div>
                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <i
                                    className="align-middle"
                                    data-feather="shopping-cart"
                                  />
                                </div>
                              </div>
                            </div>
                            <h1 className="mt12 mb-3">{countMonthly}</h1>
                            <div className="mb-0">
                              <span className="text-danger">
                                {" "}
                                <i className="mdi mdi-arrow-bottom-right" />{" "}
                                -2.25%{" "}
                              </span>
                              <span className="text-muted">
                                Kể từ ngày hôm qua
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-xxl-7">
                  <div
                    className="col-12 col-lg-8 col-xxl-9 d-flex"
                    style={{ width: "100%" }}
                  >
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h5 className="card-title mb-0">
                          Doanh thu trong ngày
                        </h5>
                        <span>
                          <input
                            type="date"
                            pattern="yyyy-MM-dd"
                            value={dateSearch}
                            onChange={handleDateChange}
                          />
                        </span>
                      </div>
                      <table className="table table-hover my-0 text-center">
                        <thead>
                          <tr>
                            <th className="d-none d-xl-table-cell">
                              Số lượng đơn hàng
                            </th>
                            <th className="d-none d-xl-table-cell">
                              Số lượng thành công
                            </th>
                            <th className="d-none d-xl-table-cell">
                              Đơn hàng đang chờ
                            </th>
                            <th className="d-none d-xl-table-cell">
                              Số lượng hủy
                            </th>
                            <th className="d-none d-xl-table-cell">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="d-none d-xl-table-cell">
                              {countOrder}
                            </td>
                            <td className="d-none d-xl-table-cell">
                              {countSuccess}
                            </td>
                            <td className="d-none d-xl-table-cell">
                              {countPending}
                            </td>
                            <td className="d-none d-xl-table-cell">
                              {countCancel}
                            </td>
                            <th className="d-none d-xl-table-cell">
                              {formatPrice(totalInCome)}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-12 col-lg-8 col-xxl-9 d-flex"
                  style={{ width: "100%" }}
                >
                  <div className="card flex-fill">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Chi tiết đơn hàng</h5>
                    </div>

                    <table className="table table-hover my-0 text-center">
                      <thead>
                        <tr>
                          <th>Mã số đơn hàng</th>
                          <th className="d-none d-xl-table-cell">Ngày đặt hàng</th>
                          <th className="d-none d-xl-table-cell">
                            Tên người nhận, SDT
                          </th>
                          <th className="d-none d-xl-table-cell">
                            Địa chỉ giao hàng{" "}
                          </th>
                          <th className="d-none d-md-table-cell">Ghi chú </th>
                          <th className="d-none d-md-table-cell">
                            Xem SP{" "}
                          </th>
                          <th>Tổng tiền</th>
                          <th>Tổng tiền thanh toán</th>
                          <th>Trạng thái đơn hàng</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td className="d-none d-xl-table-cell">
                              {formatDate(order.orderDate)}
                            </td>
                            <td className="d-none d-xl-table-cell">
                              {order.receiverName}, {order.phone}
                            </td>
                            <td className="d-none d-xl-table-cell">
                              {order.address}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {order.note}
                            </td>
                            <td className="d-none d-md-table-cell">
                              <>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    handleShow(order.id);
                                  }}
                                >
                                  <i className="fa-regular fa-eye"></i>
                                </Button>
                                <Modal show={show} onHide={handleClose} className="modal_order">
                                  <Modal.Header closeButton>
                                    
                                  </Modal.Header>
                                  <Modal.Body>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Sp</th>
                                          <th>Tên Sp</th>
                                          <th>Giá SP</th>
                                          <th>Số lượng</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {orderDetails.map((orderDetail) => (
                                          <tr key={orderDetail.id}>
                                            <td>
                                              {orderDetail.productResponse.id}
                                            </td>
                                            <td>
                                              {
                                                orderDetail.productResponse
                                                  .productName
                                              }
                                            </td>
                                            <td>
                                              {formatPrice
                                                (orderDetail.productResponse
                                                  .price)
                                              }
                                            </td>
                                            <td>{orderDetail.quantity}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
                                      Đóng
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>
                            </td>
                            <td>{formatPrice(order.totalAmount)}</td>
                            <td>{formatPrice(order.amountAfterDiscount)}</td>
                            {isEditing[order.id] ? (
                              <td key={order.id}>
                                <form
                                  onSubmit={(e) => {
                                    handleSubmit(e, order.id);
                                  }}
                                >
                                  <select
                                    name="orderStatusName"
                                    value={orderStatusCode}
                                    onChange={handleStatusChange}
                                  >
                                    <option value="">Chỉnh sửa trang thái</option>
                                    <option value={1}>Đang xác nhận</option>
                                    <option value={2}>Đã xác nhận</option>
                                    <option value={3}>Đang giao</option>
                                    <option value={4}>Đã giao</option>
                                    <option value={5}>Người dùng huỷ</option>
                                    <option value={6}>Shop huỷ</option>
                                  </select>
                                  <button
                                    className="btn btn-success"
                                    type="submit"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleCloseClick(order.id)}
                                  >
                                    Đóng
                                  </button>
                                </form>
                              </td>
                            ) : (
                              <>
                                <td>
                                  {/* <span>{order.orderStatus}</span> */}
                                </td>
                                <td>
                                  <button
                                    className="badge bg-success"
                                    onClick={() => handleEditClick(order.id)}
                                  >
                                    Thay đổi
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pager">
                  <ul className="pagination-list">
                    <li className={`pagination-item prev-page ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a href="#" className={`pagination-item__link ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                        <span></span>
                      </a>
                    </li>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`pagination-item ${index + 1 === currentPage ? 'pagination-item--active' : ''}`}>
                        <a href="#" className="pagination-item__link" onClick={() => handlePageChange(index + 1)}>
                          <span>{index + 1}</span>
                        </a>
                      </li>
                    ))}
                    <li className={`pagination-item next-page ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a href="#" className="pagination-item__link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <span></span>
                      </a>
                    </li>

                  </ul>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default HomeAdmminPage;