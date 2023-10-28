import "../../asset/css/admin.css";
import { useNavigate, Link } from "react-router-dom";
import "../../asset/css/model.css";
import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import { toast } from "react-toastify";

const DiscountAdminPage = () => {
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

  const [discountName, setDiscountName] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [editingDiscountId, setEditingDiscountId] = useState(null);
  const [discountPercent, setDiscountPercent] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/discount`)
      .then((response) => {
        setDiscounts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/discount`, {
        discountCode: discountName,
        discountPercent: discountPercent,
        stock: stock,
      })
      .then((response) => {
        toast.success("Thêm mã giảm giá thành công");
        setIsOpen(false);
        setDiscounts([...discounts, response.data]);
        setDiscountName("");
        setDiscountPercent("");
        setStock("");
      })
      .catch((error) => {
        toast.error("Lỗi khi thêm mã giảm giá");
      });
  };

  const startEditing = (discountId) => {
    setEditingDiscountId(discountId);
    const discountToEdit = discounts.find(
      (discount) => discount.id === discountId
    );
    if (discountToEdit) {
      setNewDiscountCode(discountToEdit.discountCode);
      setNewDiscountPercent(discountToEdit.discountPercent);
      setNewStock(discountToEdit.stock);
    }
  };

  const finishEditing = (discountId) => {
    const updatedDiscountCode = newDiscountCode;
    const updatedDiscountPercent = newDiscountPercent;
    const updatedStock = newStock;

    axios
      .put(`${baseUrl}/discount/${discountId}`, {
        discountCode: updatedDiscountCode,
        discountPercent: updatedDiscountPercent,
        stock: updatedStock,
      })
      .then((response) => {
        toast.success("Cập nhật mã giảm giá thành công");

        setEditingDiscountId(null);

        const updatedDiscounts = discounts.map((discount) =>
          discount.id === discountId
            ? {
                ...discount,
                discountCode: updatedDiscountCode,
                discountPercent: updatedDiscountPercent,
                stock: updatedStock,
              }
            : discount
        );
        setDiscounts(updatedDiscounts);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật danh mục:", error);
      });
  };
  const blockDiscount = (discountId) => {
    axios
      .put(`${baseUrl}/discount/ChangeStatus/${discountId}`, {
        discountId: discountId,
      })
      .then((response) => {
        console.log("Cập nhật trạng thái thành công:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái danh mục:", error);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      axios
        .get(`${baseUrl}/discount`)
        .then((response) => {
          setDiscounts(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm danh mục:", error);
        });
    } else {
      axios
        .get(`${baseUrl}/discount/search/${searchText}`)
        .then((response) => {
          setDiscounts(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm danh mục:", error);
        });
    }
  };
  const [newDiscountCode, setNewDiscountCode] = useState("");
  const [newDiscountPercent, setNewDiscountPercent] = useState("");
  const [newStock, setNewStock] = useState("");

  const handleChangeDiscount = (e, fieldName, oldValue) => {
    const newValue = e.target.value;
    switch (fieldName) {
      case "discountCode":
        setNewDiscountCode(newValue || oldValue);
        break;
      case "discountPercent":
        setNewDiscountPercent(newValue || oldValue);
        break;
      case "stock":
        setNewStock(newValue || oldValue);
        break;
      default:
        break;
    }
  };
  //get random code

  const baseString =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  const getRandomString = (length, base) => {
    let result = "";
    const baseLength = base.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * baseLength);
      result += base[randomIndex];
    }
    return result;
  };

  const handleRandomCode = () => {
    const randomcode = getRandomString(8, baseString);
    setDiscountName(randomcode);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(discounts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = discounts.reverse().slice(indexOfFirstItem, indexOfLastItem);

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
              <div className="card-discount">
                <div className="card-header">
                  <h3 className="card-title">Danh sách mã giảm giá</h3>
                  <nav className="bg-light">
                    <div className="container-fluid-discount">
                      <button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-success"
                      >
                        {" "}
                        + Thêm mới mã giảm giá
                      </button>
                      <ReactModal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                      >
                        <h2 className="modal-title">Thêm mới mã giảm giá</h2>
                        <form>
                          <input
                            type="text"
                            placeholder="Tên mã giảm giá"
                            value={discountName}
                            onChange={(e) => setDiscountName(e.target.value)}
                          />
                          <span onClick={handleRandomCode}>
                            <i className="fa-solid fa-shuffle"></i>
                          </span>
                          <br />
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder="% Giảm giá"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(e.target.value)}
                          />
                          <br />
                          <input
                            type="text"
                            placeholder="Số lần SD mã"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          />

                          <br />
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleSubmit}
                          >
                            Thêm Mới
                          </button>
                        </form>
                      </ReactModal>

                      <form className="d-flex" onSubmit={handleSearch}>
                        <input
                          className="form-control me-2 fst-italic"
                          style={{ width: "350px" }}
                          type="search"
                          placeholder="Tìm kiếm mã giảm giá..."
                          aria-label="Search"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          onBlur={() => {
                            if (searchText === "") {
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
                        <th>STT</th>
                        <th>Tên mã giảm giá</th>
                        <th>% giảm giá</th>
                        <th>Số lượng mã giảm giá</th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody id="discounts">
                      {currentItems.map((discount) => (
                        <tr key={discount.id}>
                          <td>{discount.id}</td>
                          <td>
                            {editingDiscountId === discount.id ? (
                              <input
                                type="text"
                                value={newDiscountCode}
                                onChange={(e) =>
                                  handleChangeDiscount(e, "discountCode")
                                }
                              />
                            ) : (
                              discount.discountCode
                            )}
                          </td>
                          <td>
                            {editingDiscountId === discount.id ? (
                              <input
                                type="text"
                                value={newDiscountPercent}
                                onChange={(e) =>
                                  handleChangeDiscount(e, "discountPercent")
                                }
                              />
                            ) : (
                              discount.discountPercent
                            )}
                          </td>
                          <td>
                            {editingDiscountId === discount.id ? (
                              <input
                                type="text"
                                value={newStock}
                                onChange={(e) =>
                                  handleChangeDiscount(e, "stock")
                                }
                              />
                            ) : (
                              discount.stock
                            )}
                          </td>
                          <td>
                            {discount.stock === 0
                              ? "Hết mã"
                              : discount.status
                              ? "Còn mã"
                              : "Hết mã"}
                          </td>
                          <td>
                            {editingDiscountId === discount.id ? (
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => finishEditing(discount.id)}
                              >
                                Lưu
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => startEditing(discount.id)}
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                            )}
                          </td>
                          <td>
                            {discount.status ? (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => blockDiscount(discount.id)}
                              >
                                <i className="fa-solid fa-x"></i>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => blockDiscount(discount.id)}
                              >
                                <i className="fa-solid fa-check"></i>
                              </button>
                            )}
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

export default DiscountAdminPage;
