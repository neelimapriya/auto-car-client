import Banner from '@/components/module/banner';
import { CarCarousel } from '@/components/module/featuredCar';
import Contact from './Contact';
import About from './About';
import BrandCarousel from '@/components/module/featuredCarousel';


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <CarCarousel></CarCarousel>
           <BrandCarousel></BrandCarousel>
           <Contact></Contact>
           <About></About>
        </div>
    );
};

export default Home;