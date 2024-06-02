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
import { FaRegNewspaper } from "react-icons/fa";
import { IoBarChartOutline } from "react-icons/io5";

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
    key: "orders",
    label: "Orders",
    path: "/dashboard/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/dashboard/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "sellers",
    label: "Sellers",
    path: "/dashboard/sellers",
    icon: <HiOutlineDocumentText />,
  },

  {
    key: "managerProduct",
    label: "Product Management ",
    path: "/dashboard/product-management",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "managerNews",
    label: "News Management",
    path: "/dashboard/news-management",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "promotion",
    label: "Promotion",
    path: "/dashboard/promotion",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "status",
    label: "Status",
    path: "/dashboard/status",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/dashboard/chat",
    icon: <HiOutlineAnnotation />,
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
