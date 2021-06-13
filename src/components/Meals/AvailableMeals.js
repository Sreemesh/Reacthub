import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const fakeMeals = [
  {
    id: "m1",
    name: "Shawarma",
    description: "Finest meat and veggies",
    price: 7.9,
  },
  {
    id: "m2",
    name: "Aflam",
    description: "A arabic specialty!",
    price: 12.5,
  },
  {
    id: "m3",
    name: "Zinger Burger",
    description: "American, raw, meaty",
    price: 10.99,
  },
  {
    id: "m4",
    name: "Boneless Wraps",
    description: "Healthy...and green...",
    price: 20.99,
  },
];
const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {fakeMeals.map((meal) => (
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
