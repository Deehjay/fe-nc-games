import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
import { getCategories } from "../api";
import { formatCategory } from "../utils/utils";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);

  return (
    <div className="categories-container">
      <div className="categories-collapsible">
        <Collapsible
          classParentString="categories"
          trigger="CATEGORIES ↓"
          triggerWhenOpen="CATEGORIES ↑">
          <div className="category-div">
            <ul className="category-list">
              <li className="category-item">
                <h5>
                  <Link to="/">All</Link>
                </h5>
              </li>
              {categories.map((category) => {
                return (
                  <li className="category-item">
                    <h5>
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
