import { Fragment, useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheck, setIsCheck] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const context = useContext(CartContext);

  const total = `$${context.total.toFixed(2)}`;
  const hasItem = context.items.length > 0;

  const cartItemAdd = (item) => {
    context.addItem({ ...item, amount: 1 });
  };
  const cartItemRem = (id) => {
    context.removeItem(id);
  };
  const orderFood = () =>{
    setIsCheck(true)
  }

  const submitOrder = async (userData) =>{
    setIsSubmit(true);
    await fetch('https://order-food-f064d-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items
      })
    })
    setIsSubmit(false);
    setDidSubmit(true);
    context.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAdd.bind(null, item)}
          onRemove={cartItemRem.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalContent = (
    <Fragment>
  {!isCheck && <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{total}</span>
      </div>
      </div>}
      {isCheck && <Checkout onSubmit={submitOrder} onCancel= {props.onCloseCart}/>}
      {!isCheck && <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItem && <button className={classes.button} onClick={orderFood}>Order</button>}
      </div>}
    </Fragment>
  )

  const submittingContent = <p>Sending order....</p>
  const submittingSuccessContent = <p>Order placed succesfully !</p>
  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmit && !didSubmit && modalContent}
      {isSubmit && submittingContent}
      {didSubmit && submittingSuccessContent }
    </Modal>
  );
};

export default Cart;
