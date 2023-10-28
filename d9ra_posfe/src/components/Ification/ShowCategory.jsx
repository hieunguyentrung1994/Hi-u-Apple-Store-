import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";

import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../service/Userservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showGetSlider } from "../../service/Advertisement";
import {
    showListPhone,
    showListHeart,
    addHeart,
    removeHeart,
} from "../../service/product";

const ShowCategoryPage = () => {
    const { categoryId } = useParams();
    const [slider, setSlider] = useState({});
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [cookies, setCookies, removeCookie] = useCookies([
        "token",
        "email",
        "fullName",
        "Roles",
        "password",
        "phone",
    ]);

    useEffect(() => {
        if (!categoryId) return;
        const getCategoryProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products/searchByCategory/${categoryId}`);
                setCategory(response.data);
                await showGetSlider(categoryId).then((res) => {
                    setSlider(res.data);
                  });
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
            }
        };
        getCategoryProducts();
    }, [categoryId]);

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

    useEffect(() => {
        async function fetchData() {
          await showListPhone().then((res) => {
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
      }, [cookies.email]);

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

    const [listHeart, setListHeart] = useState([]);
    const isLoggedIn = !!cookies.token;
    const formatPrice = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(category.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Trung Hiếu Mobile - sản phẩm chi tiết</title>
            <div className=" slider-product swiper mySwiper">
                <div className="wrapper swiper-wrapper">
                    <div className="slide swiper-slide">
                        <a href="" className="slider-link">
                            <img
                                src={slider.imgUrl_slider}
                                alt=""
                                className="slider-img-Airpods"
                            />
                        </a>
                    </div>
                </div>

                <div className="swiper-pagination" />
            </div>
            <div className="main">
                <div className="grid wide">
                    <div className="row">
                        {currentItems.map((product) => {
                            const isProductInListHeart = listHeart.some(
                                (item) => item.id === product.id
                            );
                            return (
                                <div className="col l-3 m-4 c-6" key={product.id}>
                                    <div className="product-item">
                                        <div className="product-item__img">
                                            <a href={`/product/${product.id}`} className="img_product">
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
                                                    {product.status ? "Còn hàng" : "Hết hàng"}
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
            </div>
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

        </>
    );
};

export default ShowCategoryPage;
