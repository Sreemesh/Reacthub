import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = val => val.trim() === '';
const isLength = val => val.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    addr: true,
    city: true,
    pin: true,
  })

  const nameRef = useRef();
  const addrRef = useRef();
  const pinRef = useRef();
  const cityRef = useRef();

  const confirmOrder = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const addr = addrRef.current.value;
    const pin = pinRef.current.value;
    const city = cityRef.current.value;

    const nameValid = !isEmpty(name);
    const addrtValid = !isEmpty(addr);
    const cityValid = !isEmpty(city);
    const pinValid = isLength(pin);

    setFormValidity({
      name: nameValid,
      addr: addrtValid,
      city: cityValid,
      pin: pinValid,
    })

    const formValid = nameValid && addrtValid && cityValid && pinValid;

    if(!formValid){
      return;
    }

    props.onSubmit({
      name,addr,city,pin
    });
  };

  return (
    <form onSubmit={confirmOrder}>
      <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef}/>
        {!formValidity.name && <p>Please enter name !</p>}
      </div>
      <div className={`${classes.control} ${formValidity.addr ? '' : classes.invalid}`}>
        <label htmlFor="addr">Address</label>
        <input type="text" id="addr" ref={addrRef}/>
        {!formValidity.addr && <p style={{color:'red'}}>Please enter Address !</p>}

      </div>
      <div className={`${classes.control} ${formValidity.pin ? '' : classes.invalid}`}>
        <label htmlFor="pin">Pin</label>
        <input type="text" id="pin" ref={pinRef}/>
        {!formValidity.pin && <p style={{color:'red'}}>Please enter pin !</p>}

      </div>
      <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}/>
        {!formValidity.city && <p style={{color:'red'}}>Please enter city !</p>}

      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
