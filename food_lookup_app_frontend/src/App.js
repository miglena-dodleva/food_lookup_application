import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainTable from "./tables/MainTable";
import SelectedFoodsTable from "./tables/SelectedFoodsTable";
import SearchBar from "./searchComponent/SearchBar";
import AddButton from "./addComponents/AddButton";
import AddFoodForm from "./addComponents/AddFoodForm";


function App() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch("http://localhost:3006/foods")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddToSelectedFoods = (foodToAdd) => {
    setSelectedFoods((prevSelectedFoods) => {
      const existingItemIndex = prevSelectedFoods.findIndex(
        (item) => item.id === foodToAdd.id
      );

      if (existingItemIndex > -1) {
        return prevSelectedFoods.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      } else {
        return [...prevSelectedFoods, { ...foodToAdd, count: 1 }];
      }
    });
  };

  const handleAddFood = (newFood) => {
    if (
      !newFood.name ||
      !newFood.calories ||
      !newFood.protein ||
      !newFood.carbs ||
      !newFood.fats
    ) {
      alert("All fields are required");
      return;
    }

    fetch("http://localhost:3006/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFoods([...foods, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      if (!term) {
        setFilteredFoods(foods);
      } else {
        setFilteredFoods(
          foods.filter((food) =>
            food.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      }
    },
    [foods]
  );

  const MainPage = () => {
    return (
      <>
        {selectedFoods.length > 0 && (
          <SelectedFoodsTable selectedFoods={selectedFoods} />
        )}
        <AddButton />
        <MainTable
          foods={filteredFoods}
          onRowClick={handleAddToSelectedFoods}
          onSearch={handleSearch}
        />
      </>
    );
  };

  return (
    <BrowserRouter>
      <div>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/add-food"
            element={<AddFoodForm onAddFood={handleAddFood} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
