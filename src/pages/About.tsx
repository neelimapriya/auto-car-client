import banner from "@/assets/image/about-bg.jpg";
import ReviewsPage from "@/components/module/reviews";
import { Users, Award, Target, Phone, Mail, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
      <div className="container px-4 md:px-6">
        {/* Top Section: About & Mission */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center mb-12">
          <img
            src={banner}
            width="550"
            height="350"
            alt="About Us"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full shadow-lg border border-gray-200 dark:border-gray-800"
          />
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-rose-700">
              Our Story
            </div>
            <h1 className="uppercase text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to <span className="font-serif text-rose-700">AUTO CAR</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Since 1999, Auto Car has been a trusted name in Bangladesh's car market, providing quality vehicles and exceptional service. Whether you're buying or selling, we make the process smooth, transparent, and reliable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <Award className="w-8 h-8 text-rose-600" />
                <div>
                  <div className="font-bold text-lg">Mission</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">To deliver affordable, high-quality cars and outstanding customer service, making car ownership accessible to everyone.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-8 h-8 text-rose-600" />
                <div>
                  <div className="font-bold text-lg">Vision</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">To be the most trusted and innovative car marketplace in Bangladesh, setting new standards in value and satisfaction.</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-rose-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-rose-700 transition">Find Your Dream Car Today</span>
            </div>
          </div>
        </div>
        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-rose-700 flex items-center justify-center gap-2"><Award className="w-6 h-6" /> Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">
              <div className="font-bold text-lg mb-2 text-rose-600">Integrity</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">We believe in honesty, transparency, and ethical business practices in every transaction.</div>
            </div>
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">
              <div className="font-bold text-lg mb-2 text-rose-600">Customer Focus</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Our customers are at the heart of everything we do. We strive to exceed expectations every time.</div>
            </div>
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">
              <div className="font-bold text-lg mb-2 text-rose-600">Innovation</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">We embrace change and continuously improve our services to serve you better.</div>
            </div>
          </div>
        </div>
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-rose-700 flex items-center justify-center gap-2"><Users className="w-6 h-6" /> Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Static team members */}
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-800">
              <Skeleton className="w-24 h-24 rounded-full mb-3 border-4 border-rose-600 object-cover" />
              <div className="font-bold text-lg">Nelima Sultana</div>
              <div className="text-rose-600 font-medium">Founder & CEO</div>
              <div className="text-gray-500 text-sm mt-1">20+ years in the car industry, passionate about customer satisfaction.</div>
            </div>
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-800">
              <Skeleton className="w-24 h-24 rounded-full mb-3 border-4 border-rose-600 object-cover" />
              <div className="font-bold text-lg">Fatema Begum</div>
              <div className="text-rose-600 font-medium">Chief Operating Officer</div>
              <div className="text-gray-500 text-sm mt-1">Expert in operations and logistics, ensuring smooth transactions for all customers.</div>
            </div>
            <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-800">
              <Skeleton className="w-24 h-24 rounded-full mb-3 border-4 border-rose-600 object-cover" />
              <div className="font-bold text-lg">Jamal Hossain</div>
              <div className="text-rose-600 font-medium">Sales Manager</div>
              <div className="text-gray-500 text-sm mt-1">Dedicated to helping you find the perfect car for your needs and budget.</div>
            </div>
          </div>
        </div>
        {/* Contact Info Section */}
        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-rose-700 flex items-center justify-center gap-2"><Phone className="w-6 h-6" /> Contact Us</h2>
          <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Phone className="w-5 h-5 text-rose-600" /> +44 20 3519 2700</div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Mail className="w-5 h-5 text-rose-600" /> contact@autocar.com</div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><MapPin className="w-5 h-5 text-rose-600" /> 123 Main Street, Dhaka, Bangladesh</div>
            </div>
            <div className="flex-1 text-center">
              <a href="/contact" className="inline-block bg-rose-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-rose-700 transition">Send Us a Message</a>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <ReviewsPage />
      </div>
    </section>
  );
};

export default About;
