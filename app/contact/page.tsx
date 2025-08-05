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

import Head from "next/head";
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
    <>
      <Head>
        <title>Contact Penova | Healthy Peanut Butter Brand India</title>
        <meta
          name="description"
          content="Contact Penova for queries about our premium healthy peanut butter and nuts butter. Get in touch for support, bulk orders, or feedback."
        />
        <meta
          name="keywords"
          content="contact penova, peanut butter support, healthy peanut butter India, penova contact, nuts butter customer service"
        />
        <link
          rel="canonical"
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
            "/contact"
          }
        />
        {/* Contact Page Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Penova",
              description:
                "Contact Penova for queries about our premium healthy peanut butter and nuts butter. Get in touch for support, bulk orders, or feedback.",
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || "https://penova.in") +
                "/contact",
              publisher: {
                "@type": "Organization",
                name: process.env.NEXT_PUBLIC_BRAND_NAME || "Penova",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="py-12 pt-24 md:pt-24 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-secondary-color mb-4 sm:mb-6">
              Get in <span className="text-primary-color">Touch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-secondary-color max-w-3xl mx-auto leading-relaxed px-2">
              Have questions about{" "}
              <span className="text-primary-color font-semibold">
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
              ? Want to share your experience? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="md:-mt-16 md:pb-12 pt-2 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <Card className="border-[.1px] border-primary-color order-2 lg:order-1">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-secondary-color mb-4 sm:mb-6">
                    Send us a Message
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-secondary-color font-medium mb-2 text-sm sm:text-base">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-[.1px] border-primary-color focus:border-primary-color text-sm sm:text-base"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-secondary-color font-medium mb-2 text-sm sm:text-base">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-[.1px] border-primary-color focus:border-primary-color text-sm sm:text-base"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-secondary-color font-medium mb-2 text-sm sm:text-base">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-[.1px] border-primary-color focus:border-primary-color text-sm sm:text-base"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-secondary-color font-medium mb-2 text-sm sm:text-base">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="border-[.1px] border-primary-color focus:border-primary-color text-sm sm:text-base resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ff0000] hover:bg-[#b82b2b] text-white py-3 text-sm sm:text-base"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <Card className="border-[.1px] border-primary-color">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-secondary-color mb-3 sm:mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start sm:items-center space-x-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-color mt-1 sm:mt-0 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-secondary-color text-sm sm:text-base">
                            Email
                          </p>
                          <p className="text-[#bd0000] text-sm sm:text-base break-all">
                            support@{process.env.NEXT_PUBLIC_BRAND_NAME}.in
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start sm:items-center space-x-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-color mt-1 sm:mt-0 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-secondary-color text-sm sm:text-base">
                            Phone
                          </p>
                          <p className="text-[#bd0000] text-sm sm:text-base">
                            +91 93183 67696
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-color mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-secondary-color text-sm sm:text-base">
                            Address
                          </p>
                          <p className="text-[#bd0000] text-sm sm:text-base">
                            123 Organic Street
                            <br />
                            Mumbai, Maharashtra 400001
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-color mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-secondary-color text-sm sm:text-base">
                            Business Hours
                          </p>
                          <p className="text-[#bd0000] text-sm sm:text-base">
                            Mon-Fri: 9:00 AM - 6:00 PM IST
                            <br />
                            Sat: 10:00 AM - 4:00 PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[.1px] border-primary-color">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-secondary-color mb-3 sm:mb-4">
                      Follow Us
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[.1px] border-primary-color text-secondary-color hover:bg-red-50 bg-transparent text-sm sm:text-base py-2 px-3 sm:px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                      >
                        <Instagram className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Instagram</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[.1px] border-primary-color text-secondary-color hover:bg-red-50 bg-transparent text-sm sm:text-base py-2 px-3 sm:px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                      >
                        <Facebook className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[.1px] border-primary-color text-secondary-color hover:bg-red-50 bg-transparent text-sm sm:text-base py-2 px-3 sm:px-4 flex-1 sm:flex-none justify-start sm:justify-center"
                      >
                        <Twitter className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Twitter</span>
                      </Button>
                    </div>
                    <p className="text-primary-color mt-3 sm:mt-4 text-sm">
                      Follow us for recipes, health tips, and behind-the-scenes
                      content!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[.1px] border-primary-color">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-secondary-color mb-3 sm:mb-4">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-secondary-color text-sm sm:text-base mb-1">
                          How long does shipping take?
                        </p>
                        <p className="text-[#bd0000] text-sm">
                          We ship within 2-3 business days. Delivery takes 3-7
                          days depending on location.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-color text-sm sm:text-base mb-1">
                          What's the shelf life?
                        </p>
                        <p className="text-[#bd0000] text-sm">
                          {process.env.NEXT_PUBLIC_BRAND_NAME} stays fresh for
                          12 months when stored properly in a cool, dry place.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-color text-sm sm:text-base mb-1">
                          Do you offer bulk orders?
                        </p>
                        <p className="text-[#bd0000] text-sm">
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
        <section className="py-12 sm:py-16 md:py-20 bg-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-playfair">
              Haven't Tried {process.env.NEXT_PUBLIC_BRAND_NAME} Yet?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2">
              Experience the difference that premium ingredients make
            </p>
            <Link href="/buy-now">
              <Button
                size="lg"
                className="bg-white text-red-900 hover:bg-gray-100 px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs mx-auto"
              >
                Order Your First Jar
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
