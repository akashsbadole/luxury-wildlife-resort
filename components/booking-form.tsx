"use client"

import { useState, type CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { DayPicker, type DateRange } from "react-day-picker"
import { differenceInCalendarDays } from "date-fns"
import { Loader2, Minus, Plus, CalendarDays, Users, BedDouble } from "lucide-react"
import "react-day-picker/dist/style.css"

const suites = [
  { value: "treehouse", label: "Luxury Treehouse" },
  { value: "safari-tent", label: "Safari Tent" },
  { value: "forest-villa", label: "Forest Villa" },
] as const

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [range, setRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState(2)
  const [suite, setSuite] = useState<string>(suites[0].value)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0

  const onSubmit = async (data: FormData) => {
    if (!range?.from || !range?.to) {
      setSubmitStatus("error")
      return
    }
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          checkIn: range.from.toISOString(),
          checkOut: range.to.toISOString(),
          guests,
          suite,
        }),
      })
      if (!response.ok) throw new Error("Failed to submit")
      setSubmitStatus("success")
      reset()
      setRange(undefined)
      setGuests(2)
      setSuite(suites[0].value)
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="b-name" className="block text-sm font-medium text-forest mb-2">
              Name
            </label>
            <input
              {...register("name")}
              id="b-name"
              className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="b-email" className="block text-sm font-medium text-forest mb-2">
              Email
            </label>
            <input
              {...register("email")}
              id="b-email"
              type="email"
              className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="b-phone" className="block text-sm font-medium text-forest mb-2">
              Phone
            </label>
            <input
              {...register("phone")}
              id="b-phone"
              type="tel"
              className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
              placeholder="Your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="b-suite" className="block text-sm font-medium text-forest mb-2">
              Suite
            </label>
            <select
              id="b-suite"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
              className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
            >
              {suites.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-forest mb-2">
            Guests
          </span>
          <div className="inline-flex items-center gap-4 bg-cream border border-border-warm rounded-lg px-4 py-2">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gold-tint text-forest hover:bg-gold hover:text-linen transition-colors duration-300"
              aria-label="Decrease guests"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium text-bark">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(12, g + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gold-tint text-forest hover:bg-gold hover:text-linen transition-colors duration-300"
              aria-label="Increase guests"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="b-message" className="block text-sm font-medium text-forest mb-2">
            Special Requests <span className="text-bark-muted">(optional)</span>
          </label>
          <textarea
            {...register("message")}
            id="b-message"
            rows={3}
            className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300 resize-none"
            placeholder="Anniversary, dietary needs, early check-in…"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 btn-gold disabled:bg-cream-warm disabled:text-bark-muted rounded-full transition-all duration-300 font-medium flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending…
            </>
          ) : (
            "Request Reservation"
          )}
        </button>

        {submitStatus === "success" && (
          <p className="mt-2 text-forest text-center font-medium">
            Thank you! Your reservation request has been sent. Our team will be in
            touch shortly.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="mt-2 text-red-600 text-center">
            {!range?.from || !range?.to
              ? "Please select your check-in and check-out dates."
              : "Sorry, there was an error. Please try again."}
          </p>
        )}
      </form>

      <div className="bg-cream-warm rounded-2xl p-6 border border-gold/20 shadow-lg">
        <div className="flex items-center gap-2 text-forest mb-4">
          <CalendarDays className="w-5 h-5" />
          <h3 className="font-serif text-lg font-semibold">Your Stay</h3>
        </div>
        <div
          className="rdp-earthy overflow-hidden rounded-xl"
          style={
            {
              "--rdp-accent-color": "#a4793f",
              "--rdp-accent-background-color": "#f5e9d4",
              "--rdp-today-color": "#2d5a27",
            } as CSSProperties
          }
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={{ before: new Date() }}
            numberOfMonths={1}
            className="mx-auto"
          />
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-bark-muted flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> Suite
            </dt>
            <dd className="text-bark font-medium">
              {suites.find((s) => s.value === suite)?.label}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-bark-muted flex items-center gap-2">
              <Users className="w-4 h-4" /> Guests
            </dt>
            <dd className="text-bark font-medium">{guests}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border-warm/40 pt-3">
            <dt className="text-bark-muted">Nights</dt>
            <dd className="text-forest font-serif text-lg font-semibold">
              {nights || "—"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
