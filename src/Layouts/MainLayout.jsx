import React from 'react';
import Header from "../Components/Header/Header";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <div className='content'>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;