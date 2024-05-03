import App from "../App";
import HomePage from "../Components/Home/HomePage";
import RegistrationPage from "../Components/Registration/RegistrationPage";
import SignUpLogin from "../Components/Common/SignUpLogin";
import FarmerProfilePage from "../Components/Farmer/FarmerProfilePage";
import FarmerProfileForm from "../Components/Farmer/FarmerProfileForm";
import ProductPage from "../Components/Farmer/ProductPage";
import Dashboard from "../Components/FCI/Dashboard/Dashboard";
import VerifyFarmer from "../Components/FCI/VerifyFarmer/VerifyFarmer";
import VerifyApmcOfficer from "../Components/FCI/VerifyApmcOfficer/VerifyApmcOfficer";
import Notification from "../Components/FCI/Notifications/Notification";
import FarmerRegistrationForm from "../Components/Farmer/FarmerRegistrationForm";
import VerifyFarmerModal from "../Components/FCI/VerifyFarmer/VerifyFarmerModal";
import VerifyApmcOfficerModal from "../Components/FCI/VerifyApmcOfficer/VerifyApmcOfficerModal";
import DashboardAPMC from "../Components/Apmc/Dashboard/DashboardAPMC";
// import VerifyFarmerPage from "../Components/FCI/VerifyFarmer/VerifyFarmerPage";
import ApmcOfficerRegistrationForm from "../Components/Apmc/ApmcOfficerRegistrationForm";
import DashboardDetails from "../Components/FCI/Dashboard/DashboardDetails";
import AddApmcForm from "../Components/Apmc/AddApmcForm";
import AllAPMC from "../Components/FCI/AllAPMC";
import ProductDetailsModal from "../Components/FCI/Dashboard/ProductDetailsModal";
import FarmerProductModal from "../Components/Farmer/FarmerProductModal";
import FCIDashDetails from "../Components/FCI/Dashboard/FCIDashDetails";
import FCIProdModal from "../Components/FCI/Dashboard/FCIProdModal";
import BuyerRegistrationForm from "../Components/Buyer/BuyerRegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const ProtectOfficerRoute = ({ element }) => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  const role = globalState.role;
  // const location = useLocation;
  if (role != "officer") {
    return <Navigate to="/" />;
  }
  return element;
};

const ProtectConnectedRoute = ({ element }) => {
  const globalState = useSelector((state) => state.globlaStateSlice);
  if (!globalState) {
    return <Navigate to="/" />;
  }
  return element;
};

export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/registration/farmer",
        element: <FarmerRegistrationForm />,
      },
      {
        path: "/registration/apmc-officer",
        element: <ApmcOfficerRegistrationForm />,
      },
      {
        path: "/registration/apmc",
        element: <AddApmcForm />,
      },
      {
        path: "/registration/buyer",
        element: <BuyerRegistrationForm />,
      },
      {
        path: "/auth",
        element: <SignUpLogin />,
      },
      {
        path: "profile",
        element: <ProtectConnectedRoute element={<FarmerProfilePage />} />,
        children: [
          {
            index: true,
            element: <FarmerProfileForm />,
          },
          {
            path: "/profile/Products",
            element: <ProductPage />,
          },
          {
            path: "/profile/Products/:id",
            element: <FarmerProductModal />,
          },
        ],
      },
      {
        path: "/commodities",
        element: <ProtectConnectedRoute element={<DashboardDetails />} />,
      },
      {
        path: "commodities/:id",
        element: <ProtectConnectedRoute element={<ProductDetailsModal />} />,
      },
      {
        path: "/dashboard/fci",
        element: <ProtectOfficerRoute element={<Dashboard />} />,
        children: [
          {
            index: true,
            element: <FCIDashDetails />,
          },
          {
            path: "/dashboard/fci/:id",
            element: <FCIProdModal />,
          },
          {
            path: "/dashboard/fci/verify-farmer",
            element: <VerifyFarmer />,
          },
          ,
          {
            path: "/dashboard/fci/verify-apmc-officer",
            element: <VerifyApmcOfficer />,
          },
          {
            path: "/dashboard/fci/notification",
            element: <Notification />,
          },
          {
            path: "/dashboard/fci/apmcs",
            element: <AllAPMC />,
          },
        ],
      },
      {
        path: "/dashboard/apmc-officer",
        element: <DashboardAPMC />,
      },
      {
        path: "/dashboard/fci/verify-farmer/:id",
        element: <VerifyFarmerModal />,
      },
      {
        path: "/dashboard/fci/verify-apmc-officer/:id",
        element: <VerifyApmcOfficerModal />,
      },
    ],
  },
];
