import { useRef, useState } from 'react';
import Input from '../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amtValid, setAmtValid] = useState(true)

    const submit = event => {

        event.preventDefault();

        const amountVal = amountInputRef.current.value;
        const amountValNum = +amountVal;
        if(amountVal.trim().length === 0 || amountVal < 1 ||  amountVal > 5) {
          setAmtValid(false);
            return;
        }
        props.onAddToCart(amountValNum);
        }
    return (
        <form onSubmit={submit} className={classes.form}>
            <Input label="Amount" 
                ref={amountInputRef}
            input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            {!amtValid && <p>Please enteer valid amount 1-5</p>}
            <button>+ Add</button>
        </form>
    )
}

export default MealItemForm;
