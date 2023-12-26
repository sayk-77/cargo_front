import {BrowserRouter} from "react-router-dom";
import {RouterApp} from "./RouterApp";

export const App = () => {
    return(
        <BrowserRouter>
            <RouterApp />
        </BrowserRouter>
    )
}