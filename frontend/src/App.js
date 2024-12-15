import './App.css';
import Login from "./pages/Login";
import Layout from "./components/Layouts/Layout"
import Register from './pages/Register';
import Customerlayout from './components/Layouts/Customerlayout';
import Profile from './pages/customer/profile';
import Address from './pages/customer/address';
import { Routes, Route } from 'react-router-dom';
import Orders from './pages/customer/orders';
import { AuthProvider } from './context/AuthProvider';
import Order from './pages/customer/Order';

function App() {
  return (
    <AuthProvider>
        <Routes>

          {/* Frontend */}
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />}/>

            <Route path='customer/' element={<Customerlayout/>}>
                <Route path="order/:id" element={<Order />} />
                <Route path="profile" element={<Profile/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="addresses" element={<Address/>}/>
            </Route>

            <Route path="1" />
            <Route path="2" />
            <Route path="3"/>
            <Route path="4" />
            <Route path="user" />
          </Route>


          {/* Backend */}
          <Route path='/backend/' >
            <Route path='dashboard'/>
          </Route>
      </Routes>
    </AuthProvider>
  

  );
}

export default App;
