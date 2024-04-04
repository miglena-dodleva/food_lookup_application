import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddButton.css";

const AddButton = () => {
  let goTo = useNavigate();

  const openAddFoodForm = () => {
    goTo("/add-food");
  };

  return (
    <button className="add-new-product-button" onClick={openAddFoodForm}>
      {" "}
      Add New Product{" "}
    </button>
  );
};

export default AddButton;
