import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/homePage';
import ProductsPage from './Pages/ProductListPage/productsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />}>Home</Route>
        <Route path="/:slug" element={<ProductsPage />}>Products Page</Route>
      </Routes>
    </div>
  );
}

export default App;
