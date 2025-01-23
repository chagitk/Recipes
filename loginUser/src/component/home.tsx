
import { Outlet } from "react-router-dom";
import Login from "./Logit";
import UserReducer, { initialState, UserContext } from "./userReducer";
import View_user_Data from "./viewUserData";
import Menu from "./Menu";
import { useReducer } from "react";
import './styles/loginStyle.css'
export default function Home() {
    const [user, dispatchUser] = useReducer(UserReducer, initialState);
    return (
        <div className="home-container">
            <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
                <div className="titel-container">
                    <div className="top-right">
                        {!user.email ? <Login /> : <View_user_Data />}
                    </div>
                    <div className="top-left">
                        <Menu />
                    </div>
                </div>
                <div className="main-content" >
                    <Outlet />
                </div>
            </UserContext.Provider>

        </div>
    );
}
