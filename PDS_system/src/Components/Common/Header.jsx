import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // const { address } = useSelector((state) => state.userSlice);
  // console.log("HEADER ADDRESS", address);
  const globalState = useSelector((state) => state.globlaStateSlice);
  const userRole = globalState.role;
  console.log(globalState);
  const [state, setState] = React.useState(false);
  // const [currentUser, setCurrentUser] = React.useState(address || null);
  let userAddress;
  if (globalState.signer) {
    userAddress = globalState.signer.address;
  }

  return (
    <nav
      className={`bg-white pd-5 md:text-sm 
      ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <NavLink to={"/"}>
            <h1>
              <b>BlockSure PDS</b>
            </h1>
          </NavLink>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {userRole == "officer" && (
              <NavLink to={"/dashboard/fci"}>Dashboard</NavLink>
            )}
            {userAddress && <NavLink to={"/profile-farmer"}>Profile</NavLink>}
          </ul>

          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <div>
              <button
                onClick={() => connectWallet()}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex mr-[20px]"
              >
                {userAddress ? (
                  <span>{userAddress.slice(0, 25)}...</span>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>

              {userRole == "officer" ? (
                <NavLink to="/registration/apmc">
                  <button className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex mr-[20px]">
                    Add APMC
                  </button>
                </NavLink>
              ) : (
                <NavLink to="/registration">
                  <button className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex mr-[20px]">
                    Register
                  </button>
                </NavLink>
              )}

              {/* <NavLink to="/signUp">
                  <button className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                    Login / SignUp
                  </button>
                </NavLink> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
