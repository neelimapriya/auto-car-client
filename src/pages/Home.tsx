import Banner from "@/components/module/banner";
import { CarCarousel } from "@/components/module/featuredCar";
import Contact from "./Contact";
import About from "./About";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CarCarousel></CarCarousel>
      <Contact></Contact>
      <About></About>
    </div>
  );
};

export default Home;
