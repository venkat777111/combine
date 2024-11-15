import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "../Admin/Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "../Admin/processOrder.css";

const ProcessOrder = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    myForm.set("user", user._id);

    dispatch(updateOrder(id, myForm, user.role));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/seller/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError, navigate]);

  let totalAmount = 0;
  order &&
    order.orderItems &&
    order.orderItems.forEach((item) => {
      if (item.user === user._id) {
        totalAmount += item.price * item.quantity;
      }
    });
  const orderStatus = () => {
    return order &&
      order.orderItems &&
      order.orderItems.some((item) => {
        return item.user === user._id && item.status === "Shipped";
      })
      ? "Shipped"
      : "Processing";
  };
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar user={user} />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: orderStatus() !== "Processing" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{totalAmount}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderStatus() !== "Processing"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderStatus()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="confirmOrderContainer">
                    {order.orderItems &&
                      order.orderItems.map(
                        (item) =>
                          item.user === user._id && (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <div>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>
                              <span>
                                {item.quantity} X ₹{item.price} ={" "}
                                <b>₹{item.price * item.quantity}</b>
                              </span>
                            </div>
                          )
                      )}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: orderStatus() !== "Processing" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {user &&
                        user.role === "seller" &&
                        orderStatus() === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
