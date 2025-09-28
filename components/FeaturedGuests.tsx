"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const guests = [
  {
    name: "Bhavana Patil",
    role: "Zumba Instructor",
    description: "Pune’s top Zumba trainer bringing high-energy dance sessions.",
    image: "https://res.cloudinary.com/dttagqqne/image/upload/v1758716443/df6fd8ff-2aed-42e7-8260-0f62057fde7c.png", // place image in public/guests
  },
  {
    name: "DJ Deepak Sadane",
    role: "DJ & Performer",
    description: "Setting the vibe with electrifying beats at the Coffee Rave.",
    image: "https://res.cloudinary.com/dttagqqne/image/upload/v1758716747/WhatsApp_Image_2025-09-24_at_17.55.27_e2e5e5fe_tkyufg.jpg",
  },
  {
    name: "Ulka Santra",
    role: "MasterChef",
    description: "Healthy gourmet experiences crafted with passion.",
    image: "/guests/ulka-santra.jpg",
  },
  {
    name: "Ulka Santra",
    role: "MasterChef",
    description: "Healthy gourmet experiences crafted with passion.",
    image: "https://res.cloudinary.com/dttagqqne/image/upload/v1758716193/Logo_options-02_zslmv1.png",
  },
   {
    name: "Ulka Santra",
    role: "MasterChef",
    description: "Healthy gourmet experiences crafted with passion.",
    image: "https://res.cloudinary.com/dttagqqne/image/upload/v1758716294/IMG_3159_yrtrcu.jpg",
  }

  
]

export default function FeaturedGuests() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Meet Our Special Guests
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Inspirational instructors, chefs, and performers joining us to make
          this event unforgettable.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {guests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-gray-50">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-28 h-28 relative rounded-full overflow-hidden mb-4 shadow-md">
                    <Image
                      src={guest.image}
                      alt={guest.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {guest.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {guest.role}
                  </p>
                  <p className="text-sm text-gray-600">{guest.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
