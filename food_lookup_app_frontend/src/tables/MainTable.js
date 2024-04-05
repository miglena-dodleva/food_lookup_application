import React, { useState } from "react";
import "./MainTable.css";

const ITEMS_PER_PAGE = 6;

const MainTable = ({ foods, onRowClick , onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(foods.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate the slice of `foods` to be displayed
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleFoods = foods.slice(startIndex, endIndex);

  

  return (
    <>
      <div className="food-table-container">
        <table className="food-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fats (g)</th>
            </tr>
          </thead>
          <tbody>
            {visibleFoods.map((food) => (
              <tr key={food.id} onClick={() => onRowClick(food)}>
                <td>{food.name}</td>
                <td>{food.calories}</td>
                <td>{food.protein}</td>
                <td>{food.carbs}</td>
                <td>{food.fats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default MainTable;
