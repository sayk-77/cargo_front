import {Navigate, Route, Routes} from "react-router-dom";
import {Drivers} from "./Page/Driver/Drivers";
import {Home} from "./Page/Home/Home";
import {Customers} from "./Page/Customers/Customers";
import {Contracts} from "./Page/Contracts/Contracts";
import {Cars} from "./Page/Cars/Cars";
import {PrintDocument} from "./Page/PrintDocument/PrintDocument";
import {ImportData} from "./Page/ImportData/ImportData";
import {Login} from "./Page/Login/Login";
import {Register} from "./Page/Register/Register";

export const RouterApp = () => (
    <>
        <Routes>
            <Route exact path="/" element={<Navigate to="/login" /> }/>
            <Route path="/home" element={<Home />} />
            <Route path="/drivers" element={<Drivers />}/>
            <Route path="/customers" element={<Customers />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/print-document/:contractId" element={<PrintDocument />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </>
);