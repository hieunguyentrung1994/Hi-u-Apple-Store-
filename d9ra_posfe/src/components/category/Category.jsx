import "../../asset/css/admin.css";
import { useNavigate, Link } from "react-router-dom";
import "../../asset/css/model.css";
import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import { toast } from "react-toastify";

const CategoryAdminPage = () => {
  // Hiển thị modal
  const [isOpen, setIsOpen] = useState(false);
  // Đăng xuất
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
  ]);

  const logout = () => {
    removeCookie("token");
    removeCookie("email");
    removeCookie("fullName");
    removeCookie("Roles");
  };

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

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

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/category`, {
        name: categoryName,
      })
      .then((response) => {
        toast.success("Thêm danh mục thành công");

        setIsOpen(false);

        setCategories([...categories, response.data]);

        setCategoryName("");
      })
      .catch((error) => {
        toast.error("Lỗi khi thêm danh mục");
      });
  };

  const startEditing = (categoryId) => {
    setEditingCategoryId(categoryId);
  };

  const finishEditing = (categoryId, newName) => {
    axios
      .put(`${baseUrl}/category/${categoryId}`, {
        name: newName,
      })
      .then((response) => {
        toast.success("Cập nhật danh mục thành công");

        setEditingCategoryId(null);

        const updatedCategories = categories.map((category) =>
          category.id === categoryId ? { ...category, name: newName } : category
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        toast.error("Lỗi khi cập nhật danh mục");
      });
  };
  const blockCategory = (categoryId) => {
    axios
      .put(`${baseUrl}/category/ChangeStatus/${categoryId}`, {
        categoryId: categoryId,
      })
      .then((response) => {
        toast.success("Cập nhật trạng thái thành công");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Lỗi khi cập nhật trạng thái danh mục");
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      axios
        .get(`${baseUrl}/category`)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          toast.error("Lỗi khi tìm kiếm danh mục");
        });
    } else {
      axios
        .get(`${baseUrl}/category/search/${categoryName}`)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          toast.error("Lỗi khi tìm kiếm danh mục");
        });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

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
      <title>Admin Trung Hiếu Moblie</title>
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
              <div className="card_category">
                <div className="card-header">
                  <h3 className="card-title">Danh sách danh mục </h3>
                  <nav className="bg-light">
                    <div className="container-fluid_category">
                      <button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-success"
                      >
                        {" "}
                        + Thêm mới danh mục
                      </button>
                      <ReactModal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                      >
                        <h2 className="modal-title">Thêm mới danh mục</h2>
                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            placeholder="Tên danh mục"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                          <br />
                          <button type="submit" className="btn btn-info">
                            Thêm Mới
                          </button>
                        </form>
                      </ReactModal>

                      <form className="d-flex" onSubmit={handleSearch}>
                        <input
                          className="form-control me-2 fst-italic"
                          style={{ width: "350px" }}
                          type="search"
                          placeholder="Tìm kiếm danh mục..."
                          aria-label="Search"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          onBlur={() => {
                            if (categoryName === "") {
                              setSearchText(""); // Nếu người dùng xoá tìm kiếm, đặt searchText thành rỗng
                            }
                          }}
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
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped text-center"
                  >
                    <thead>
                      <tr>
                        <th>ID Danh Mục</th>
                        <th>Tên Danh Mục</th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác </th>
                      </tr>
                    </thead>
                    <tbody id="categories">
                      {currentItems.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>
                            {editingCategoryId === category.id ? (
                              // Nếu đang chỉnh sửa, hiển thị trường nhập liệu
                              <input
                                type="text"
                                value={category.name}
                                onChange={(e) => {
                                  // Cập nhật giá trị tên danh mục trong state
                                  const updatedCategories = categories.map(
                                    (c) =>
                                      c.id === category.id
                                        ? { ...c, name: e.target.value }
                                        : c
                                  );
                                  setCategories(updatedCategories);
                                }}
                              />
                            ) : (
                              // Nếu không, hiển thị tên danh mục thông thường
                              category.name
                            )}
                          </td>
                          <td>
                            {category.status ? "Hoạt động" : "Không hoạt động"}
                          </td>
                          <td>
                            {editingCategoryId === category.id ? (
                              // Nếu đang chỉnh sửa, hiển thị nút lưu cập nhật
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() =>
                                  finishEditing(category.id, category.name)
                                }
                              >
                                Lưu
                              </button>
                            ) : (
                              // Nếu không, hiển thị nút chỉnh sửa
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => startEditing(category.id)}
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                            )}
                          </td>
                          <td>{category.status ? <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => blockCategory(category.id)}
                          >
                            <i className="fa-solid fa-x"></i>
                          </button> : <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => blockCategory(category.id)}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          }

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoryAdminPage;
