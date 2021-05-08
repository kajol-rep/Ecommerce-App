import React from "react";
import { categories } from "../Data/categories";
import { Link } from "react-router-dom";
import { Avatar } from "../Components/Avatar";
import { useData } from "../Contexts/dataProvider";
export function Categories() {
  const {
    state: { petsType }
  } = useData();
  return (
    <div className="padding-one padding3-left-right">
      <p className="medium-text bold-text text-center">SELECT YOUR CATEGORY</p>
      <div style={{ gap: "2rem" }} className="flex-row flex-wrap">
        {petsType === "dogs"
          ? categories.map((pet) =>
              pet.dogs.map(({ category, img }) => (
                <Link className="flex-column link-btn" to="/products-listing">
                  <Avatar alt="category" src={img} size="15rem"></Avatar>
                  <span className="medium-text">{category}</span>
                </Link>
              ))
            )
          : categories.map((pet) =>
              pet.cats.map(({ category, img }) => (
                <Link className="flex-column link-btn" to="/products-listing">
                  <Avatar alt="category" src={img} size="15rem"></Avatar>
                  <span className="medium-text">{category}</span>
                </Link>
              ))
            )}
      </div>
    </div>
  );
}
