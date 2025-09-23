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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-6 text-lg px-6 py-2 bg-primary/20 text-primary border-primary/30">
              First-of-its-kind in Nashik
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent">
                PICKLE X COFFEE  RAVE X LAUNCH BB EXPRESS
              </span>
              <br />
              <span className="text-foreground">Fitness & Lifestyle</span>
              <br />
              <span className="text-foreground">Carnival</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Fitness • Lifestyle • Food • Community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Nashik, Maharashtra</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-accent" />
              <span>Oct 5, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>3:00 PM - 9:00 PM</span>
            </div>
          </motion.div>

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
              Why This Event <span className="text-accent">Matters</span>
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
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                    <p className="text-muted-foreground">
                      Bringing together fitness enthusiasts and lifestyle advocates
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-accent/20 hover:border-accent/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 text-accent mx-auto mb-4" />
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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Brotein Bistro</h3>
              <p className="text-muted-foreground mb-4">
                Nashik's premier fitness and lifestyle destination, bringing community together through wellness and
                great food.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@broteinbistro.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>broteinbistro.com</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-cyan-400 hover:text-black bg-transparent">
                  Twitter
                </Button>
              </div>
            </div>
          </div>
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
