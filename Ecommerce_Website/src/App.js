import { Routes, Route } from "react-router-dom";
import HomePage from "./PageSections/HomePage";
// import { useSelector } from "react-redux";
// import Product from './Components/Product';
// import Comingsoon from './PageSections/Comingsoon'
// import Addtocart from "./PageSections/Addtocart";
// import Comingsoon from "./PageSections/Comingsoon";
// import Added from "./Components/Added";
import Category from "./PageSections/Category";
import DetailProduct from "./PageSections/DetailProduct";
import Cart from "./PageSections/Cart";
import OrderInfoPage from "./PageSections/OrderInfo";
import "./App.css";
import Signin from "./Components/SignIn";
import Layout from "../src/Components/admin/shared/Layout";
import Dashboard from "../src/Components/pages/Dashboard";
import Products from "../src/Components/pages/Products";

import Order from "./Components/pages/Order";
// import Product from "./Components/Product";
import { useAuth } from "./hooks";
import LayoutAdmin from "../src/Components/admin/shared/LayoutAdmin";
import ApartmentDashboard from "./Components/pages/Apartment";
import CustomerAdmin from "./Components/pages/CustomerAdmin";
import HistoryTransaction from "./Components/admin/shared/HistoryTransaction";
import SellersAdmin from "./Components/pages/SellersAdmin";
import SellerProducts from "./Components/admin/shared/SellerProducts";
import OrderSeller from "./Components/pages/OrderSeller";
import DashboardSeller from "./Components/pages/DashboardSeller";
import Promotions from "./Components/pages/Promotions";
import Finance from "./Components/pages/Finance";
import Status from "./Components/pages/Status";
import SignUp from "./Components/SignUp";
// import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
import UserInfo from "./PageSections/UserInfo";
import MyOrder from "./PageSections/MyOrder";
import Productpage from "./PageSections/Productpage";
import Feed from "./Components/pages/Feed";
import FeedSeller from "./Components/pages/FeedSeller";
import SellerPolicy from "./Components/pages/SellerPolicy";
import Campaign from "./Components/pages/Campaign";
import PromotionSeller from "./Components/pages/PromotionSeller";
import Chat from "./Components/pages/Chat";
import RegisterSeller from "./PageSections/RegisterSeller";
import Report from "./Components/pages/Report";
import Expense from "./Components/pages/Expense";
import Predict from "./Components/pages/Predict";
import StatusAdmin from "./Components/admin/StatusAdmin";
import ManagerProduct from "./Components/pages/ManagerProduct";
import NewsManagement from "./Components/pages/NewsManagement";
import FavoriteProduct from "./PageSections/FavoriteProduct";
import VerifyApartment from "./Components/VerifyApartment";
import WithdrawFunds from "./Components/pages/WithDraw";
import PasswordConfirmation from "./Components/pages/PasswordModal";
import PredictAdmin from "./PageSections/PredictAdmin";
import TransactionsFinance from "./Components/admin/TransactionsFinance";

function App() {
  // const { soon, product, products, addedsuccessfully } = useSelector(
  //   (state) => state.changestate
  // );

  const { authInfo } = useAuth();

  // const navigate = useNavigate();
  if (!authInfo.isLoggedIn && window.location.pathname !== "/signIn") {
    // navigate('/signIn');

    return (
      <>
        {/* <Navigate to="/signIn" /> */}
        <Routes>
          <Route index path="/signIn" element={<Signin />} />
          <Route index path="/signUp" element={<SignUp />} />
        </Routes>
      </>
    );
  }
  //eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(()=>{

  //     <Navigate to="/signIn" />

  // },[])

  const isAdmin = authInfo.profile?.role === "admin";
  const isSeller = authInfo.profile?.role === "seller";
  const isUser = authInfo.profile?.role === "user";

  if (isAdmin)
    return (
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard/apartments" element={<ApartmentDashboard />} />
          <Route path="dashboard/customers" element={<CustomerAdmin />} />
          <Route
            path="dashboard/customers/history-transactions/:id"
            element={<HistoryTransaction />}
          />
          <Route path="dashboard/predict" element={<PredictAdmin />} />
          <Route
            path="dashboard/sellers/seller-products/:id"
            element={<SellerProducts />}
          />
          <Route
            path="dashboard/transactions"
            element={<TransactionsFinance />}
          />
          <Route path="dashboard/status" element={<StatusAdmin />} />
          <Route path="dashboard/user-info" element={<UserInfo />} />
          <Route path="dashboard/promotion" element={<PromotionSeller />} />
          <Route
            path="dashboard/product-management"
            element={<ManagerProduct />}
          />
          <Route
            path="dashboard/news-management"
            element={<NewsManagement />}
          />
          <Route path="dashboard/chat" element={<Chat role="user" />} />
        </Route>
      </Routes>
    );
  if (isSeller)
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardSeller />} />
          <Route path="dashboard/products" element={<Products />} />
          <Route path="dashboard/orders" element={<OrderSeller />} />
          <Route path="dashboard/promotions" element={<Promotions />} />
          <Route path="dashboard/predict" element={<Predict />} />
          <Route path="dashboard/finance" element={<Finance />} />
          <Route path="dashboard/report" element={<Report />} />
          <Route path="dashboard/status" element={<Status />} />
          <Route path="dashboard/user-info" element={<UserInfo />} />
          <Route path="dashboard/feed-seller" element={<FeedSeller />} />
          <Route path="dashboard/policy-seller" element={<SellerPolicy />} />
          <Route
            index
            path="dashboard/withdraw-funds"
            element={<WithdrawFunds />}
          />
          <Route
            index
            path="dashboard/password-confirmation"
            element={<PasswordConfirmation />}
          />

          <Route
            index
            path="dashboard/campaign/:idPromotion"
            element={<Campaign />}
          />
          <Route index path="dashboard/expense" element={<Expense />} />
          <Route
            path="dashboard/messages"
            element={
              <Chat role="user" apartment={authInfo.profile.apartment} />
            }
          />
        </Route>
      </Routes>
    );
  else if (isUser || isSeller) console.log("ss" + isUser);
  return (
    <div className="App">
      {}
      {/* {products && <Addtocart />}
      {soon && <Comingsoon />}
      {addedsuccessfully && <Added />} */}
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/categorys" element={<Category />} />
        <Route index path="/product/:id" element={<DetailProduct />} />
        <Route index path="/cart" element={<Cart />} />
        <Route index path="/checkout" element={<OrderInfoPage />} />
        <Route index path="/signIn" element={<Signin />} />
        <Route index path="/signUp" element={<SignUp />} />
        <Route index path="/user-info" element={<UserInfo />} />
        <Route index path="/user-order" element={<MyOrder />} />
        <Route index path="/product-page" element={<Productpage />} />
        <Route index path="/feed-page" element={<Feed />} />
        <Route index path="/seller-form" element={<RegisterSeller />} />
        <Route index path="/my-favorite" element={<FavoriteProduct />} />
        <Route index path="/verify-apartment" element={<VerifyApartment />} />

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
