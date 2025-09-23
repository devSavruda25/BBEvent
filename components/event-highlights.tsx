"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Music, Coffee, ChefHat, Camera, Dumbbell, Users, Target } from "lucide-react"

const highlights = [
  {
    icon: Trophy,
    title: "Pickleball & Fitness Challenges",
    description: "Competitive tournaments and fitness challenges for all skill levels",
    color: "text-primary",
  },
  {
    icon: Music,
    title: "Zumba & Dance Energy Hours",
    description: "High-energy dance sessions led by certified instructors",
    color: "text-pink-400",
  },
  {
    icon: Target,
    title: "Adventure Athlete Showcases",
    description: "Watch elite athletes demonstrate their skills and techniques",
    color: "text-cyan-400",
  },
  {
    icon: ChefHat,
    title: "Culinary Experience",
    description: "MasterChef Ulka Santra presents healthy gourmet experiences",
    color: "text-orange-400",
  },
  {
    icon: Coffee,
    title: "Coffee Rave with DJ",
    description: "DJ Deepak Sadane brings the beats to our coffee experience",
    color: "text-yellow-400",
  },
  {
    icon: Camera,
    title: "Media & Influencers",
    description: "Connect with fitness influencers and lifestyle content creators",
    color: "text-purple-400",
  },
  {
    icon: Users,
    title: "Co-branded Activations",
    description: "Exclusive experiences with Decathlon and Brotein Bistro",
    color: "text-green-400",
  },
  {
    icon: Dumbbell,
    title: "Fitness Equipment Demos",
    description: "Try the latest fitness equipment and get expert guidance",
    color: "text-red-400",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function EventHighlights() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Event <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Experience an incredible variety of activities designed to energize, inspire, and connect our community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((highlight, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <highlight.icon
                      className={`w-12 h-12 mx-auto ${highlight.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-balance">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
