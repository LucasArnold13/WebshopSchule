import './App.css';
import Login from "./pages/Login";
import Layout from "./components/Layout"
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />}/>

        <Route path="1" />
        <Route path="2" />
        <Route path="3"/>
        <Route path="4" />
        <Route path="user" />
      </Route>
    </Routes>

  );
}

export default App;
