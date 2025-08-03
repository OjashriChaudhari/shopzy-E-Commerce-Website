
import NavigationBar from'./Components/client/NavigationBar';
import HomePage from './Components/client/HomePage';
import {Routes,Route } from 'react-router-dom';
import './App.css';
import CartsPage from './Components/client/CartsPage';
import LoginForm from './Components/server/LoginForm';
import SignUpForm from './Components/server/SignUpForm';
function App() {
  

  return (
    <>
     <NavigationBar/> 
     <Routes>
      <Route path= '/' element= {<HomePage/>}/>
      <Route path= '/cart' element= {<CartsPage/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignUpForm/>}/>
     </Routes>

    </>
  )
}

export default App
