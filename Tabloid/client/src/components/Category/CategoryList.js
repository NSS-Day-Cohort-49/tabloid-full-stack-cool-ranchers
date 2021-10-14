import React, { useEffect, useState } from "react";
import Category from './Category';
import { getAllCategories } from "../../modules/categoryManager";

const CategoryList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
    const [categories, setCategories] = useState([]);



    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));
    };

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <div>
            <br />
            <div className="container">
                <div className="container justify-content-center">
                    {console.log(categories)}
                    {categories.map((category) => (
                        <Category category={category} key={category.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
