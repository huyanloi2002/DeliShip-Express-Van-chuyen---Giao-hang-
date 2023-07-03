import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../redux/actions/orderAction";
import moment from "moment";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { orders } = useSelector((state) => state.admin);

  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders({ token: auth.token }));
  }, [dispatch, auth]);

  useEffect(() => {
    if (orders) {
      let allReviews = [];
      orders.forEach((order) => {
        allReviews = allReviews.concat(order.reviews);
      });
      setAllReviews(allReviews);
    }
  }, [orders]);

  const columns = [
    {
      title: "Sao",
      dataIndex: "starReviews",
      key: "starReviews",
      render: (statusReviews) => (
        <span>
          {statusReviews}
          <i className="fa-solid fa-star text-primary"></i>
        </span>
      ),
    },
    {
      title: "Bình luận",
      dataIndex: "commentReviews",
      key: "commentReviews",
    },
    {
      title: "Status",
      dataIndex: "statusReviews",
      key: "statusReviews",
      render: (statusReviews) => (
        <div>
          {statusReviews.map((item, index) => {
            return <span key={index}>{`${item}, `}</span>;
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Tất cả đánh giá đơn hàng</h2>
        <div className="table_orders">
          <Table dataSource={allReviews} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
