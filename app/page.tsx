"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Trophy, Heart, Star, ArrowRight, Phone, Mail, Globe } from "lucide-react"
import { RegistrationForm } from "@/components/registration-form"
import { EventHighlights } from "@/components/event-highlights"
import { EventSchedule } from "@/components/event-schedule"
import { PartnersSection } from "@/components/partners-section"
import { Instagram, Facebook, Twitter } from "lucide-react" 
import FeaturedGuests from "@/components/FeaturedGuests"
import Image from "next/image"
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-xl float-animation"></div>
          <div
            className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full blur-xl float-animation"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400 rounded-full blur-lg float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="mb-10"
  >
    {/* Transparent Badge */}
    <Badge className="mt-6 mb-8 text-sm sm:text-base md:text-lg px-4 py-1.5 sm:px-6 sm:py-2 bg-transparent text-primary border border-primary/30 rounded-full tracking-wide">
  First-of-its-kind in Nashik
</Badge>


    {/* Title */}
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
      <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">
        PICKLE X COFFEE
      </span>
      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent block">
        RAVE X LAUNCH BB EXPRESS
      </span>
      <span className="block mt-4 text-foreground">Fitness & Lifestyle</span>
      <span className="block text-foreground">Carnival</span>
    </h1>

    {/* Subtitle */}
    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
      Fitness • Lifestyle • Food • Community
    </p>
  </motion.div>

  {/* Event Details */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 text-base sm:text-lg"
  >
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-blue-500" />
      <span>Nashik, Maharashtra</span>
    </div>
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-orange-400" />
      <span>Oct 5, 2025</span>
    </div>
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-cyan-400" />
      <span>3:00 PM Onwards</span>
    </div>
  </motion.div>

  {/* CTA Button */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    <Button
      size="lg"
      className="text-lg px-8 py-6 neon-glow hover:scale-105 transition-all duration-300"
      onClick={scrollToRegistration}
    >
      Register Now <ArrowRight className="ml-2 w-5 h-5" />
    </Button>
  </motion.div>
</div>

      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              About the <span className="text-primary">Carnival</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed"
            >
              Join us for Nashik's most exciting fitness and lifestyle celebration! This groundbreaking event brings
              together fitness enthusiasts, food lovers, and community members for an unforgettable day of activities,
              challenges, and connections. Experience the perfect blend of high-energy workouts, culinary delights, and
              community spirit in one spectacular carnival.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Event Highlights */}
      <EventHighlights />

      {/* Event Schedule */}
      <EventSchedule />

      {/* Partners Section */}
      <PartnersSection />
      <FeaturedGuests />

      {/* Why This Event Matters */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Why This Event <span className="text-primary">Matters</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                This is more than just an event – it's a movement. As the{" "}
                <strong className="text-primary">first-of-its-kind in Nashik</strong>, we're creating a new standard for
                community wellness and lifestyle experiences.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <Card className="bg-card/80 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                    <p className="text-muted-foreground">
                      Bringing together fitness enthusiasts and lifestyle advocates
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-accent/20 hover:border-accent/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">Setting new standards for wellness events in Maharashtra</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                    <p className="text-muted-foreground">Showcasing the best in fitness, food, and lifestyle</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <span className="text-primary">Carnival</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on this historic event. Register now and be part of Nashik's fitness revolution!
            </p>
          </motion.div>
          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/80 py-12 px-4 border-t border-border">
  <div className="container mx-auto">
    <div className="grid md:grid-cols-3 gap-8 mb-8 items-center">
      
      {/* Logo & Description */}
      <div className="flex flex-col items-center md:items-start">
        <Image
          src="https://res.cloudinary.com/dttagqqne/image/upload/v1752063312/Brotein_Bistro_fcueln.png" // Replace with your logo path
          alt="Brotein Bistro Logo"
          width={150}
          height={50}
          className="mb-4"
        />
        <p className="text-muted-foreground text-center md:text-left">
          Nashik's premier fitness and lifestyle destination, bringing community together through wellness and great food.
        </p>
      </div>

      {/* Contact Info */}
      <div className="text-center md:text-left">
        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Phone className="w-4 h-4" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Mail className="w-4 h-4" />
            <span>info@broteinbistro.com</span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Globe className="w-4 h-4" />
            <span>broteinbistro.com</span>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-400 transition-colors" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 text-cyan-400 hover:text-cyan-300 transition-colors" />
          </a>
        </div>
      </div>

    </div>

    {/* Footer Bottom Text */}
    <div className="text-center pt-8 border-t border-border">
      <p className="text-muted-foreground">
        © 2025 Brotein Bistro. All rights reserved. | Fitness • Lifestyle • Community
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}
