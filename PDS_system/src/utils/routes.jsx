import App from "../App";
import HomePage from "../Components/Home/HomePage";
import RegistrationPage from "../Components/Registration/registrationPage";
import SignUpLogin from "../Components/Common/SignUpLogin";
import FarmerProfilePage from "../Components/Farmer/FarmerProfilePage";
import FarmerProfileForm from "../Components/Farmer/FarmerProfileForm";
import AddProductForm from "../Components/Farmer/ProductPage";
import ProductPage from "../Components/Farmer/ProductPage";
import Dashboard from "../Components/FCI/Dashboard/Dashboard";
import VerifyFarmer from "../Components/FCI/VerifyFarmer/VerifyFarmer";
import VerifyApmcOfficer from "../Components/FCI/VerifyApmcOfficer/VerifyApmcOfficer";
import Notification from "../Components/FCI/Notifications/Notification";
import FarmerRegistrationForm from "../Components/Farmer/FarmerRegistrationForm";
import VerifyFarmerModal from "../Components/FCI/VerifyFarmer/VerifyFarmerModal";
import DashboardAPMC from "../Components/Apmc/Dashboard/DashboardAPMC";
// import VerifyFarmerPage from "../Components/FCI/VerifyFarmer/VerifyFarmerPage";

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
        path : '/registration/farmer',
        element : <FarmerRegistrationForm/>
      },
      {
        path : "/auth",
        element : <SignUpLogin/>
      },{
        path : "profile-farmer",
        element : <FarmerProfilePage/>,
        children : [
          {
            index : true,
            element : <FarmerProfileForm/>
          },{
            path : "/profile-farmer/Products",
            element : <ProductPage/>
          }
        ]
      },{
        path : "/dashboard/fci",
        element : <Dashboard/>,
        children : [
         {
            path : "/dashboard/fci/verify-farmer",
            element : <VerifyFarmer/>
          },
          ,{
            path : "/dashboard/fci/verify-apmc-officer",
            element : <VerifyApmcOfficer/>
          },{
            path : "/dashboard/fci/notification",
            element : <Notification/>
          }
        ]
      },
      {
        path : "/dashboard/apmc-officer",
        element : <DashboardAPMC/>
      },
      {
        path : '/dashboard/fci/verify-farmer/:id',
        element : <VerifyFarmerModal/>
      }
    ],
  },
];
