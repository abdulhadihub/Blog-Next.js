import React from 'react';
import { Header } from './';
import { Navbar } from './';


const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {/* <Header /> */}
            {children}
        </>
    );
};

export default Layout;
