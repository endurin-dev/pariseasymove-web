import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Packages from "@/components/Packages";
import ReadyToBook from "@/components/ReadyToBook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Packages />
        <Reviews/>
        <ReadyToBook/>
      </main>
      <Footer />
    </>
  );
}