import { useContext, useState } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

const categories = [
    "All",
    "Men's Sneaker",
    "Men's Pants",
    "Men's Boot",
    "Bag",
    "Cap",
    "Earphones",
    "Bottle"
];

const Header = ({ handleCategoryFilter }) => {
    const { user, logOut } = useContext(AuthContext)
    const [activeCategory, setActiveCategory] = useState("All");

    const handleClick = (category) => {
        setActiveCategory(category);
        handleCategoryFilter(category);
    };
    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => { console.log(error) })
    }
    return (
        <nav className='header'>
            <Link to='/'>
                <img src={logo} alt="" />
            </Link>
            <div className='navCategories'>
                {categories.map(category => (
                    <button 
                        key={category} 
                        onClick={() => handleClick(category)}
                        className={activeCategory === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className='navLink'>
                <Link to="/">Home</Link>
                {/* <Link to="reviewitems">Review Items</Link> */}
                {/* <Link to="inventory">Inventory</Link> */}

                {
                    user ? <><span className='display-name'>{user.displayName}</span><button className='btn-sign-out' onClick={handleSignOut}>Sign Out  <FontAwesomeIcon icon={faArrowRightFromBracket} /></button> </> : <span><Link to="login">Login</Link>
                        <Link to="signup">Sign Up <FontAwesomeIcon icon={faArrowRightToBracket} /></Link></span>
                }
            </div>
        </nav>
    );
};

export default Header;