import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import Login from './Pages/Login/login.js';
import Signup from './Pages/SignUp/signup.js';
import PrivateRoutes from './components/privateRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInitialData, isLoggedIn } from './actions';
import Products from './Pages/Products/products';
import Orders from './Pages/Orders/orders';
import Categories from './Pages/Categories/category';
import StorePage from './Pages/StorePage/page';

function App() {
  const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);

  // ComponentDidMount - called only once
  // ComponentDidRender - called again & again each time for updating
	useEffect(()=> {
		if(!auth.authenticated) {
			dispatch(isLoggedIn());
		}
    if(auth.authenticated) {
      dispatch(getInitialData());
    }
	}, [auth.authenticated]);

  return (
    <div className="App">
        <Routes>
          {/* use PrivateRoute component for pages which needs to be logged in to access
            * In react router dom v6 we can't directly use PrivateRoute component since Children of Routes must be a Route or React.Fragment
            * It provide a Outlet function which has the children of nested Route 
            */}
          <Route element={<PrivateRoutes/>}>
            <Route path="/" exact element={<Home/>}>Home</Route>
            <Route path="/products" element={<Products/>}>Products</Route>
            <Route path="/orders" element={<Orders/>}>Orders</Route>
            <Route path="/categories" element={<Categories/>}>categories</Route>
            <Route path="/page" element={<StorePage/>}>Home</Route>
          </Route>
          <Route path="/login" element={<Login/>}>Login</Route>
          <Route path="/signup" element={<Signup/>}>SignUp</Route>
        </Routes>
    </div>
  );
}

export default App;
