import { Routes, Route, Navigate } from 'react-router-dom';

import { SnackbarProvider } from "./Context/SnackbarContext";
import { CartProvider } from './Context/CartContext';
import ProtectedFrontendRoutes from './Context/ProtectedFrontendRoutes';
import ProtectedBackendRoutes from './Context/ProtectedBackendRoutes';
import FrontendLogin from "./Pages/Frontend/FrontendLogin";
import Layout from "./Layouts/Layout"
import Register from './Pages/Frontend/Register';
import Customerlayout from './Layouts/Customerlayout';
import Profile from './Pages/Frontend/Customer/Profile';
import Orders from './Pages/Frontend/Customer/orders';
import BackendLayout from './Layouts/Backendlayout';
import BackendBackground from './Background/BackendBackground';
import NotFoundBackend from './Pages/Backend/NotFoundBackend';
import NotFoundFrontend from './Pages/Frontend/NotFoundFrontend'
import Order from './Pages/Frontend/Customer/Order';
import Dashboard from './Pages/Backend/Dashboard';
import Customers from './Pages/Backend/Customer/Customers';
import Customer from './Pages/Backend/Customer/Customer';
import AddCustomer from './Pages/Backend/Customer/AddCustomer';
import Backendorders from './Pages/Backend/Order/Orders';
import Backendorder from './Pages/Backend/Order/BackendOrder';
import Products from './Pages/Backend/Product/Products';
import Product from './Pages/Backend/Product/Product';
import Users from './Pages/Backend/User/Users';
import User from './Pages/Backend/User/User';
import AddUser from './Pages/Backend/User/AddUser';
import BackendLogin from './Pages/Backend/BackendLogin';
import Categories from './Pages/Backend/Category/Categories';
import Category from './Pages/Backend/Category/Category';
import AddCategory from './Pages/Backend/Category/AddCategory';
import AddProduct from './Pages/Backend/Product/AddProduct';
import AddOrder from './Pages/Backend/Order/AddOrder';
import EditOrder from './Pages/Backend/Order/EditOrder';
import FrontendProduct from './Pages/Frontend/FrontendProduct';
import FrontendCategory from './Pages/Frontend/FrontendCategory';
import Checkout from './Pages/Frontend/Checkout';



function App() {


  return (
      <SnackbarProvider>
        <CartProvider>
          <Routes>

            {/* Frontend */}
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<FrontendLogin />} />
              <Route path="register" element={<Register />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:productName" element={<FrontendProduct />} />
              <Route path=":categoryName" element={<FrontendCategory />} />

              <Route element={<ProtectedFrontendRoutes />} >
                <Route path='customer/' element={<Customerlayout />}>
                  <Route path="orders/:id" element={<Order />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                </Route>
              </Route>

              <Route path="user" />
              <Route path="*" element={<NotFoundFrontend />} />
            </Route>


            {/* Backend */}
            <Route path='/backend/' element={<BackendBackground />} >
              <Route path='login' element={<BackendLogin />} />

              <Route element={<ProtectedBackendRoutes />} >
                <Route element={<BackendLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path='dashboard' element={<Dashboard />} />

                  <Route path='customers' element={<Customers />} />
                  <Route path='customers/:id' element={<Customer />} />
                  <Route path='customers/new' element={<AddCustomer />} />

                  <Route path='orders' element={<Backendorders />} />
                  <Route path='orders/:id' element={<Backendorder />} />
                  <Route path='orders/:id/edit' element={<EditOrder />} />
                  <Route path='orders/new' element={<AddOrder />} />

                  <Route path='products' element={<Products />} />
                  <Route path='products/:id' element={<Product />} />
                  <Route path='products/new' element={<AddProduct />} />

                  <Route path='users' element={<Users />} />
                  <Route path='users/:id' element={<User />} />
                  <Route path='users/new' element={<AddUser />} />

                  <Route path='categories' element={<Categories />} />
                  <Route path='categories/:id' element={<Category />} />
                  <Route path='categories/new' element={<AddCategory />} />

                  <Route path="*" element={<NotFoundBackend />} />
                </Route>
              </Route>
            </Route>


          </Routes>

        </CartProvider>
      </SnackbarProvider>

  );
}

export default App;
