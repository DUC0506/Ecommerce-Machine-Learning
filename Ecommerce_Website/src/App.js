
import { Routes, Route } from 'react-router-dom'
import HomePage from './PageSections/HomePage';
import { useSelector } from 'react-redux'
// import Product from './Components/Product';
// import Comingsoon from './PageSections/Comingsoon'
import Addtocart from './PageSections/Addtocart';
import Comingsoon from './PageSections/Comingsoon';
import Added from './Components/Added';
import Category from './PageSections/Category';
import DetailProduct from './PageSections/DetailProduct';
import Cart from './PageSections/Cart';
import OrderInfoPage from './PageSections/OrderInfo';
import './App.css';
import Signin from './Components/SignIn';
import Layout from '../src/Components/admin/shared/Layout'
import Dashboard from '../src/Components/pages/Dashboard'
import Products from '../src/Components/pages/Products';

import Order from './Components/pages/Order';
import Product from './Components/Product';
function App() {
  const {soon, product, products, addedsuccessfully} = useSelector((state) => state.changestate)
  return (
    
    <div className="App">
      {}
      {products && <Addtocart/>}
      {soon && <Comingsoon/>}
      {addedsuccessfully && <Added/>}
      <Routes>
        <Route index path="/" element={<HomePage/>}/>
        <Route index path="/categorys" element={<Category/>}/>
        <Route index path="/product/:id" element={<DetailProduct/>}/>
        <Route index path="/cart" element={<Cart/>}/>
        <Route index path="/checkout" element={<OrderInfoPage/>}/>
        <Route index path="/signIn" element={<Signin/>}/>
        {/* <Route path='/:id/product' element={<Product/>}/>
        <Route path="/comingSoon" element={<Comingsoon/>}/>
        <Route path="/added-to-cart" element={<Addtocart/>}/> */}
       <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Order />} />
        </Route>
      </Routes>
    </div>
    
  );
}

export default App;
