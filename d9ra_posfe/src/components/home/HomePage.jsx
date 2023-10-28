import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  showAllList,
  showListHeart,
  addHeart,
  removeHeart,
} from "../../service/product";
import { baseUrl } from "../../service/Userservice";
import { showAllListSlider } from "../../service/Advertisement";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import { formatPrice } from "../../service/Userservice";

function HomePage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "phone",
    "password",
  ]);

  const [listcart, setlistCart] = useState([]);
  const [listHeart, setListHeart] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [isFound, setIsFound] = useState(true);
  const isLoggedIn = !!cookies.token;

  const logout = () => {
    const isConfirmed = window.confirm("Có đúng bạn xác nhận đăng xuất ?");
    if (isConfirmed) {
      removeCookie("token");
      removeCookie("email");
      removeCookie("fullName");
      removeCookie("Roles");
      removeCookie("phone");
      removeCookie("password");
      navigate("/");
    } else {
      window.location.reload();
    }
  };
  const addToCart = async (productId) => {
    if (cookies.email === undefined) {
      toast.warning("Bạn cần đăng nhập");
    } else {
      try {
        await axios.get(`${baseUrl}/cart/add/${productId}`);
        toast.success("Đã thêm vào giỏ hàng");
      } catch (err) {
        toast.error("Hết hàng");
      }
    }
  };
  //thêm xóa yêu thích
  const addHeart1 = async (productid) => {
    if (cookies.email === undefined) {
      toast.warning("Bạn cần đăng nhập");
    } else {
      const isAlreadyAdded = listHeart.some((item) => item.id === productid);
      if (!isAlreadyAdded) {
        await addHeart(productid, cookies.email);
        setListHeart((prevListHeart) => [...prevListHeart, { id: productid }]);
      }
    }
  };
  const removieHeart1 = async (productid) => {
    await removeHeart(productid, cookies.email);
    setListHeart((prevListHeart) =>
      prevListHeart.filter((item) => item.id !== productid)
    );
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });

    async function fetchData() {
      await showAllList().then((res) => {
        setProduct(res.data);
      });
    }

    fetchData();

    async function fetchHeart() {
      if (cookies.email === undefined) {
      } else {
        await showListHeart(cookies.email).then((res) => {
          setListHeart(res.data);
        });
      }
    }

    fetchHeart();

    async function fetchSlider() {
      await showAllListSlider().then((res) => {
        setAdvertisement(res.data);
      });
    }

    fetchSlider();
  }, [cookies.email]);

  const [keySearchProducts, setKeySearchProducts] = useState("");
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (keySearchProducts.trim()) {
      try {
        const response = await axios.get(
          `${baseUrl}/products/search/${keySearchProducts}`
        );
        if (response.data.length > 0) {
          setProduct(response.data)
          setIsFound(true)
        } else {
          setIsFound(false)
        }

      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        setProduct(response.data);
        setIsFound(true)
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const [sortOption, setSortOption] = useState(1);
  const handleSortChange = async (e) => {
    const selectedOption = parseInt(e.target.value);
    setSortOption(selectedOption);
    if (selectedOption === 2) {
      const sortedProducts = [...product];
      sortedProducts.sort((a, b) => a.price - b.price);
      setProduct(sortedProducts);
    } else if (selectedOption === 3) {
      const sortedProducts = [...product];
      sortedProducts.sort((a, b) => b.price - a.price);
      setProduct(sortedProducts);
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
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - Cửa hàng Apple chính hãng</title>
      <div className="wrapper">
        {/* Swiper Slider*/}
        <Carousel className="slider mySwiper">
          {advertisement.map((event) => (
            <Carousel.Item className="slide swiper-slide" key={event.id}>
              <a href="./" className="slider-link">
                <img src={event.imgUrl_slider} alt="" className="slider-img" />
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="filter-cate">
          <div>
            {/* form search */}
            <form className="search_UA" onSubmit={(e) => {
              handleSearchSubmit(e);
            }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={keySearchProducts}
                onChange={(e) => setKeySearchProducts(e.target.value)}
                onBlur={() => {
                  if (keySearchProducts === "") {
                  }
                }}
              />

              <button className="btn_search" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="ft-sort">
            <select
              id=""
              name=""
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value={1}>Sắp xếp theo</option>
              <option value={2}>Giá thấp đến cao</option>
              <option value={3}>Giá cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="main">
          <div className="grid wide">
            {!isFound ? <div>Khong tim thay</div> : <>
              <div className="row">
                {currentItems
                  .filter((category) => category.status)
                  .map((category) => (
                    <div key={category.id}>
                      <div className="category_view">
                        <h1 className="category_name">{category.name}</h1>
                        <Link to={`/home/${category.id}`} className="view-all-link">
                          Xem tất cả
                        </Link>
                      </div>
                      <div className="products-container row">
                        {product
                          .filter((product) => product.categoryId === category.id)
                          .slice(0, 3)
                          .map((product) => {
                            const isProductInListHeart = listHeart.some(
                              (item) => item.id === product.id
                            );
                            return (
                              <div className="col l-3 m-4 c-6" key={product.id}>
                                <div className="product-item">
                                  <div className="product-item__img">
                                    <a href={`/product/${product.id}`} className="">
                                      <img
                                        src={product.imgUrlMain}
                                        alt=""
                                        className="product-img"
                                      />
                                    </a>
                                  </div>
                                  <div className="product-item__details">
                                    <a href="">
                                      <h2 className="product-title">
                                        {product.productName}
                                      </h2>
                                    </a>
                                    <div className="product-price">
                                      <span className="product-price__price">
                                        {formatPrice(product.price)}
                                      </span>
                                    </div>
                                    <div className="product_status">
                                      <span
                                        style={{
                                          color: product.status ? "green" : "red",
                                        }}
                                      >
                                        {product.status ? "Còn hàng" : "Hết hàng"}
                                      </span>
                                    </div>
                                    <span className="navbarmini">
                                      <button
                                        className="add_Cart"
                                        onClick={() => addToCart(product.id)}
                                      >
                                        +
                                      </button>
                                      {isProductInListHeart ? (
                                        <button
                                          onClick={() => removieHeart1(product.id)}
                                          className="heartOut"
                                        >
                                          <i
                                            className="fa-solid fa-heart"
                                            style={{ color: "#e70808" }}
                                          ></i>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => addHeart1(product.id)}
                                          className="heartOn"
                                        >
                                          <i className="fa-regular fa-heart"></i>
                                        </button>
                                      )}
                                    </span>
                                    <div className="product-promotions">
                                      <div className="promotion">
                                        <p className="coupon-price">
                                          Nhận gói 6 tháng Apple Music miễn phí
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
              </div>
            </>}
            <div className="pager">
              <ul className="pagination-list">
                <li className={`pagination-item prev-page ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a href="#" className={`pagination-item__link ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                    <span>Trước</span>
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
                    <span>Sau</span>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
