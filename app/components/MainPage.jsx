import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json'
        );
        setProducts(response.data.categories.flatMap((category) => category.category_products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value.toLowerCase()]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value.toLowerCase()));
    }
  };

  const filteredProducts = selectedCategories.length === 0 ? products : products.filter((product) => {
    const productCategory = product.vendor.toLowerCase();
    const categoryName = response.data.categories.find((category) => category.category_products.some((p) => p.id === product.id)).category_name.toLowerCase();
    return selectedCategories.includes(categoryName);
  });

  return (
    // Rest of the component remains the same
  );
};

export default HomePage;