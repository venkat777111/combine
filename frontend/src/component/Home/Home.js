import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ExpertCard from "../Consultation/ExpertCard.js";

const Home = ({ experts }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"RAMUISM"} />
          <div className="banner">
            {/* <p>Welcom to FarmoFlick</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1> */}

            {/* <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a> */}
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>

          <h2 className="homeHeading">Our Experts</h2>

          <div className="container" id="container">
            {experts &&
              experts.map((expert, index) => (
                <ExpertCard expert={expert} index={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
