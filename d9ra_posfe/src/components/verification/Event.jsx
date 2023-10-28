import { useNavigate, Link } from "react-router-dom";
import "../../asset/css/model.css";
import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { showAllListEvent, addNew } from "../../service/EventService";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import { formatDate } from "../../service/Userservice";
import { formatPrice } from "../../service/Userservice";

const VerificationAdmminPage = () => {
  // hiển thị model
  const [isOpen, setIsOpen] = useState(false);
  //logout
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
  ]);
  const [listEvent, setListEvent] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [addEvent, setAddEvent] = useState({
    name: "",
    startDate: "",
    expiredDate: "",
    discountPrice: "",
  });
  const [updateEvent, setUpdateEvent] = useState({
    name: "",
    startDate: "",
    expiredDate: "",
    discountPrice: "",
  });
  const handleOnchangeName = (event) => {
    setAddEvent((addEvent) => ({ ...addEvent, name: event.target.value }));
  };
  const handleOnchangeStartDate = (event) => {
    setAddEvent((addEvent) => ({ ...addEvent, startDate: event.target.value }));
  };
  const handleOnchangeExpiredDate = (event) => {
    setAddEvent((addEvent) => ({
      ...addEvent,
      expiredDate: event.target.value,
    }));
  };
  const handleOnchangeDiscountPrice = (event) => {
    setAddEvent((addEvent) => ({
      ...addEvent,
      discountPrice: event.target.value,
    }));
  };
  const logout = () => {
    const isConfirmed = window.confirm("Có đúng bạn xác nhận đăng xuất không?");
    if (isConfirmed) {
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
    } else {
      window.location.reload();
    }
  };

  const healdAddEvent = async (e) => {
    e.preventDefault();
    const payload = {
      name: addEvent.name,
      startDate: addEvent.startDate,
      expiredDate: addEvent.expiredDate,
      discountPrice: parseFloat(addEvent.discountPrice),
    };
    try {
      await axios.post(`${baseUrl}/promotion/add`, payload);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClickBlock = async (id) => {
    console.log(id);
    try {
      await axios.put(`${baseUrl}/promotion/changes/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handediting = (event) => {
    setUpdateEvent((e) => ({
      ...e,
      name: event.name,
    }));
    setUpdateEvent((e) => ({
      ...e,
      startDate: event.startDate,
    }));
    setUpdateEvent((e) => ({
      ...e,
      expiredDate: event.expiredDate,
    }));
    setUpdateEvent((e) => ({
      ...e,
      discountPrice: event.discountPrice,
    }));
    setEditingId(event.id);
  };
  const handleNameChange = (e) => {
    setUpdateEvent((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleStartDateChange = (e) => {
    setUpdateEvent((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const handleExpiredDateChange = (e) => {
    setUpdateEvent((prev) => ({ ...prev, expiredDate: e.target.value }));
  };

  const handleDiscountPriceChange = (e) => {
    setUpdateEvent((prev) => ({ ...prev, discountPrice: e.target.value }));
  };
  const updateSave = async (id) => {
    const formUpdate = {
      name: updateEvent.name,
      startDate: updateEvent.startDate,
      expiredDate: updateEvent.expiredDate,
      discountPrice: parseFloat(updateEvent.discountPrice),
    };

    try {
      await axios.put(`${baseUrl}/promotion/edit/${id}`, formUpdate);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await showAllListEvent().then((res) => {
        setListEvent(res.data);
        console.log(listEvent);
      });
    }
    fetchData();
  }, []);
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
      <title>AdminKit Demo - Bootstrap 5 Admin Template</title>
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
              <div className="card-event">
                <div className="card-header">
                  <h3 className="card-title">Danh sách Khuyến mãi</h3>
                  <nav className="bg-light">
                    <div className="container-fluid-event">
                      <a className="navbar-brand" href="#">
                        <button
                          onClick={() => setIsOpen(true)}
                          className="btn btn-success"
                        >
                          {" "}
                          + Thêm mới khuyến mãi
                        </button>
                        <ReactModal
                          isOpen={isOpen}
                          onRequestClose={() => setIsOpen(false)}
                          className="custom-modal"
                          overlayClassName="custom-overlay"
                        >
                          <h2 className="modal-title">Thêm Mới Khuyến Mãi</h2>
                          <form onSubmit={(e) => healdAddEvent(e)}>
                            <input
                              type="text"
                              placeholder="Tên Khuyến Mãi"
                              name="name"
                              value={addEvent.name}
                              onChange={(e) => handleOnchangeName(e)}
                            />
                            <br />
                            <b>ngày bắt đầu</b>
                            <input
                              type="date"
                              name="startDate"
                              value={addEvent.startDate}
                              onChange={(e) => handleOnchangeStartDate(e)}
                            />
                            <br />
                            <b>ngày kết thúc</b>
                            <input
                              type="date"
                              name="expiredDate"
                              value={addEvent.expiredDate}
                              onChange={(e) => handleOnchangeExpiredDate(e)}
                            />
                            <br />
                            <input
                              type="text"
                              placeholder="Số tiền khuyến mãi"
                              name="discountPrice"
                              value={addEvent.discountPrice}
                              onChange={(e) => handleOnchangeDiscountPrice(e)}
                            />
                            <br />
                            <button className="btn btn-info" type="submit">
                              Thêm Mới
                            </button>
                          </form>
                        </ReactModal>
                      </a>
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2 fst-italic"
                          style={{ width: "350px" }}
                          type="search"
                          placeholder="tìm kiếm   "
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                        Tìm kiếm
                        </button>
                      </form>
                    </div>
                  </nav>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped text-center"
                  >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên sự kiện</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Số tiền giảm</th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listEvent.map((a) => (
                        <tr key={a.event_id}>
                          {editingId === a.id ? (
                            <>
                              <td>{a.id}</td>
                              <td>
                                <input
                                  value={updateEvent.name}
                                  onChange={handleNameChange}
                                />
                              </td>
                              <td>
                                <input
                                type="date"
                                  value={updateEvent.startDate}
                                  onChange={handleStartDateChange}
                                />
                              </td>
                              <td>
                                <input
                                type="date"
                                  value={updateEvent.expiredDate}
                                  onChange={handleExpiredDateChange}
                                />
                              </td>
                              <td>
                                <input
                                  value={updateEvent.discountPrice}
                                  onChange={handleDiscountPriceChange}
                                />
                              </td>
                              <td>
                                {a.status
                                  ? "Đang hoạt động"
                                  : "ngừng hoạt động"}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() => updateSave(a.id)}
                                >
                                  Lưu
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleOnClickBlock(a.id)}
                                >
                                  Huỷ
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{a.event_id}</td>
                              <td>{a.name}</td>
                              <td>{formatDate(a.start_date)}</td>
                              <td>{formatDate(a.expired_date)}</td>
                              <td>{formatPrice(a.discountPrice)}</td>
                              <td>
                                {a.status
                                  ? "Đang hoạt động"
                                  : "ngừng hoạt động"}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() => handediting(a)}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleOnClickBlock(a.id)}
                                >
                                   <i className="fa-solid fa-x"></i>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
            </div>
          </main>
        </div>
      </div>
      
    </>
  );
};
export default VerificationAdmminPage;
