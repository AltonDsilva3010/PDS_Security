import App from "../App";
import HomePage from "../Components/Home/HomePage";
import RegistrationPage from "../Components/Registration/registrationPage";
import SignUpLogin from "../Components/Common/SignUpLogin";
import FarmerProfilePage from "../Components/Farmer/FarmerProfilePage";
import FarmerProfileForm from "../Components/Farmer/FarmerProfileForm";
import AddProductForm from "../Components/Farmer/ProductPage";
import ProductPage from "../Components/Farmer/ProductPage";
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
        path : "/signUp",
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
      }
    ],
  },
  {},
];
