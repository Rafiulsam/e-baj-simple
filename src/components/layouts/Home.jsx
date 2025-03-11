import { Bounce, ToastContainer } from 'react-toastify';
import Header from '../Header/Header';
import { Outlet, ScrollRestoration, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const products = useLoaderData(); 
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleCategoryFilter = (category) => {
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    return (
        <div>
            {/* Pass filter function to Header */}
            <Header handleCategoryFilter={handleCategoryFilter} />
            
            {/* Pass filtered products to Shop */}
            <Outlet context={{ filteredProducts }} />

            <ScrollRestoration />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default Home;