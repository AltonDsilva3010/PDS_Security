import App from "../App";
import HomePage from "../Components/Home/HomePage";
import RegistrationPage from "../Components/Registration/registrationPage";

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
    ],
  },
  {},
];
