import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { getCategories } from "../api";
import { formatCategory } from "../utils/utils";
import ErrorPage from "./ErrorPage";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getCategories()
      .then((categoriesFromApi) => {
        setCategories(categoriesFromApi);
      })
      .catch((err) => {
        setErr({ err });
      });
  }, []);

  if (err) {
    return <ErrorPage message={err.message} />;
  }

  return (
    <div className="categories-container">
      <div className="categories-collapsible">
        <Collapsible
          classParentString="categories"
          trigger="CATEGORIES ↓"
          triggerWhenOpen="CATEGORIES ↑">
          <div className="category-div">
            <ul className="category-list">
              <li className="category-item" key={"all"}>
                <h5 key={"all"}>
                  <Link to="/">All</Link>
                </h5>
              </li>
              {categories.map((category) => {
                return (
                  <li className="category-item" key={category.category_id}>
                    <h5 key={category.category_id}>
                      <Link to={`/categories/${category.slug}`}>
                        {formatCategory(category.slug)}
                      </Link>
                    </h5>
                  </li>
                );
              })}
            </ul>
          </div>
        </Collapsible>
      </div>
    </div>
  );
};

export default Categories;
