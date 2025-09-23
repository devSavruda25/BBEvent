"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const schedule = [
  {
    time: "3:00 PM",
    title: "Registration & Welcome",
    description: "Check-in, welcome drinks, and event orientation",
    type: "arrival",
  },
  {
    time: "3:30 PM",
    title: "Warm-up Sessions",
    description: "Group warm-up activities led by certified trainers",
    type: "fitness",
  },
  {
    time: "4:00 PM",
    title: "Zumba Energy Hour",
    description: "High-energy Zumba session with live music",
    type: "dance",
  },
  {
    time: "5:00 PM",
    title: "Pickleball Tournament",
    description: "Competitive pickleball matches for all skill levels",
    type: "sports",
  },
  {
    time: "6:00 PM",
    title: "Culinary Experience",
    description: "MasterChef Ulka Santra's healthy gourmet showcase",
    type: "food",
  },
  {
    time: "7:00 PM",
    title: "Adventure Athlete Showcase",
    description: "Elite athletes demonstrate skills and techniques",
    type: "showcase",
  },
  {
    time: "8:00 PM",
    title: "Coffee Rave",
    description: "DJ Deepak Sadane brings the beats to coffee time",
    type: "entertainment",
  },
  {
    time: "9:00 PM",
    title: "Closing Ceremony",
    description: "Awards, networking, and event wrap-up",
    type: "closing",
  },
]

const getTypeColor = (type: string) => {
  const colors = {
    arrival: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    fitness: "bg-primary/20 text-primary border-primary/30",
    dance: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    sports: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    food: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    showcase: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    entertainment: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    closing: "bg-red-500/20 text-red-400 border-red-500/30",
  }
  return colors[type as keyof typeof colors] || colors.fitness
}

export function EventSchedule() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Event <span className="text-primary">Schedule</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A carefully curated timeline of activities designed to maximize your carnival experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-cyan-400"></div>

            <div className="space-y-8">
              {schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-card/80 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <Badge className={`text-sm font-semibold ${getTypeColor(item.type)}`}>{item.time}</Badge>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
