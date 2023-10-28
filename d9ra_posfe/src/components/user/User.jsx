import "../../asset/css/admin.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import { toast } from "react-toastify";

const UserAdmminPage = () => {
  const [users, setUsers] = useState([]);
  // log out
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
  ]);
  const navigate = useNavigate();
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
  // trạng thái search
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy danh sách người dùng
    axios
      .get(`${baseUrl}/users`)
      .then((response) => {
        // Cập nhật trạng thái "users" với dữ liệu từ API
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  const editStatus = (id) => {
    console.log(id);
    try {
      axios
        .put(`${baseUrl}/users/lock/${id}`)
        .then((response) => {
          alert("sửa trạng thái thành công");
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi xảy ra");
    }
  };
  const userRoleFilter = "ROLE_USER";
  const filteredUsers = users.filter((user) =>
    user.roles.some((role) => role.roleName === userRoleFilter)
  );
  const searchEmail = (e) => {
    e.preventDefault();
    const email = e.target.search.value;
    axios
      .get(`${baseUrl}/users/search/${email}`)
      .then((response) => {
        setSearchedUsers(response.data);
        setIsSearched(true);
      })
      .catch((error) => {
        toast.error("Không tìm thấy người dùng");
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.reverse().slice(indexOfFirstItem, indexOfLastItem);

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
        <div>

        </div>
        <div className="mainadmin" style={{ width: "1218px" }}>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="card-user">
                <div className="card-header">
                  <h3 className="card-title">Danh sách người dùng</h3>
                  <nav className="bg-light">
                    <div className="container-fluid-user">
                      <form
                      className="user_search"
                        onSubmit={(e) => {
                          searchEmail(e);
                        }}
                      >
                        <input
                          style={{ width: "350px" }}
                          className="form-control me-2 fst-italic"
                          type="search"
                          placeholder="Tìm kiếm  "
                          name="search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Tìm kiếm
                        </button>
                      </form>
                    </div>
                  </nav>
                </div>
                {/* /.card-header */}
                <div className="card">
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped text-center"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Tên</th>
                          <th>SĐT</th>
                          <th>Trạng thái</th>
                          <th colSpan={2}>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(isSearched ? searchedUsers : currentItems).map(
                          (user) => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.email}</td>
                              <td>{user.fullName}</td>
                              <td>{user.phone}</td>
                              <td>{user.status ? "🔓" : "🔐"}</td>
                              <td>
                                <button className="btn btn-info" onClick={() => editStatus(user.id)}>
                                  Thay đổi trạng thái
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

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
                {/* /.card-body */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default UserAdmminPage;
