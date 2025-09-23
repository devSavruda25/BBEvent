"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2 } from "lucide-react"

type AttendeeField = "name" | "email" | "phone" | "interests";
type Attendee = { name: string; email: string; phone: string; interests: string };

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [numAttendees, setNumAttendees] = useState("1")
  const [organization, setOrganization] = useState("")
  const [attendees, setAttendees] = useState<Attendee[]>([
    { name: "", email: "", phone: "", interests: "" },
  ])

  useEffect(() => {
    const count = numAttendees === "5+" ? 5 : parseInt(numAttendees)
    setAttendees((prev) => {
      const newArray = [...prev]
      while (newArray.length < count) {
        newArray.push({ name: "", email: "", phone: "", interests: "" })
      }
      return newArray.slice(0, count)
    })
  }, [numAttendees])

  const handleAttendeeChange = (index: number, field: AttendeeField, value: string) => {
    setAttendees((prev) => {
      const newArr = [...prev]
      newArr[index][field] = value
      return newArr
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const attendeesWithInterests = attendees.map((a) => ({
        ...a,
        interests: a.interests ? a.interests.split(",").map((i) => i.trim()) : [],
        source: "Website Form",
      }))

      const payload = {
        organization: organization || undefined,
        attendees: attendeesWithInterests,
      }

      console.log("Submitting payload:", payload)

      const res = await fetch("https://bbe-cpv1.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to register")

      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto pointer-events-auto"
      >
        <Card className="bg-card/80 border-primary/30 text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for registering! Tickets have been sent to all attendees’ emails.
            </p>
            <p className="text-sm text-primary font-semibold">See you at the carnival! 🎉</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto pointer-events-auto"
    >
      <div className="overflow-auto p-4">
        <Card className="bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register for the Carnival</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organization">Community/Organization (Optional)</Label>
                <Input
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g., Local Gym, Fitness Club, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendees">Number of Attendees</Label>
                <Select
                  value={numAttendees}
                  onValueChange={(v) => {
                    console.log("Select changed:", v)
                    setNumAttendees(v)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5+">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {attendees.map((a, i) => (
                <div key={i} className="p-4 border rounded-md space-y-4">
                  <h4 className="font-semibold">Attendee {i + 1}</h4>
                  <Input
                    placeholder="Full Name *"
                    value={a.name}
                    onChange={(e) => handleAttendeeChange(i, "name", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Email Address *"
                    type="email"
                    value={a.email}
                    onChange={(e) => handleAttendeeChange(i, "email", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Phone Number *"
                    type="tel"
                    value={a.phone}
                    onChange={(e) => handleAttendeeChange(i, "phone", e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Interests (comma-separated, optional)"
                    value={a.interests}
                    onChange={(e) => handleAttendeeChange(i, "interests", e.target.value)}
                  />
                </div>
              ))}

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}




