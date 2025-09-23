"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const partners = [
  {
    category: "Fitness Partners",
    items: ["Local Gyms Consortium", "Nashik Fitness Alliance", "Yoga Studios Network"],
  },
  {
    category: "Dance & Entertainment",
    items: ["Zumba Leaders Association", "DJ Deepak Sadane", "Dance Academy Partners"],
  },
  {
    category: "Culinary Excellence",
    items: ["MasterChef Ulka Santra", "Healthy Food Network", "Nutrition Experts"],
  },
  {
    category: "Adventure Sports",
    items: ["Adventure Athletes Guild", "Outdoor Sports Community", "Extreme Sports Nashik"],
  },
  {
    category: "Media Partners",
    items: ["Fitness Influencers", "Lifestyle Bloggers", "Local Media Houses"],
  },
  {
    category: "Brand Partners",
    items: ["Decathlon", "Brotein Bistro", "Sports Equipment Brands"],
  },
]

export function PartnersSection() {
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
            Our <span className="text-cyan-400">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Collaborating with the best in fitness, lifestyle, and entertainment to create an unforgettable experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/80 border-border/50 hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <Badge
  className="mb-4 bg-transparent text-black border border-black rounded-full px-4 py-2 tracking-wider"
  style={{
    textShadow: `
      0 0 5px #ff00ff,
      0 0 10px #00ffff,
      0 0 20px #ffff00,
      0 0 30px #ff00ff,
      0 0 40px #00ffff
    `,
  }}
>
  {partner.category}
</Badge>

                  <ul className="space-y-2">
                    {partner.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
