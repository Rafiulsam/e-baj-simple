// Use local storage to manage cart data

const addToDb = (id) => {
    if (typeof window === "undefined") return; 

    const shoppingCart = getShoppingCart();
    shoppingCart[id] = (shoppingCart[id] ?? 0) + 1;
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const removeFromDb = (id) => {
    if (typeof window === "undefined") return;

    const shoppingCart = getShoppingCart();
    if (id in shoppingCart) {
        delete shoppingCart[id];

        if (Object.keys(shoppingCart).length > 0) {
            localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
        } else {
            localStorage.removeItem("shopping-cart");
        }
    }
};

const getShoppingCart = () => {
    if (typeof window === "undefined") return {}; 

    try {
        return JSON.parse(localStorage.getItem("shopping-cart")) || {};
    } catch (error) {
        console.error("Error parsing shopping cart data:", error);
        return {};
    }
};

const deleteShoppingCart = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("shopping-cart");
};

export { addToDb, removeFromDb, getShoppingCart, deleteShoppingCart };
