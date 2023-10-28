import "../../asset/cssUser/reset.css";
import "../../asset/cssUser/grid.css";
import "../../asset/cssUser/base.css";
import "../../asset/cssUser/main.css";
import "../../asset/cssUser/responsive.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { baseUrl } from "../../service/Userservice.js";
import { formatPrice } from "../../service/Userservice.js";
import { formatDate } from "../../service/Userservice.js";


const History = () => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "email",
    "fullName",
    "Roles",
    "password",
    "phone",
  ]);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const navigate = useNavigate();
  if (cookies.token === undefined) {
    navigate("/login");
  }
  const [isToggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async (orderId) => {
    const response = await axios.get(
      `${baseUrl}/orderDetail/${orderId}`
    );
    setOrderDetails(response.data);
    setShow(true);
  };

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm("Xác nhận huỷ đơn hàng này?");
    if (confirmed) {
      await axios.put(`${baseUrl}/order/changeStt/${orderId}/5`);
      window.location.reload();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await axios.get(
          `${baseUrl}/order/${cookies.email}/history`
        );
        setOrders(orderResponse.data);
      } catch (error) {
        alert(error.response);
      }
    };
    fetchOrder();
  }, []);
  const tdStyle = {
    border: '1px solid black',

  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="wrapper" style={{ marginTop: "120px" }}>
      <h1 style={{ margin: "0 auto", fontSize: "40px" }}>LỊCH SỬ MUA HÀNG</h1>
      <div className="main">
        <Table className="table table-hover my-0 text-center" style={tdStyle}>
          <thead style={tdStyle}>
            <tr style={tdStyle}>
              <th>Mã số đơn hàng</th>
              <th className="d-none d-xl-table-cell">Ngày đặt</th>
              <th className="d-none d-xl-table-cell">Tên người nhận | SĐT</th>
              <th className="d-none d-xl-table-cell">Địa chỉ giao hàng </th>
              <th className="d-none d-md-table-cell">Note </th>
              <th className="d-none d-md-table-cell">Tên mặt hàng </th>
              <th>Tổng tiền</th>
              <th>Tổng tiền thanh toán</th>
              <th>Trạng thái đơn hàng</th>
              <th>Huỷ</th>
            </tr>
          </thead>
          <tbody style={tdStyle}>
            {currentItems.map((order) => (
              <tr key={order.id} style={tdStyle}>
                <td>{order.id}</td>
                <td className="d-none d-xl-table-cell">{formatDate(order.orderDate)}</td>
                <td className="d-none d-xl-table-cell">
                  {order.receiverName} | {order.phone}
                </td>
                <td className="d-none d-xl-table-cell">{order.address}</td>
                <td className="d-none d-md-table-cell">{order.note}</td>
                <td className="d-none d-md-table-cell">
                  <>
                    <Button
                      onClick={() => {
                        handleShow(order.id);
                      }}
                    >
                   
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Sản phẩm</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <table border={'1px'}>
                          <thead>
                            <tr>
                              <th>Mã SP</th>
                              <th>Tên Sp</th>
                              <th>Giá SP</th>
                              <th>Số lượng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetails.map((orderDetail) => (
                              <tr key={orderDetail.id}>
                                <td>{orderDetail.productResponse.id}</td>
                                <td>
                                  {orderDetail.productResponse.productName}
                                </td>
                                <td>{formatPrice(orderDetail.productResponse.price)}</td>
                                <td>{orderDetail.quantity} </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </td>
                <td>{formatPrice(order.totalAmount)}</td>
                <td>{formatPrice(order.amountAfterDiscount)}</td>
                <td>{order.orderStatus}</td>
                {order.orderStatus === "PENDING" ||
                  order.orderStatus === "PROCESSING" ? (
                  <>
                    <td>
                      <Button
                        onClick={() => {
                          handleCancel(order.id);
                        }}
                      >
                        Huỷ
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <Button disabled>Huỷ</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
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

  );
};
export default History;
