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
        path: "/auth",
        element: <SignUpLogin />,
      },
      {
        path: "profile-farmer",
        element: <FarmerProfilePage />,
        children: [
          {
            index: true,
            element: <FarmerProfileForm />,
          },
          {
            path: "/profile-farmer/Products",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "/dashboard/fci",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardDetails />,
          },
          {
            path: "/dashboard/fci/:id",
            element: <ProductDetailsModal />,
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
