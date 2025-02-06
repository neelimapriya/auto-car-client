import banner from "@/assets/image/about-bg.jpg";
import ReviewsPage from "@/components/module/reviews";

const About = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <img
            src={banner}
            width="550"
            height="350"
            alt="About Us"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Our Story
            </div>
            <h1 className="uppercase text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to <strong className="font-serif text-rose-700 ">AUTO CAR </strong>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Since the establishment on 13th August 1999, Auto Car is engaged
              in car selling, displaying and purchasing market in Bangladesh.
              Today the company has grown into a leading provider of quality
              services in Bangladesh Car Market. Auto Car- where your dreams
              meet affordability. If you are looking for a used, cost-effective
              as well as enchanting car, Auto Car is here for you. What are the
              questions that constantly come to your mind while buying a car? -
              Are the equipment and parts okay? Is the engine condition good? Do
              you have to face the hassles of the paperwork? If you want to
              overcome these inconveniences and choose the best product- Car
              Haat should be your first choice. Auto Car is the best place to
              find your preferred car at an affordable price. If you want to
              sell or buy used and second-hand cars and complete all the
              paperwork within a day, come to Auto Car which takes place every
              Friday, as no other showroom can offer such a variety of options
              on the same platform.
            </p>
          </div>
         
        </div>
      </div>
      <ReviewsPage></ReviewsPage>
    </section>
  );
};

export default About;
