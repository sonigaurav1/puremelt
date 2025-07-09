"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/layout/Header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Have questions about PureMelt? Want to share your experience? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-amber-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-900 font-medium mb-2">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-amber-200 focus:border-amber-600"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-amber-900 font-medium mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-amber-200 focus:border-amber-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-amber-900 font-medium mb-2">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-900 font-medium mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-amber-200 focus:border-amber-600"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Email</p>
                        <p className="text-amber-700">support@puremelt.in</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Phone</p>
                        <p className="text-amber-700">+91 93183 67696</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Address</p>
                        <p className="text-amber-700">
                          123 Organic Street
                          <br />
                          Mumbai, Maharashtra 400001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Business Hours</p>
                        <p className="text-amber-700">
                          Mon-Fri: 9:00 AM - 6:00 PM IST
                          <br />
                          Sat: 10:00 AM - 4:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 text-amber-900 hover:bg-amber-50 bg-transparent"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 text-amber-900 hover:bg-amber-50 bg-transparent"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 text-amber-900 hover:bg-amber-50 bg-transparent"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                  </div>
                  <p className="text-amber-700 mt-4 text-sm">
                    Follow us for recipes, health tips, and behind-the-scenes content!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-amber-900">How long does shipping take?</p>
                      <p className="text-amber-700 text-sm">
                        We ship within 2-3 business days. Delivery takes 3-7 days depending on location.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">What's the shelf life?</p>
                      <p className="text-amber-700 text-sm">
                        PureMelt stays fresh for 12 months when stored properly in a cool, dry place.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">Do you offer bulk orders?</p>
                      <p className="text-amber-700 text-sm">
                        Yes! Contact us for special pricing on orders of 10+ jars.
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
      <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Haven't Tried PureMelt Yet?</h2>
          <p className="text-xl mb-8 opacity-90">Experience the difference that premium ingredients make</p>
          <Link href="/buy-now">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3">
              Order Your First Jar
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
