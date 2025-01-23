import { useContext } from "react"
import Update from "./update";
import { UserContext } from "./userReducer";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";


const ViewUserData = () => {
    const { state: user } = useContext(UserContext);
    return (
    <div className="container_name">
                <Update />
        hello, {user.firstName || user.email}
        <Avatar sx={{ bgcolor: deepOrange[500] }} >{user.firstName[0]}</Avatar>
    </div>)
}
export default ViewUserData