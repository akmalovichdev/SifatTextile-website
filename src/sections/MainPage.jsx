import React from 'react'
import { AboutUs, Hero, OurProducts, WhyUs, OurProductions, News, ContactUs, Geography, Gallery } from '@index'



const MainPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-white">
                <Hero />
                <AboutUs />
                <OurProducts />
                <WhyUs />
                <OurProductions />
                <News />
                <ContactUs />
                <Geography />
                <Gallery />
            </div>
        </div>
    )
}

export default MainPage
