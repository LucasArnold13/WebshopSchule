import { Routes, Route, Navigate } from 'react-router-dom';

import FrontendLogin from "./Pages/Frontend/FrontendLogin";
import Layout from "./Layouts/Layout"
import Register from './Pages/Frontend/Register';
import Customerlayout from './Layouts/Customerlayout';
import Profile from './Pages/Frontend/Customer/profile';
import Address from './Pages/Frontend/Customer/address';
import Orders from './Pages/Frontend/Customer/orders';
import BackendLayout from './Layouts/Backendlayout';
import BackendBackground from './Background/BackendBackground';
import NotFoundBackend from './Pages/Backend/NotFoundBackend';
import NotFoundFrontend from './Pages/Frontend/NotFoundFrontend'

import Order from './Pages/Frontend/Customer/Order';
import Dashboard from './Pages/Backend/Dashboard';
import Customers from './Pages/Backend/Customers';
import Customer from './Pages/Backend/Customer';
import Backendorders from './Pages/Backend/Orders';
import Backendorder from './Pages/Backend/Backenorder';
import Products from './Pages/Backend/Products';
import Product from './Pages/Backend/Product';
import Users from './Pages/Backend/Users';
import User from './Pages/Backend/User';
import ProtectedFrontendRoutes from './Context/ProtectedFrontendRoutes';
import ProtectedBackendRoutes from './Context/ProtectedBackendRoutes';
import { AuthProvider } from './Context/AuthProvider';
import BackendLogin from './Pages/Backend/BackendLogin';
import Categories from './Pages/Backend/Categories';
import Category from './Pages/Backend/Category';

function App() {


  return (
    <AuthProvider>

      <Routes>

        {/* Frontend */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<FrontendLogin />} />
          <Route path="register" element={<Register />} />

          <Route element={<ProtectedFrontendRoutes />} >
            <Route path='customer/' element={<Customerlayout />}>
              <Route path="order/:id" element={<Order />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="addresses" element={<Address />} />
            </Route>
          </Route>


          <Route path="1" />
          <Route path="2" />
          <Route path="3" />
          <Route path="4" />
          <Route path="user" />
          <Route path="*" element={<NotFoundFrontend />} />
        </Route>


        {/* Backend */}
        <Route path='/backend/' element={<BackendBackground />} >
          <Route path='login' element={<BackendLogin/>} />

          <Route element={<ProtectedBackendRoutes />} >
          <Route element={<BackendLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='customers' element={<Customers />} />
            <Route path='customers/:id' element={<Customer />} />
            <Route path='orders' element={<Backendorders />} />
            <Route path='orders/:id' element={<Backendorder />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<Product />} />
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<User />} />
            <Route path='categories' element={<Categories />} />
            <Route path='categories/:id' element={<Category />} />
            <Route path="*" element={<NotFoundBackend />} />
          </Route>
          </Route>

        </Route>

      </Routes>
    </AuthProvider>

  );
}

export default App;
