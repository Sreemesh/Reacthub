import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";


const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext)
  const {items} = ctx;
  const [btnFocus, setBtnFocus] = useState(false)
  const cartItems = items.reduce(
    (current,item)=> {
      return current + item.amount
    },0);
    
  const btnClass = `${classes.button} ${btnFocus ? classes.bump : ''}`;
  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setBtnFocus(true);
    
    const timer = setTimeout(() => {
    setBtnFocus(false);      
    }, 300);

    return() => {
      clearTimeout(timer);
    }
  }, [items])
  
  return (
    <button className={btnClass} onClick={props.onClickCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Food Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
