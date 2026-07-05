"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ANALYTICS_EVENTS,
  analyticsEventAttributes,
  trackAnalyticsEvent,
} from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  productType: z.string().min(1, "Please select a product type"),
  quantity: z.string().min(1, "Estimated quantity is required"),
  message: z.string().min(10, "Please provide some project details"),
});

type FormData = z.infer<typeof schema>;

const productTypes = [
  "Precision Laser Engraving",
  "3D Printing / Design Services",
  "Custom Design & Production",
  "Branded Drinkware",
  "Awards & Recognition",
  "Corporate Gifts",
  "Fundraiser Items",
  "Laser Cutting",
  "Other",
];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) {
        setStatus("error");
        return;
      }

      trackAnalyticsEvent(ANALYTICS_EVENTS.quoteFormSubmit, {
        productType: data.productType,
        quantity: data.quantity,
      });

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          _replyto: data.email,
          _subject: `St. Louis Creations quote request: ${data.productType}`,
          source: "stlouiscreations.com/contact",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-background border border-white/10 px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors";
  const productTypeField = register("productType");

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-primary/20 p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">Quote Request Sent!</h3>
          <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-primary text-sm font-display uppercase tracking-wider hover:underline"
          >
            Send Another Request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <input
                {...register("name")}
                placeholder="Your Name *"
                className={cn(inputClasses, errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("company")}
                placeholder="Company Name *"
                className={cn(inputClasses, errors.company && "border-red-500")}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address *"
                className={cn(inputClasses, errors.email && "border-red-500")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone (Optional)"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="relative">
                <select
                  {...productTypeField}
                  {...analyticsEventAttributes(ANALYTICS_EVENTS.quoteProductTypeSelect)}
                  onChange={(event) => {
                    productTypeField.onChange(event);
                    trackAnalyticsEvent(ANALYTICS_EVENTS.quoteProductTypeSelect, {
                      productType: event.target.value,
                    });
                  }}
                  className={cn(
                    inputClasses,
                    "appearance-none pr-10",
                    errors.productType && "border-red-500"
                  )}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Product Type *
                  </option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              {errors.productType && (
                <p className="text-red-500 text-xs mt-1">{errors.productType.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("quantity")}
                placeholder="Estimated Quantity *"
                className={cn(inputClasses, errors.quantity && "border-red-500")}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              {...register("message")}
            placeholder="Tell us about the idea, material, quantity, deadline, and intended use *"
              rows={5}
              className={cn(
                inputClasses,
                "resize-none",
                errors.message && "border-red-500"
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm">
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            {...analyticsEventAttributes(ANALYTICS_EVENTS.quoteFormSubmit)}
            className="w-full px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Submit Fabrication Quote"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
