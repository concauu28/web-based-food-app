import React from "react";
import { useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "./../UI/Card.js";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-dcd83-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log(JSON.stringify(response));
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <div className="MealsLoading">
        <p>Loading</p>
      </div>
    );
  }
  if (httpError) {
    return (
      <div className="MealsError">
        <p>{httpError}</p>
      </div>
    );
  }
  const mealsList = meals.map((item) => (
    <MealItem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));
  return (
    <div className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </div>
  );
}

export default AvailableMeals;
