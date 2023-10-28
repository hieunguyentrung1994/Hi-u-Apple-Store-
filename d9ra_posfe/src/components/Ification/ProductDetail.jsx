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
import { Button } from "react-bootstrap";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "password",
    "phone",
  ]);

  const [listHeart, setListHeart] = useState([]);
  const isLoggedIn = !!cookies.token;

  const formatPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
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

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {}
    };
    getProduct();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      let firstCategoryItem = product.categoryId;
      try {
        const response = await axios.get(
          `${baseUrl}/products/searchByCategory/${firstCategoryItem}`
        );
        setCategory(response.data);
      } catch (error) {}
    };
    getCategory();
  }, [product]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trung Hiếu Mobile - sản phẩm chi tiết</title>

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
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:wght@300;400;500;600;700&family=Quicksand:wght@500;700&f...lay=swap"
        rel="stylesheet"
      />
      {/* Swiper JS */}
      <div className="wrapper">
        <div className="main fields" style={{ marginTop: "50px" }}>
          <section data-id="" data-cate-id="" className="detail">
            <div className="product-detail">
              <div className="grid wide">
                <div className="row">
                  {/* Left Product-Detail */}
                  <div className="col l-6 m-12 c-12">
                    <aside className="slider-detail">
                      <div className="main__image">
                        <img
                          src={product.imgUrlMain}
                          className="slide"
                          width={650}
                          height={650}
                        />
                      </div>
                    </aside>
                  </div>
                  {/* Right Product-Detail */}
                  <div className="col l-6 m-12 c-12">
                    <aside>
                      <h1>{product.productName}</h1>

                      {/* chi tiết */}
                      <br />
                      <div className="div_related_products">
                        <h2>Chi tiết sản phẩm:</h2>
                        <div>
                          <b>Thương Hiệu:</b>
                          <span>{product.supplierName}</span>
                        </div>
                      </div>
                      <br />
                      <p>{product.description}</p>
                      {/* Giá */}
                      <div className="prices">
                        <span id="" className="detail-price">
                          {product.price
                            ? formatPrice(product.price)
                            : "Loading..."}
                        </span>
                      </div>

                      {/* Mua hàng */}
                      {product.status ? (
                        <div>
                          <Button
                            className="buy-sp btn"
                            onClick={() => addToCart(product.id)}
                          >
                            Mua ngay
                          </Button>
                        </div>
                      ) : (
                        <Button className="buy-sp btn btn-danger" disabled>
                          Hết hàng
                        </Button>
                      )}
                      <br />
                      <br />
                      <ul className="policy">
                        <li>
                          <span>
                            <i className="fa-solid fa-box-open" />
                            Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy
                            sim,...
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-rotate" />
                            Hư gì đổi nấy <b>12 tháng</b> tại Trung Hieu Mobile{" "}
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa-regular fa-circle-check" />
                            Bảo hành chính hãng 1 năm
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-truck-fast" />
                            Giao hàng nhanh toàn quốc
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-phone" />
                            Gọi đặt mua: 0334997497 (9h00 -21h00 mỗi ngày)
                          </span>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
        <h1 className="related_products">Sản phẩm liên quan:</h1>
        <div className="div_related_products">
          {category.slice(0, 3).map((product) => {
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
                      <h2 className="product-title">{product.productName}</h2>
                    </a>
                    <div className="product-price">
                      <span className="product-price__price">
                        {product.price
                          ? formatPrice(product.price)
                          : "Loading..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ProductDetailPage;
