/* eslint-disable @typescript-eslint/no-explicit-any */

import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/image/logo-light.png";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LucideFacebook, LucideInstagram, LucideTwitter, MapPin, Clock, Mail, Phone, HelpCircle } from "lucide-react";


const Contact = () => {
  const handleSend = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.text.value;
    const contactData = { email, name, text };

    if (contactData) {
      toast("Message has been sent.");
      console.log(contactData);
      form.reset();
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-2 text-rose-700">Contact Us</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">We'd love to hear from you! Reach out for any questions, support, or feedback. Our team is here to help you find your perfect car or resolve any issues.</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {/* Contact Info */}
        <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-4 justify-between">
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Auto Car Logo" className="w-16" />
              <h2 className="text-rose-700 dark:text-rose-400 text-2xl font-semibold ml-3">Auto Car</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2"><Phone className="w-5 h-5 text-rose-600" /> +44 20 3519 2700</div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2"><Mail className="w-5 h-5 text-rose-600" /> contact@autocar.com</div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2"><MapPin className="w-5 h-5 text-rose-600" /> 123 Main Street, Dhaka, Bangladesh</div>
          </div>
          {/* Business Hours */}
          <div className="mt-4">
            <div className="flex items-center gap-2 font-semibold text-rose-700 mb-1"><Clock className="w-5 h-5" /> Business Hours</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              <div>Mon - Fri: 9:00 AM - 7:00 PM</div>
              <div>Saturday: 10:00 AM - 5:00 PM</div>
              <div>Sunday: Closed</div>
            </div>
          </div>
          {/* Social Links */}
          <div className="mt-4">
            <div className="font-semibold text-rose-700 mb-1">Follow Us</div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-rose-600 transition"><LucideFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-rose-600 transition"><LucideTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-rose-600 transition"><LucideInstagram size={24} /></a>
            </div>
          </div>
        </div>
        {/* Map Section */}
        <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
          <div className="font-semibold text-rose-700 mb-2 flex items-center gap-2"><MapPin className="w-5 h-5" /> Our Location</div>
          <div className="w-full h-56 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 mb-2">
            <iframe
              title="Auto Car Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.964073964479!2d90.4264126!3d23.765919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7006a7300bf%3A0x76e15c050039502!2sAuto%20Trade%20Corporation!5e0!3m2!1sen!2sbd!4v1718030000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Visit our showroom: Plot 15, Road 7, Block C, Banasree, Rampura, Dhaka 1219, Bangladesh. Parking available for customers.</div>
        </div>
        {/* Contact Form */}
        <div className="bg-white dark:bg-black/40 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-2 text-rose-700">Send Us a Message</h2>
          <hr className="w-32 border-rose-500 mb-4" />
          <form onSubmit={handleSend} className="space-y-4">
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Name</label>
              <Input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="border p-2 bg-white dark:bg-black/60 text-gray-900 dark:text-gray-100 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border p-2 bg-white dark:bg-black/60 text-gray-900 dark:text-gray-100 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Message</label>
              <Textarea
                className="border p-2 bg-white dark:bg-black/60 text-gray-900 dark:text-gray-100 rounded-md"
                id="text"
                name="text"
                placeholder="Your message..."
                required
              ></Textarea>
            </div>
            <div className="form-control mt-4">
              <Input
                type="submit"
                value="Send"
                className="cursor-pointer bg-rose-600 dark:bg-rose-500 text-white font-medium px-6 py-2 rounded-md hover:bg-rose-700 dark:hover:bg-rose-600 transition"
              />
            </div>
          </form>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-rose-700 flex items-center justify-center gap-2"><HelpCircle className="w-6 h-6" /> Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">How do I schedule a test drive?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">You can schedule a test drive by contacting us via phone, email, or the contact form above. Our team will arrange a convenient time for you.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">What documents do I need to bring?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Please bring a valid driver's license and proof of identification. For purchases, additional documents may be required.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Do you offer financing options?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Yes, we offer flexible financing options. Contact us for more details and eligibility requirements.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Can I trade in my old car?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Absolutely! We accept trade-ins. Bring your car for an evaluation and we’ll offer you a fair price toward your next purchase.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Are all cars inspected before sale?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Yes, every car undergoes a thorough inspection and certification process to ensure quality and reliability.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Do you provide after-sales support?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">We offer after-sales support and warranty options for your peace of mind. Contact us for details on coverage and terms.</div>
          </div>
          <div className="bg-white dark:bg-black/40 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Can I reserve a car online?</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Yes, you can reserve a car online through our website or by contacting our sales team directly.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
