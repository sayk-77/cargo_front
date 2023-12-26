import {Route, Routes} from "react-router-dom";
import {Drivers} from "./Page/Driver/Drivers";
import {Home} from "./Page/Home/Home";

export const RouterApp = () => (
    <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/drivers" element={<Drivers />}/>
        </Routes>
    </>
);