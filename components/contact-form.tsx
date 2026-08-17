"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-forest mb-2"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-forest mb-2"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-forest mb-2"
        >
          Phone
        </label>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300"
          placeholder="Your phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-forest mb-2"
        >
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className="w-full bg-cream border border-border-warm rounded-lg px-4 py-3 text-bark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300 resize-none"
          placeholder="Your message"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 btn-gold disabled:bg-cream-warm disabled:text-bark-muted rounded-full transition-all duration-300 font-medium flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {submitStatus === "success" && (
          <p className="mt-3 text-forest text-center font-medium">
            Thank you! Your message has been sent successfully.
          </p>
        )}

        {submitStatus === "error" && (
          <p className="mt-3 text-red-600 text-center">
            Sorry, there was an error sending your message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
