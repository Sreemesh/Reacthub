import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Fast Meals</h1>
        <HeaderCartButton onClickCart={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="buffet image" />
      </div>
    </Fragment>
  );
};

export default Header;
