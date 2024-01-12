import './top_container.css';
import React from "react";
import Header from "./header";
import HeroSection from "./hero_section";

const TopContainer = () => (
    <div className="top_container">
        <Header isDashboard={false}/>
        <HeroSection/>
    </div>
);

export default TopContainer;