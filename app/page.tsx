import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Steps from "@/components/Steps";
import Requirements from "@/components/Requirements";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Steps />
        <Requirements />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
