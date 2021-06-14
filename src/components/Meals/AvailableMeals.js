import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchFood = async () => {
      const res = await fetch(
        "https://order-food-f064d-default-rtdb.firebaseio.com/food.json"
      );

      if(!res.ok){
        throw new Error('Error thrown, please try again!!!');
      }
      const resData = await res.json();

      const foodData = [];

      for (const k in resData) {
        foodData.push({
          id: k,
          name: resData[k].name,
          description: resData[k].description,
          price: resData[k].price,
        });
      }
      setMeals(foodData);
      setIsLoading(false);
    };

      fetchFood().catch(err =>{
        setIsLoading(false);
        setIsError(err.message);
      });

  }, []);

  if (isLoading) {
    return (
      <section style={{ textAlign: "center", color: "black" }}>
        <p>Loading...</p>
      </section>
    );
  }
  if (isError) {
    return (
      <section style={{ textAlign: "center", color: "red" }}>
        <p>{isError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              desc={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
