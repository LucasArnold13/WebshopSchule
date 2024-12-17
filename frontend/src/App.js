import { Routes, Route, Navigate } from 'react-router-dom';

import Login from "./pages/Login";
import Layout from "./Layouts/Layout"
import Register from './pages/Register';
import Customerlayout from './Layouts/Customerlayout';
import Profile from './pages/Customer/profile';
import Address from './pages/Customer/address';
import Orders from './pages/Customer/orders';
import BackendLayout from './Layouts/Backendlayout';

import Order from './pages/Customer/Order';
import Dashboard from './pages/Backend/Dashboard';
import Customers from './pages/Backend/Customer';
import Backendorders from './pages/Backend/Orders';
import Backendorder from './pages/Backend/Backenorder';
import Products from './pages/Backend/Products';
import Users from './pages/Backend/Users';
import  ProtectedCustomerRoutes  from './Context/ProtectedCustomerRoutes';

function App() {
  return (
      <Routes>

        {/* Frontend */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={ProtectedCustomerRoutes} >
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
        </Route>


        {/* Backend */}
        <Route path='/backend/' element={<BackendLayout />} >
          <Route index element={<Navigate to="/backend/dashboard" replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='customers' element={<Customers />} />
          <Route path='orders' element={<Backendorders />} />
          <Route path='order/:id' element={<Backendorder />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>


  );
}

export default App;
