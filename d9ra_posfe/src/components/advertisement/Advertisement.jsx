import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import {
  showAllListSlider
} from "../../service/Advertisement";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import {toast} from "react-toastify"

const Advertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [advertisement, setAdvertisement] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
  ]);

  const handleNameChange = (e) => {
    setrequest((prevRequest) => ({ ...prevRequest, name: e.target.value }));
  };
  const [advertisementAddForm, setAdvertisementAddForm] = useState({
    name: "",
    imgUrl_slider: null,
  });
  const [request, setrequest] = useState({
    name : "",
    imgUrl_slider: null,
  });

  const handleImageChangeEdit = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL( e.target.files[0]));
      setrequest((request) => ({
        ...request,
        imgUrl_slider: e.target.files[0],
      }));
      console.log(request);
    }
  };
  const handleNameChangeAdd = (e) => {
    setAdvertisementAddForm((addFrom) => ({
      ...addFrom,
      name: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setAdvertisementAddForm((addFrom) => ({
        ...addFrom,
        imgUrl_slider: e.target.files[0],
      }));
    }
  };

  const hadleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", advertisementAddForm.name);
      formData.append("imgUrl_slider", advertisementAddForm.imgUrl_slider);
      await axios.post(`${baseUrl}/Advertisement/add`, formData);
      toast.success("Thêm mới thành công")
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Thêm mới thất bại!");
    }
  };
  
  const handediting = (advertisement) => {
    setSelectedImage(advertisement.imgUrl_slider);
    setrequest((request) => ({
      ...request,
      imgUrl_slider: advertisement.imgUrl_slider}));
      setrequest((request) => ({
        ...request,
        name: advertisement.name}));
    setEditingId(advertisement.id);
  };

  const handeUpdate = async (id) => {
   try{
    const formData = new FormData();
    formData.append("name", request.name);
    formData.append("imgUrl_slider", request.imgUrl_slider);
    await axios.put(`${baseUrl}/Advertisement/edit/${id}`,formData);
    toast.success("Cập nhật thành công")
    window.location.reload();
   }catch (error) {
    toast.error("Cập nhật thất bại ");
  }
  };

  const logout = () => {
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
      window.location.reload();
  };

  useEffect(() => {
    async function fetchData() {
      await showAllListSlider().then((res) => {
        setAdvertisement(res.data);
      });
    }
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(advertisement.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = advertisement.reverse().slice(indexOfFirstItem, indexOfLastItem);

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
      <title>Admin Trung H Mobile</title>
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
        <div className="mainadmin">
          <main className="content">
            <div className="container-fluid p-0">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Danh sách quảng cáo</h3>
                  <nav className="bg-light">
                    <div className="container-fluid">
                      <span className="navbar-brand" href="#">
                        <button
                          onClick={() => setIsOpen(true)}
                          className="btn btn-success"
                        >
                          {" "}
                          + Thêm mới quảng cáo
                        </button>
                        <ReactModal
                          isOpen={isOpen}
                          onRequestClose={() => setIsOpen(false)}
                          className="custom-modal"
                          overlayClassName="custom-overlay"
                        >
                          <h2 className="modal-title">Thêm mới quảng cáo</h2>
                          <form onSubmit={(e) => hadleAdd(e)}>
                            <input
                              type="text"
                              placeholder="Tên quảng cáo"
                              name="name"
                              value={advertisementAddForm.name}
                              onChange={handleNameChangeAdd}
                            />
                            <div>
                              <input
                              
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                              {selectedImage && (
                                <img
                                  src={selectedImage}
                                  alt="Chosen"
                                  style={{ height: "200px" }}
                                />
                              )}
                            </div>

                            <button style={{marginLeft:"150px"}} className="btn btn-primary" type="submit">Thêm mới</button>
                          </form>
                        </ReactModal>
                      </span>
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
                        <th>Tên quảng cáo</th>
                        <th>Ảnh hiển thị</th>
                        <th colSpan={2}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((a) => (
                        <tr key={a.id}>
                          <td>{a.id}</td>
                          <td>
                            {editingId === a.id ? (
                              <input
                                type="text"
                                name="name"
                                defaultValue={request.name}
                                onChange={handleNameChange}
                              />
                            ) : (
                              a.name
                            )}
                          </td>
                          <td>
                            {editingId === a.id ? (
                              <>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChangeEdit}
                                />
                                <img
                                  src={selectedImage || a.imgUrl_slider}
                                  width="200px"
                                  height="100px"
                                  alt="#"
                                />
                              </>
                            ) : (
                              <img
                                src={a.imgUrl_slider}
                                width="200px"
                                height="100px"
                                alt="#"
                              />
                            )}
                          </td>
                          <td>
                            {editingId === a.id ? (
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => handeUpdate(a.id)}
                              >
                                <i className="fa-solid fa-check"></i>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => handediting(a)}
                              >
                                 <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                            )}
                          </td>
                          <td><button className="btn btn-danger"><i className="fa-solid fa-x"></i></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
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
    </>
  );
};
export default Advertisement;
