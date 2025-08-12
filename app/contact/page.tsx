"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Header from "@/components/layout/Header";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen !bg-black !text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="md:pb-16 md:px-8 pt-28 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold font-playfair text-white mb-6">
            Get in <span className="text-primary-color">Touch</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Have questions about{" "}
            <span className="text-primary-color font-semibold">
              {process.env.NEXT_PUBLIC_BRAND_NAME}
            </span>
            ? Want to share your experience? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] order-2 lg:order-1">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-color mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#f8d87d] font-medium mb-2 text-base">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-[.5px] border-[#f8d87d] focus:border-primary-color text-base bg-black text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f8d87d] font-medium mb-2 text-base">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-[.5px] border-[#f8d87d] focus:border-primary-color text-base bg-black text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#f8d87d] font-medium mb-2 text-base">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-[.5px] border-[#f8d87d] focus:border-primary-color text-base bg-black text-white"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-[#f8d87d] font-medium mb-2 text-base">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="border-[.5px] border-[#f8d87d] focus:border-primary-color text-base bg-black text-white resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#EEFF00] hover:bg-[#f8d87d] text-black py-3 text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 order-1 lg:order-2">
              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-primary-color mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Email
                        </p>
                        <p className="text-[#EEFF00] text-base break-all">
                          support@{process.env.NEXT_PUBLIC_BRAND_NAME}.in
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Phone
                        </p>
                        <p className="text-[#EEFF00] text-base">
                          +91 93183 67696
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Address
                        </p>
                        <p className="text-[#EEFF00] text-base">
                          123 Organic Street
                          <br />
                          Mumbai, Maharashtra 400001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Business Hours
                        </p>
                        <p className="text-[#EEFF00] text-base">
                          Mon-Fri: 9:00 AM - 6:00 PM IST
                          <br />
                          Sat: 10:00 AM - 4:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-primary-color mb-4">
                    Follow Us
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[.5px] border-[#f8d87d] text-[#f8d87d] hover:bg-[#222] bg-transparent text-base py-2 px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                    >
                      <Instagram className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[.5px] border-[#f8d87d] text-[#f8d87d] hover:bg-[#222] bg-transparent text-base py-2 px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                    >
                      <Facebook className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[.5px] border-[#f8d87d] text-[#f8d87d] hover:bg-[#222] bg-transparent text-base py-2 px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                    >
                      <Twitter className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Twitter</span>
                    </Button>
                  </div>
                  <p className="text-primary-color mt-4 text-base">
                    Follow us for recipes, health tips, and behind-the-scenes
                    content!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[.5px] border-[#f8d87d] bg-[#181818]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-primary-color mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-[#f8d87d] text-base mb-1">
                        How long does shipping take?
                      </p>
                      <p className="text-[#EEFF00] text-base">
                        We ship within 2-3 business days. Delivery takes 3-7
                        days depending on location.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[#f8d87d] text-base mb-1">
                        What's the shelf life?
                      </p>
                      <p className="text-[#EEFF00] text-base">
                        {process.env.NEXT_PUBLIC_BRAND_NAME} stays fresh for 12
                        months when stored properly in a cool, dry place.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[#f8d87d] text-base mb-1">
                        Do you offer bulk orders?
                      </p>
                      <p className="text-[#EEFF00] text-base">
                        Yes! Contact us for special pricing on orders of 10+
                        jars.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#181818] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-playfair">
            Haven't Tried {process.env.NEXT_PUBLIC_BRAND_NAME} Yet?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference that premium ingredients make
          </p>
          <Link href="/buy-now">
            <Button
              size="lg"
              className="bg-[#EEFF00] text-black px-8 py-3 text-lg"
            >
              Order Your First Jar
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
