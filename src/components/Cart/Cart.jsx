import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
const Cart = ({ cart, handleClearCart, children }) => {
    let totalPrice = 0
    let totalShipping = 0
    let quantity = 0;
    for (const product of cart) {
        // if (product.quantity === 0) {
        //     product.quantity = 1
        // }
        totalPrice += product.price * product.quantity
        totalShipping += product.shipping
        quantity += product.quantity
    }
    const tax = totalPrice * 5 / 100
    const grandTotal = totalPrice + totalShipping + tax
    return (
        <div className='cart'>
            <h3>Your Cart</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Shipping Charge: ${totalShipping}</p>
            <p>Tax(5%): ${tax}</p>
            <h4 >Grand Total: ${grandTotal}</h4>
            <button onClick={handleClearCart} className='btn-clear-cart'>Clear Cart <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
            <br />
            {children}
        </div>
    );
};

export default Cart;