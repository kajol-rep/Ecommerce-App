import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { sliderImages } from "../Data/slider-images";
import { brands } from "../Data/brands";
import { Link } from "react-router-dom";
import { useData } from "../Contexts/dataProvider";
export function Home() {
  const { dispatch } = useData();
  return (
    <>
      <Slide easing="ease slider">
        {sliderImages.map(({ img, category, info, btnInfo }) => (
          <div className="each-slide">
            <div
              className="slider-image bg-img width-full"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="slider-text">
                <div className="heading bold-text">{category}</div>
                <div className="large-text">{info}</div>
                <br />
                <button className="primary-btn curved-edge-btn">
                  <Link className="link-btn small-text" to="/products-listing">
                    {btnInfo}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
      <p className="medium-text bold-text text-center">SELECT YOUR PET</p>
      <div className="flex-row flex-wrap flex-gap">
        <Link
          className="flex-column link-btn"
          to="/categories"
          onClick={() =>
            dispatch({ type: "SET_SELECTED_PET", payload: "dogs" })
          }
        >
          <img
            src="https://petsutra.s3.ap-south-1.amazonaws.com/app/uploads/31-05-19/5cf1157e1fa4c.png"
            alt="Dogs Products"
          />
          <span className="medium-text">Dogs</span>
        </Link>
        <Link
          className="flex-column link-btn"
          to="/categories"
          onClick={() =>
            dispatch({ type: "SET_SELECTED_PET", payload: "cats" })
          }
        >
          <img
            src="https://petsutra.s3.ap-south-1.amazonaws.com/app/uploads/19-03-20/5e734e4fe8de1.png"
            alt="Cats Products"
          />
          <span className="medium-text">Cats</span>
        </Link>
      </div>
      <br />
      <hr />
      <p className="medium-text bold-text text-center">POPULAR BRANDS</p>
      <div className="flex-row flex-wrap flex-gap">
        {brands.map(({ name, img }) => (
          <div key={name}>
            <img className="brand-img" alt="brand" src={img} />
          </div>
        ))}
      </div>
    </>
  );
}
