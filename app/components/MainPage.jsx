"use client";
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { add } from "../Redux/Cartslice";
import Modal from "@/app/components/Modal"

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

// Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useSelector((state)=>state.cart)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handeladd = (product) =>{
    dispatch(add(product));
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
        );
        setProducts(
          response.data.categories.flatMap(
            (category) => category.category_products
          )
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value.toLowerCase()]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (category) => category !== value.toLowerCase()
        )
      );
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts =
    selectedCategories.length === 0 && searchQuery === ""
      ? products
      : products.filter((product) => {
          const productCategory = product.vendor.toLowerCase();
          const categoryName = data.categories
            .find((category) =>
              category.category_products.some((p) => p.id === product.id)
            )
            .category_name.toLowerCase();
          return (
            (selectedCategories.length === 0 ||
              selectedCategories.includes(categoryName)) &&
            (searchQuery === "" ||
              product.vendor.toLowerCase().includes(searchQuery) ||
              product.title.toLowerCase().includes(searchQuery) ||
              categoryName.includes(searchQuery))
          );
        });

  return (
    <div className="bg-white  text-black">
      <div className="header bg-red-500 h-20 p-6">
        <h1 className="font-bold text-4xl flex justify-center items-center text-white">
          SHOPLANE
        </h1>
      </div>
      <div className="flex justify-center py-6 space-x-4 bg-white ">
        <div className="checkbox-wrapper-61">
          <input
            type="checkbox"
            className="check"
            id="check1-men"
            name="categories"
            value="men"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check1-men" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect
                x="30"
                y="20"
                width="50"
                height="50"
                stroke="black"
                fill="none"
              />
              <g transform="translate(0,-952.36222)">
                <path
                  d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  className="path1"
                />
              </g>
            </svg>
            <span>Men</span>
          </label>
        </div>
        <div className="checkbox-wrapper-61">
          <input
            type="checkbox"
            className="check"
            id="check1-women"
            name="categories"
            value="women"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check1-women" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect
                x="30"
                y="20"
                width="50"
                height="50"
                stroke="black"
                fill="none"
              />
              <g transform="translate(0,-952.36222)">
                <path
                  d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  className="path1"
                />
              </g>
            </svg>
            <span>Women</span>
          </label>
        </div>
        <div className="checkbox-wrapper-61">
          <input
            type="checkbox"
            className="check"
            id="check1-kids"
            name="categories"
            value="kids"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check1-kids" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect
                x="30"
                y="20"
                width="50"
                height="50"
                stroke="black"
                fill="none"
              />
              <g transform="translate(0,-952.36222)">
                <path
                  d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  className="path1"
                />
              </g>
            </svg>
            <span>Kids</span>
          </label>
        </div>
        <div className="flex mt-[-20px] justify-center py-6 space-x-4 bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-200 p-2 rounded"
            onChange={handleSearch}
          />
        </div>
        {/* ADD TO CART */}
       
        <div className="mt-1">
          <div class="relative py-2 mt-[-16px]">
            <div class="t-0 absolute left-3">
              <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                {items.length}
              </p>
            </div>
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="file: mt-4 h-6 w-6 cursor-pointer"
                onClick={handleOpenModal}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
        
          </div>
          {/*  */}

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-5 gap-4  shadow-xl p-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card border-2 shadow-xl flex justify-center items-center flex-col "
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[150px] mt-1"
            />
            <h5 className="font-medium ">{product.vendor}</h5>
            <h4 className="font-bold m-1 text-center">{product.title}</h4>
            <p>Price: ${product.price}</p>
            <h6 className="text-red-500 text-xs">{product.badge_text}</h6>
            <div className="p-4">
              <button
                onClick={() => handeladd(product)}
                class="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
