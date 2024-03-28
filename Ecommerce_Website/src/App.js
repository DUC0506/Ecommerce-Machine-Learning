
import { Routes, Route,useNavigate  } from 'react-router-dom'
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
import { useAuth } from './hooks';
import LayoutAdmin from '../src/Components/admin/shared/LayoutAdmin';
import ApartmentDashboard from './Components/pages/Apartment';
import CustomerAdmin from './Components/pages/CustomerAdmin';
import HistoryTransaction from './Components/admin/shared/HistoryTransaction';
function App() {

  const {soon, product, products, addedsuccessfully} = useSelector((state) => state.changestate)
  
  const{authInfo} = useAuth()
  console.log('1221'+authInfo.isLoggedIn);
  if (authInfo.isLoggedIn===false) {
    // Nếu không đăng nhập, chuyển hướng đến trang đăng nhập
    return <Signin/>
  }

  const isAdmin = authInfo.profile?.role === 'admin' 
  const isSeller = authInfo.profile?.role === 'seller' 
  const isUser = authInfo.profile?.role === 'user';
  console.log(isUser);
      if(isAdmin ) 
          return (
            <Routes>
              <Route path="/" element={<LayoutAdmin />}>
                          <Route index element={<Dashboard />} />
                          <Route path="dashboard/apartments" element={<ApartmentDashboard />} />
                          <Route path="dashboard/customers" element={<CustomerAdmin />} />
                          <Route path="dashboard/customers/history-transactions/:id" element={<HistoryTransaction />} />
              </Route>
            </Routes>)
      if(isSeller ) 
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="dashboard/products" element={<Products />} />
                      <Route path="dashboard/orders" element={<Order />} />
          </Route>
        </Routes>)
      else if(isUser )
      console.log('ss' +isUser);
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
       {/* <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Order />} />
        </Route> */}
      </Routes>
      
    </div>
    
  );

}

export default App;
