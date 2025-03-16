import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
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
            <div>
                <h3>Cart</h3>
                <h4 className='items'>{quantity} Items</h4>
                <p>Total: ${totalPrice}</p>
                <p>Shipping Cost: ${totalShipping}</p>
                <p>Tax(5%): ${tax}</p>
                <h4 >Grand Total: ${grandTotal}</h4>
            </div>
            <div>
                <button onClick={handleClearCart} className='btn-clear-cart'>Clear Cart <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                <br />
                {children}
            </div>
        </div>
    );
};

export default Cart;