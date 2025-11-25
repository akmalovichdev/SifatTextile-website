"use client";
import React from 'react'
import { AboutUs, Hero, OurProducts, WhyUs, OurProductions, News, ContactUs, Geography, Gallery } from '@index'



const MainPage = ({ setActiveSection }) => {
    return (
        <div>
            <div className="min-h-screen bg-white">
                <Hero />
                <AboutUs />
                <OurProducts />
                <WhyUs />
                <OurProductions setActiveSection={setActiveSection} />
                <News />
                <ContactUs setActiveSection={setActiveSection} />
                <Geography />
                <Gallery />
            </div>
        </div>
    )
}

export default MainPage
