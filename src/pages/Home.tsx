import Banner from "@/components/module/banner";
// import { CarCarousel } from "@/components/module/featuredCar";
import Contact from "./Contact";
import About from "./About";
import FeaturedCarsPage from "./featuredCarsPage";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedCarsPage/>
      <Contact></Contact>
      <About></About>
    </div>
  );
};

export default Home;
