import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { AiOutlineNotification } from "react-icons/ai";
import { MdPolicy } from "react-icons/md";
import { SiInstatus, SiExpensify } from "react-icons/si";
import { FaRegNewspaper, FaFacebookMessenger } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import {
  IoBarChartOutline,
  IoStorefrontSharp,
  IoShareSocialSharp,
} from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "products",
    label: "Products",
    path: "/dashboard/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/dashboard/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "promotions",
    label: "Promotions",
    path: "/dashboard/promotions",
    icon: <AiOutlineNotification />,
  },
  {
    key: "finance",
    label: "Finance",
    path: "/dashboard/finance",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "expense",
    label: "Expense",
    path: "/dashboard/expense",
    icon: <SiExpensify />,
  },
  {
    key: "report",
    label: "Report",
    path: "/dashboard/report",
    icon: <IoBarChartOutline />,
  },
  {
    key: "feed",
    label: "Feed",
    path: "/dashboard/feed-seller",
    icon: <FaRegNewspaper />,
  },
  {
    key: "status",
    label: "Status",
    path: "/dashboard/status",
    icon: <SiInstatus />,
  },
  {
    key: "policy",
    label: "Policy",
    path: "/dashboard/policy-seller",
    icon: <MdPolicy />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/dashboard/messages",
    icon: <HiOutlineAnnotation />,
  },
];
export const DASHBOARD_SIDEBAR_LINKS_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "apartment",
    label: "Apartment",
    path: "/dashboard/apartments",
    icon: <HiOutlineCube />,
  },
  {
    key: "transaction",
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/dashboard/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "predict",
    label: "Predict",
    path: "/dashboard/predict",
    icon: <IoStorefrontSharp />,
  },

  {
    key: "managerProduct",
    label: "Product  ",
    path: "/dashboard/product-management",
    icon: <FaProductHunt />,
  },
  {
    key: "managerNews",
    label: "News ",
    path: "/dashboard/news-management",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "promotion",
    label: "Promotion",
    path: "/dashboard/promotion",
    icon: <IoShareSocialSharp />,
  },
  {
    key: "status",
    label: "Status",
    path: "/dashboard/status",
    icon: <TbStatusChange />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/dashboard/chat",
    icon: <FaFacebookMessenger />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
