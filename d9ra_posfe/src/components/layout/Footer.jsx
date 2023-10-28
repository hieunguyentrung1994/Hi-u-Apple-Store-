import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import logo from "../../asset/img/logo-apple1.png";

const Footer = () => {
    return(
        <footer className="footer">
        <div className="footer__upper">
          <div className="grid">
            <div className="row">
              <div className="col l-3 m-12 c-12">
                <div className="header__navbar-logo footer__logo">
                  <a href="index.html">Trung Hiếu</a>
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <div className="footer-follow__about">
                  <p className="footer-follow__text">
                    Năm 2023, Trung Hiếu Mobile trở thành đại lý ủy quyền của
                    Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và
                    Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản
                    phẩm và dịch vụ của Apple cho người dùng Việt Nam.
                  </p>
                </div>
                <div className="footer-follow__socials">
                  <ul className="networks">
                    <li className="facebook">
                      <a href="" className="">
                        <img src="./assets/img/facebook.png" alt="" />
                      </a>
                    </li>
                    <li className="tiktok">
                      <a href="./assets/img/tiktok.png" className="">
                        <img src="./assets/img/tiktok.png" alt="" />
                      </a>
                    </li>
                    <li className="zalo">
                      <a href="" className="">
                        <img src="./assets/img/zalo.png" alt="" />
                      </a>
                    </li>
                    <li className="youtube">
                      <a href="" className="">
                        <img src="./assets/img/youtube.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-3 m-12 c-12">
                <div className="footer-block">
                  <div className="footer-title">
                    <span>Thông tin</span>
                    <i className="footer-icon fa-solid fa-chevron-down" />
                  </div>
                  <ul className="footer-list">
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Giới thiệu
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Tin tức{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Check IMEI
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Phương thức thanh toán{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Bảo hành và sữa chữa{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Tuyển dụng{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Đánh giá chất lượng, khiếu nại{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-3 m-12 c-12">
                <div className="footer-block">
                  <div className="footer-title">
                    <span>Chính sách </span>
                    <i className="footer-icon fa-solid fa-chevron-down" />
                  </div>
                  <ul className="footer-list">
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Thu cũ đổi mới{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Giao hàng{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Hủy giao dịch{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Đổi trả{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Bảo hành{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Giải quyết khiếu nại{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Bảo mật thông tin{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Trả góp{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-3 m-12 c-12">
                <div className="footer-block">
                  <div className="footer-title">
                    <span>Địa chỉ và Liên hệ</span>
                    <i className="footer-icon fa-solid fa-chevron-down" />
                  </div>
                  <ul className="footer-list">
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Tài khoản của tôi{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Đơn đặt hàng{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Hệ thống cửa hàng{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Tìm Store trên Goole Map{" "}
                      </a>
                    </li>
                    <li className="footer-item">
                      <a href="" className="footer-item-link">
                        {" "}
                        Mua hàng:{" "}
                      </a>
                      <a href="tel: +84334997497" className="footer-item-tel">
                        033.4997.497
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__lower">
          <span className="footer__lower-text">
            © All Rights Reserved By{" "}
            <a href="./index.html" className="footer__lower-text-link">
              Trung Hiếu Mobile
            </a>
          </span>
        </div>
      </footer>
    )}
export default Footer;