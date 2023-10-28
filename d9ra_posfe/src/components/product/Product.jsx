import "../../asset/css/admin.css";
import { useNavigate, Link } from "react-router-dom";
import model from "../../asset/css/model.css";
import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseUrl } from "../../service/Userservice";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { formatPrice } from "../../service/Userservice";

const ProductAdmminPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => setIsOpen(false);
  const handleCloseEdit = () => setIsOpenEdit(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keySearchProducts, setKeySearchProducts] = useState("");

  const [editProduct, setEditProduct] = useState({
    id: null,
    productName: "",
    price: "",
    stock: "",
    description: "",
    imgUrlMain: null,
    categoryId: "",
    supplierId: "",
    status: true,
  });

  const [productAddForm, setProductAddForm] = useState({
    productName: "",
    price: "",
    stock: "",
    description: "",
    imgUrlMain: null,
    categoryId: "",
    supplierId: "",
    status: true,
  });



  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/supplier`);
        setSuppliers(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchCategory();
  }, []);
  useEffect(() => {
    axios
      .get(`${baseUrl}/products/getAll`)
      .then((response) => setProducts(response.data));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", productAddForm.productName);
      formData.append("imgUrlMain", productAddForm.imgUrlMain);
      formData.append("description", productAddForm.description);
      formData.append("stock", productAddForm.stock);
      formData.append("price", productAddForm.price);
      formData.append("categoryId", productAddForm.categoryId);
      formData.append("supplierId", productAddForm.supplierId);
      formData.append("status", true);
      await axios.post(`${baseUrl}/products/add`, formData);
      setIsOpen(false);
      axios
        .get(`${baseUrl}/products`)
        .then((response) => setProducts(response.data));
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setProductAddForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setEditProduct({
      ...editProduct,
      categoryId: selectedCategoryId,
    });
  };
  const handleSearchInputChange = (e, setKeySearchProducts) => {
    setKeySearchProducts(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductAddForm({ ...productAddForm, imgUrlMain: file });
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file != null) {
      setEditProduct({ ...editProduct, imgUrlMain: file });
    }
  };
  const handleEdit = (product) => {
    setEditProduct({
      id: product.id,
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      description: product.description,
      imgUrl_main: null,
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      status: product.status,
    });

    setIsOpenEdit(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataEdit = new FormData();
      formDataEdit.append("id", editProduct.id);
      formDataEdit.append("productName", editProduct.productName);
      formDataEdit.append("imgUrlMain", editProduct.imgUrlMain);
      formDataEdit.append("description", editProduct.description);
      formDataEdit.append("stock", editProduct.stock);
      formDataEdit.append("price", editProduct.price);
      formDataEdit.append("categoryId", editProduct.categoryId);
      formDataEdit.append("supplierId", editProduct.supplierId);
      formDataEdit.append("status", editProduct.status);

      await axios.put(
        `${baseUrl}/products/update/${editProduct.id}`,
        formDataEdit
      );
      axios
        .get(`${baseUrl}/products`)
        .then((response) => setProducts(response.data));
      console.log(editProduct.product_id);
      setIsOpenEdit(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (keySearchProducts.trim()) {
      try {
        await axios
          .get(`${baseUrl}/products/search/${keySearchProducts}`)
          .then((response) => {
            setProducts(response.data);
          });
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        await axios
          .get(`${baseUrl}/products`)
          .then((response) => {
            setProducts(response.data);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const handleChangeStt = async (product) => {
    try {
      await axios.put(
        `${baseUrl}/products/changeStt/${product.id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.reverse().slice(indexOfFirstItem, indexOfLastItem);

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
                  <h3 className="card-title">Danh sách sản phẩm</h3>
                  <nav className="bg-light">
                    <div className="container-fluid-product">
                      <span className="navbar-brand" href="#">
                        <button
                          onClick={() => setIsOpen(true)}
                          className="btn btn-success"
                        >
                          {" "}
                          + Thêm mới sản phẩm
                        </button>
                        {/* Modal Add new */}
                        <ReactModal
                          isOpen={isOpen}
                          onRequestClose={() => setIsOpen(false)}
                          className="custom-modal"
                          overlayClassName="custom-overlay"
                        >
                          <h2 className="modal-title">Thêm Mới Sản Phẩm</h2>
                          <form
                            onSubmit={(e) => {
                              handleSubmit(e);
                            }}
                          >
                            <div>

                              <input
                                type="file"
                                accept="image/*"
                                name="imgUrlMain"
                                onChange={handleImageChange}
                              />
                            </div>
                            <FloatingLabel controlId="floatingInput" label="Tên sản phẩm ">
                              <Form.Control
                                type="text"
                                name="productName"
                                value={productAddForm.productName}
                                onChange={handleOnchange}
                              />
                            </FloatingLabel>


                            <br />
                            <label htmlFor="supplierId" >Nhà cung cấp</label>
                            <select
                              name="supplierId"
                              value={productAddForm.supplierId}
                              onChange={handleOnchange}
                            >
                              <option defaultValue={suppliers.supplier}>Chọn nhà cung cấp</option>
                              {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                  {supplier.name}
                                </option>
                              ))}
                            </select>
                            <br />
                            <textarea
                              placeholder="Giới thiệu sản phẩm"
                              name="description"
                              value={productAddForm.description}
                              onChange={handleOnchange}
                            />
                            <br />
                            <label >Danh mục</label>
                            <select
                              name="categoryId"
                              value={productAddForm.categoryId}
                              onChange={handleOnchange}
                            >
                              <option defaultValue={categories.category}>Chọn danh mục</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                            <br />
                            <FloatingLabel label="Giá ">
                              <Form.Control
                                type="number"

                                name="price"
                                value={productAddForm.price}
                                onChange={handleOnchange}
                              />
                            </FloatingLabel>

                            <br />
                            <FloatingLabel label="Số Lượng ">
                              <Form.Control
                                type="number"

                                name="stock"
                                value={productAddForm.stock}
                                onChange={handleOnchange}
                              />
                            </FloatingLabel>
                            <br />
                            <div className="btn_product_add">
                              <button className="btn btn-info" type="submit">
                                Thêm Mới
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={handleClose}
                              >
                                Đóng
                              </button>
                            </div>

                          </form>
                        </ReactModal>
                      </span>
                      <form
                        className="d-flex"
                        role="search"
                        onSubmit={(e) => {
                          handleSearchSubmit(e);
                        }}
                      >
                        <input
                          className="form-control me-2 fst-italic"
                          style={{ width: "350px" }}
                          type="search"
                          placeholder="tìm kiếm sản phẩm "
                          aria-label="Search"
                          value={keySearchProducts}
                          onChange={(e) =>
                            handleSearchInputChange(e, setKeySearchProducts)
                          }
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Tìm kiếm
                        </button>
                      </form>
                      <ReactModal
                        isOpen={isOpenEdit}
                        onRequestClose={() => setIsOpenEdit(false)}
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                      >
                        <h2 className="modal-title">Edit Sản Phẩm</h2>
                        <form
                          onSubmit={(e) => {
                            handleEditSubmit(e);
                          }}
                        >
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              name="imgUrlMain"
                              onChange={handleEditImageChange}
                            />
                          </div>
                          <label >Tên sản phẩm</label>
                          <input
                            type="text"
                            name="productName"
                            value={editProduct.productName}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="">Nhà cung cấp</label>
                          <select
                            name="supplierId"
                            value={editProduct.supplierId}
                            onChange={handleInputChange}
                          >
                            <option defaultValue={suppliers.supplier}>Chọn nhà cung cấp</option>
                            {suppliers.map((supplier) => (
                              <option
                                key={supplier.id}
                                value={supplier.id}
                                selected={
                                  editProduct.supplierId === supplier.id
                                }
                              >
                                {supplier.name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <label htmlFor="">Mô tả</label>
                          <textarea
                            placeholder="Giới thiệu sản phẩm"
                            name="description"
                            value={editProduct.description}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="">Danh mục</label>
                          <select
                            name="categoryId"
                            value={editProduct.categoryId}
                            onChange={handleCategoryChange}
                          >
                            <option defaultValue={categories.category}>Chọn danh mục</option>

                            {categories.map((category) => (
                              <option key={category.id} value={category.id} >
                                {category.name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <label htmlFor="">Giá</label>
                          <br />
                          <input
                            type="number"
                            placeholder="Giá Sản phẩm"
                            name="price"
                            value={editProduct.price}
                            onChange={handleInputChange}
                          />

                          <br />
                          <label htmlFor="">Số lượng</label>
                          <input
                            type="number"
                            name="stock"
                            value={editProduct.stock}
                            onChange={handleInputChange}
                          />



                          <br />
                          <div className="btn-edit-product">
                            <button className="btn btn-info" type="submit">
                              Lưu
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={handleCloseEdit}
                            >
                              Đóng
                            </button>
                          </div>

                        </form>
                      </ReactModal>
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
                        <th>Tên Sản Phẩm</th>
                        <th>Ảnh</th>
                        <th>Thương hiệu</th>
                        <th>GT sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>SL </th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((product) => (
                        <tr key={product.id}  >
                          <td>{product.id}</td>
                          <td>{product.productName}</td>
                          <td>
                            <img
                              src={product.imgUrlMain}
                              width="100 px"
                              height="100 px"
                              alt="#"
                            />
                          </td>
                          <td>{product.supplierName}</td>
                          <td>{product.description}</td>
                          <td>{product.category}</td>
                          <td>{formatPrice(product.price)}</td>
                          <td>{product.stock}</td>
                          <td>{product.status ? "Đang bán" : "Ngừng bán"}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => handleEdit(product)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                          </td>
                          <td>
                            {product.status ? (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleChangeStt(product)}
                              >
                                <i className="fa-solid fa-x"></i>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleChangeStt(product)}
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
export default ProductAdmminPage;
