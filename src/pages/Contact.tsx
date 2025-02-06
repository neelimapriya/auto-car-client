/* eslint-disable @typescript-eslint/no-explicit-any */

import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/image/logo-light.png";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


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
      <h2 className="text-center text-2xl font-bold">Contact Us</h2>
      <hr  className="pb-5"/>
      <div className="p-6 flex flex-col md:flex-row max-w-5xl mx-auto text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="md:w-1/2 p-5">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Auto Car Logo" className="w-16" />
            <h2 className="text-rose-700 dark:text-rose-400 text-2xl font-semibold ml-3">Auto Car</h2>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
          <hr className="w-32 border-rose-500" />
          <h2 className="text-xl font-medium mt-2">+44 20 3519 2700</h2>
          <h2 className="text-xl font-medium">contact@autocar.com</h2>
          <p className="text-base mt-3">Send us an email or use the contact form below.</p>
        </div>

        <div className="md:w-1/2 p-5">
          <h2 className="text-2xl font-semibold">SEND US A MESSAGE</h2>
          <hr className="w-52 border-rose-500" />
          <form onSubmit={handleSend} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Name</label>
              <Input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-900 dark:text-gray-100">Message</label>
              <Textarea
                className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md"
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
     
    </div>
  );
};

export default Contact;
