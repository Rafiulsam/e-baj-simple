import { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const { filteredProducts } = useOutletContext(); // Get filtered products from Home
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart) {
            const savedProduct = filteredProducts.find(product => product.id === id);
            if (savedProduct) {
                const quantity = storedCart[id];
                savedProduct.quantity = quantity;
                savedCart.push(savedProduct);
            }
        }
        setCart(savedCart);
    }, [filteredProducts]);

    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    };

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    return (
        <div className="shop-container">
            <div className='products-container'>
                {filteredProducts.map(product => (
                    <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to='/reviewitems'>
                        <button className='btn-proceed'>Review Items <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;