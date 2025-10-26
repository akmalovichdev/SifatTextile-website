"use client";
import { useState } from "react";
import { Footer, MainPage, Header, OurServises, Surxon, Maroqand, Kamalak } from "@index";

export default function Home() {
  const [activeSection, setActiveSection] = useState("MainPage");

  const renderSection = () => {
    switch (activeSection) {
      case "OurServises":
        return <OurServises />;
      case "Surxon":
        return <Surxon />;
      case "Maroqand":
        return <Maroqand />;
      case "Kamalak":
        return <Kamalak />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header setActiveSection={setActiveSection} />

      <main className="flex-grow">{renderSection()}</main>

      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
