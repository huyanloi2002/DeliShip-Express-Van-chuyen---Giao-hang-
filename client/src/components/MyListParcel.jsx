import React, { Suspense, lazy, useEffect, useState } from "react";
import plane from "../assets/plane.png";
import truck from "../assets/truck.png";
import shipper from "../assets/shipper.png";
import moment from "moment";
import IntroVideo from "../components/IntroVideo";
import {
  getOrderByUser,
  getOrderById,
  updateReviews,
} from "../redux/actions/orderAction";
import "../styles/MyListParcel.scss";
import { useNavigate } from "react-router-dom";

const ParcelDetailsBox = lazy(() => import("../components/ParcelDetailsBox"));

import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const statusReview = [
  { id: 1, status: "Đúng thời gian" },
  { id: 2, status: "Thân thiện" },
  { id: 3, status: "Hổ trợ tần tình" },
  { id: 4, status: "Giá cả hợp lý" },
];

const MyListParcel = () => {
  const dispatch = useDispatch();
  const { auth, orderByUser, orderById } = useSelector((state) => state);
  const { dataOrderId } = useSelector((state) => state.orderById);

  console.log(auth);

  const { userId, token } = auth;
  const [activeParcelsCard, setActiveParcelsCard] = useState(0);
  const [starReviews, setStarReviews] = useState(0);
  const [statusReviews, setStatusReviews] = useState([]);
  const [commentReviews, setCommentReviews] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(getOrderByUser(userId, token));
    }
  }, [dispatch, userId, token]);

  const handleClickDetailsParcel = (idParcel) => {
    dispatch(getOrderById({ idParcel: idParcel, token: token }));
    setActiveParcelsCard(idParcel);
  };

  const handleClickStatusReviews = (status) => {
    if (statusReviews.find((e) => e === status)) {
      setStatusReviews(statusReviews.filter((e) => e !== status));
    } else {
      setStatusReviews([...statusReviews, status]);
    }
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".fa-star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("green");

            setStarReviews(this.starValue);
          } else {
            star.classList.remove("green");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("greenlight");
          } else {
            star.classList.remove("greenlight");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("greenlight");
        }
      });
    }
  }

  const handleSubmitReviews = (e) => {
    e.preventDefault();

    dispatch(
      updateReviews({
        dataOrderId,
        data: { starReviews, statusReviews, commentReviews },
        auth,
      })
    );
  };
  return (
    <div className="row">
      <div className="parcels_content col-lg-7">
        <div className="parcels_options">
          <h3 className="parcels_title">Bưu kiện của bạn</h3>
        </div>
        <div className="parcels_list">
          {orderByUser.data.length > 0
            ? orderByUser.data.map((item, index) => {
                const { nameAddressSender } = item.senderAddress;
                const { nameAddressReceiver } = item.receiverAddress;
                let status = "";
                let color = "";
                if (item.status === "unconfirmed") {
                  status = "Chưa xác nhận";
                  color = "gray";
                } else if (item.status === "confirmed") {
                  status = "Đã xác nhận";
                  color = "red";
                } else if (item.status === "preparing") {
                  status = "Chờ lấy hàng";
                  color = "orange";
                } else if (item.status === "pickup complete") {
                  status = "Lấy hàng thành công";
                  color = "#ffbd59";
                } else if (item.status === "in transit") {
                  status = "Đang vận chuyển";
                  color = "greenyellow";
                } else if (item.status === "delivered") {
                  status = "Đã nhận hàng";
                  color = "green";
                }
                let img;
                if (item.nameTrans === "Vận chuyển tiêu chuẩn") {
                  img = shipper;
                } else if (item.nameTrans === "Vận chuyển nhanh") {
                  img = truck;
                } else if (item.nameTrans === "Vận chuyển cấp tốc") {
                  img = plane;
                }
                let reviews = false;
                if (
                  item.reviews.starReviews ||
                  item.reviews.statusReviews.length > 0 ||
                  item.reviews.commentReviews
                ) {
                  reviews = true;
                }

                return (
                  <div
                    className={`parcels_card ${
                      activeParcelsCard === item._id ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleClickDetailsParcel(item._id)}
                  >
                    <div className="parcels_trans">
                      <img
                        src={img}
                        alt="trans"
                        className="img_parcels_trans"
                      />
                      <div className="name_parcels_trans">
                        <p>{item.nameTrans.replace("Vận chuyển", "")}</p>
                        <small>{`(${item.nameParcel})`}</small>
                      </div>
                    </div>
                    <div className="parcels_address">
                      <p className="sender_address">
                        {nameAddressSender
                          .split(",")
                          [nameAddressSender.split(",").length - 1].trim()}
                      </p>
                      <p>-</p>
                      <p className="receiver_address">
                        {nameAddressReceiver
                          .split(",")
                          [nameAddressReceiver.split(",").length - 1].trim()}
                      </p>
                    </div>
                    <div className="date_start">
                      {moment(item.dateStart).format("DD/MM/YYYY")}
                    </div>
                    <div className="parcels_status">
                      <i
                        className="fa-solid fa-circle"
                        style={{ color: `${color}` }}
                      ></i>
                      <div className="status_name">{status}</div>
                    </div>
                    <div className="parcels_price">
                      <span>{`${parseInt(
                        item.priceTotal
                      ).toLocaleString()} VND`}</span>
                      {activeParcelsCard === item._id && (
                        <i
                          className="fa-solid fa-circle-exclamation"
                          onClick={() => handleOpenThumbPrice(item._id)}
                        >
                          <div className="thumb_price">
                            <p>
                              Phí vận chuyển :
                              <b>
                                {` ${parseInt(
                                  item.priceParcel
                                ).toLocaleString()} VND`}
                              </b>
                            </p>
                            <p>
                              Phí dịch vụ:
                              <b>
                                {` ${parseInt(
                                  item.priceService
                                ).toLocaleString()} VND`}
                              </b>
                            </p>
                            <p>
                              Phí thuế:
                              <b>{` ${parseInt(
                                item.priceTax
                              ).toLocaleString()} VND`}</b>
                            </p>
                            <p>
                              Tổng:
                              <b>{` ${parseInt(
                                item.priceTotal
                              ).toLocaleString()} VND`}</b>
                            </p>
                          </div>
                        </i>
                      )}
                    </div>
                    {item.status === "delivered" && reviews === false ? (
                      <>
                        <button
                          className="parcel_reviews "
                          onClick={setUserRatings}
                          data-bs-toggle="modal"
                          data-bs-target="#modal_reviews"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>Đánh giá</span>
                        </button>
                        <div
                          className="modal fade center modal_reviews"
                          id="modal_reviews"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="close_reviews">
                                    <i
                                      className="fa-solid fa-xmark"
                                      data-bs-dismiss="modal"
                                    ></i>
                                  </div>
                                  <form
                                    className="content_reviews"
                                    onSubmit={handleSubmitReviews}
                                  >
                                    <div className="title_reviews">
                                      <h4>Đánh giá chất lượng</h4>
                                    </div>
                                    <div className="star_reviews">
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div className="status_reviews">
                                      {statusReview.map((item, index) => {
                                        return (
                                          <span
                                            className={`box_status ${
                                              statusReviews.find(
                                                (e) => e === item.status
                                              )
                                                ? "active"
                                                : ""
                                            }`}
                                            key={index}
                                            value={item.name}
                                            onClick={() =>
                                              handleClickStatusReviews(
                                                item.status
                                              )
                                            }
                                          >
                                            {item.status}
                                          </span>
                                        );
                                      })}
                                    </div>
                                    <div className="comment_reviews">
                                      <textarea
                                        name="commentReviews"
                                        id="commentReviews"
                                        cols="50"
                                        rows="10"
                                        value={commentReviews}
                                        onChange={(e) =>
                                          setCommentReviews(e.target.value)
                                        }
                                        placeholder="Đánh giá..."
                                      ></textarea>
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn_save_reviewes"
                                    >
                                      Đánh giá
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : reviews === true ? (
                      <div className="parcel_is_reviews">
                        <i className="fa-solid fa-check"></i>
                        <span>Đã đánh giá</span>
                      </div>
                    ) : (
                      <div className="parcel_reviews_not"></div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="parcel_details col-lg-5">
        {activeParcelsCard ? (
          <Suspense fallback={<Loading />}>
            <ParcelDetailsBox orderById={orderById.dataOrderId} />
          </Suspense>
        ) : (
          <IntroVideo />
        )}
      </div>
    </div>
  );
};

export default MyListParcel;
