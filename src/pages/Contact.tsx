/* eslint-disable @typescript-eslint/no-explicit-any */

import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/image/logo-light.png";
// import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Contact = () => {
  const handleSend = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.text.value;
    // console.log(email, name, text);
    const contactData = { email, name, text };

    if (contactData) {
      toast("Event has been created.");

      console.log(contactData);
      form.reset();
    }
  };

  return (
    <div className="container">
      <div className="mt-10 p-5 flex flex-col md:flex-row max-w-5xl mx-auto text-black ">
        <div className=" md:w-1/2">
          <div className="flex items-center mb-4">
            <img src={logo} alt="" className="w-16" />
            <h2 className="text-red-700 text-2xl  font-semibold ml-3">
              Auto Car
            </h2>
          </div>
          <h2 className="text-2xl font-semibold  mb-3">Contact Information</h2>
          <hr className="w-32 " />
          <h2 className="text-2xl font-semibold">+44 20 3519 2700</h2>

          <h2 className="text-2xl font-semibold">contact@autocar.com</h2>
          <div className="flex items-center ">
            <p className="text-base mb-3">
              Send us an email or use contact form
            </p>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 md:ml-20">
          <h2 className="text-2xl font-semibold ">SEND US A MESSAGE</h2>
          <hr className="w-52 " />
          <form onSubmit={handleSend} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Name</span>
              </label>
              <Input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="border border-black p-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                className="border w-full border-black p-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <Textarea
                className="border border-black p-2"
                id="text"
                name="text"
              ></Textarea>
            </div>
            <div className="form-control mt-6">
              <Input
                type="submit"
                value="Send"
                className="btn cursor-pointer bg-black text-white hover:bg-slate-700"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
