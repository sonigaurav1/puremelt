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
import { PHONE_NUMBER } from "@/constant";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (response.ok) {
        setSuccess("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Sorry, there was an error sending your message. Please try again later.");
      }
    } catch (error) {
      setError("Sorry, there was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
      <Header bgColor="bg-black" textColor="text-white" />

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
            <Card className="border-[.5px] border-[#f8d87d] bg-[#181818] order-2 lg:order-2 md:max-h-max">
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
                      disabled={isSubmitting}
                      className={`w-full bg-[#EEFF00] hover:bg-[#f8d87d] text-black py-3 text-lg flex items-center justify-center ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          <span className="font-semibold tracking-wide animate-pulse">Sending...</span>
                        </span>
                      ) : error ? (
                        <span className="flex items-center text-red-600">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          {error}
                        </span>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    {success && (
                      <AlertDialog open={!!success} onOpenChange={() => setSuccess(null)}>
                        <AlertDialogContent className="bg-[#181818] border-[.5px] border-[#f8d87d] md:max-w-max text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-primary-color">Message Sent!</AlertDialogTitle>
                            <AlertDialogDescription className="text-[#EEFF00]">
                              {success}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              onClick={() => setSuccess(null)}
                              className="bg-[#EEFF00] mx-auto text-black hover:bg-[#f8d87d] border-none"
                            >
                              OK
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
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
                        <Link
                          href={`mailto:support@${process.env.NEXT_PUBLIC_BRAND_NAME?.toLowerCase()}.in`}
                          className="text-[#EEFF00] text-base break-all"
                        >
                          support@
                          {process.env.NEXT_PUBLIC_BRAND_NAME?.toLowerCase()}.in
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Phone
                        </p>
                        <Link href={`tel:${PHONE_NUMBER}`} className="text-[#EEFF00] text-base break-all">
                          {PHONE_NUMBER}
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-color mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f8d87d] text-base">
                          Address
                        </p>
                        <Link
                          href="https://www.google.com/maps/search/?api=1&query=Humayunpur,+Safdarjung,+South+Delhi,+India,+110029"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#EEFF00] text-base"
                        >
                          Humayunpur, Safdarjung
                          <br />
                          South Delhi, India, 110029
                        </Link>
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
