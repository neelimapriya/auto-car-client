import bannerImg from "@/assets/image/banner2.png";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
const Banner = () => {
  return (
    <AnimatePresence>
      <section
        className={`relative bg-cover bg-right  sm:bg-center bg-no-repeat   `}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div
          className="absolute inset-0
     bg-gray-700/75 sm:bg-gradient-to-r sm:bg-transparent sm:from-gray-700/85 sm:to-gray-700/15
       "
        ></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl">
            <motion.h1
              whileInView={{ opacity: [0, 1], x: [-20, 0] }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl font-extrabold text-white sm:text-5xl"
            >
              IT'S TIME TO
              <small className="block font-serif text-rose-700   "> Accelerate</small>
              <strong className="text-3xl font-extrabold text-white sm:text-5xl">
                Your Dreams
              </strong>
            </motion.h1>

            <motion.p
              whileInView={{ opacity: [0, 1], x: [-20, 0] }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className=" capitalize  mt-4 max-w-lg text-white text-base sm:text-xs/relaxed"
            >
              Where your dreams meet affordability. if you are looking for a used, cost-effective, enchanting car, <strong className="inline-block rounded-sm bg-muted px-1 font-serif text-rose-700 ">AUTO CAR </strong> is here for you.
            </motion.p>

            <motion.div
              whileInView={{ opacity: [0, 1], x: [-20, 0] }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 flex flex-wrap gap-4 text-center"
            >
              <Link
                to="/bikes"
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white dark:text-black shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              >
               Explore
              </Link>

              <button
                // onClick={handleSearchClick}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow dark:bg-black  hover:text-primary/90 focus:outline-none focus:ring active:text-primary sm:w-auto"
              >
                Search Car
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default Banner;
