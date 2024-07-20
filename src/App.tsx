import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/registerPage/Register';
import UserHome from './components/home/Home';
import Login from './components/loginPage/Login';
import './App.css';
import FormikPractice from './components/formik/FormikPractice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user' element={<UserHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />
        <Route path='/formik' element={<FormikPractice />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
