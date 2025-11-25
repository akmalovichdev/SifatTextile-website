"use client";
import { useState } from "react";
import { Footer, MainPage, Header, OurServises, Surxon, Maroqand, Kamalak, Contacts, Career, Certificates } from "@index";

export default function Home() {
  const [activeSection, setActiveSection] = useState("MainPage");

  const renderSection = () => {
    switch (activeSection) {
      case "OurServises":
        return <OurServises />;
      case "Surxon":
        return <Surxon setActiveSection={setActiveSection} />;
      case "Maroqand":
        return <Maroqand setActiveSection={setActiveSection} />;
      case "Kamalak":
        return <Kamalak setActiveSection={setActiveSection} />;
      case "Contacts":
        return <Contacts setActiveSection={setActiveSection} />;
      case "Career":
        return <Career setActiveSection={setActiveSection} />;
      case "Certificates":
        return <Certificates setActiveSection={setActiveSection} />;
      default:
        return <MainPage setActiveSection={setActiveSection} />;
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
