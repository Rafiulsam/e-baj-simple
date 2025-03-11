import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/layouts/Home.jsx'
import Shop from './components/Shop/Shop.jsx'
import Order from './components/Order/Order.jsx'
import Inventory from './components/Inventory/Inventory.jsx'
import Login from './components/Login/Login.jsx'
import cartProductsLoader from './loaders/cartProductsLoader.js'
import Checkout from './components/Checkout/Checkout.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import AuthProvider from './components/Providers/AuthProvider.jsx'
import PrivetRoute from './components/routes/PrivetRoute.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>,
    loader: () => fetch('products.json'),
    children:[
      {
        index:true,
        path:'/',
        element:<Shop></Shop>,
      },
      {
        path:'reviewitems',
        element:<Order></Order>,
        loader:cartProductsLoader
      },
      {
        path:'inventory',
        element:<PrivetRoute><Inventory></Inventory></PrivetRoute>
      },
      {
        path:'checkout',
        element:<PrivetRoute><Checkout></Checkout></PrivetRoute>
      },
      {
        path:'signup',
        element:<SignUp></SignUp>
      },
      {
        path:'login',
        element:<Login></Login>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router}/></AuthProvider>
  </React.StrictMode>,
)
