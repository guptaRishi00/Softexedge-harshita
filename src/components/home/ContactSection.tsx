"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NO_ENTRY, useIsDesktop, useIsMobile } from "@/lib/useIsDesktop";
import ChannelCard from "./ChannelCard";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const rotatingWords = ["the future", "your vision", "next gen", "together"];

const channels = [
  {
    label: "Email",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
    Icon: Mail,
    colSpan: "sm:col-span-2",
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    Icon: Phone,
    colSpan: "sm:col-span-1",
  },
  {
    label: "Studio",
    value: "San Francisco",
    // Was `#location`, which matched no element on any page — the tap did
    // nothing. There is no location/map section to anchor to, so this points at
    // the contact page rather than inventing a maps URL for an address the
    // site does not state.
    href: "/contact",
    Icon: MapPin,
    colSpan: "sm:col-span-1",
  },
];

// NOTE: the 16px font size (`text-base`) is deliberately NOT reduced on mobile.
// iOS Safari auto-zooms the viewport when a focused input's font-size is below
// 16px, so shrinking it would make every field jump the page on tap. The mobile
// size reduction comes from the padding instead.
const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white transition-all placeholder:text-zinc-500 max-md:rounded-xl max-md:px-4 max-md:py-3 focus:border-[#2E5BFF]/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#2E5BFF]/20";

const GRID_COLUMNS = 8;

export default function ContactSection() {
  const isDesktop = useIsDesktop();
  // Entry animations are desktop-only; below md they land instantly (NO_ENTRY).
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [scheduledDateTime, setScheduledDateTime] = useState({
    date: "",
    time: "",
  });

  const dateOptions = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      value,
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  const timeOptions = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
  const timeZone = mounted
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "Local time";
  const selectedDateLabel = scheduledDateTime.date
    ? new Date(`${scheduledDateTime.date}T12:00:00`).toLocaleDateString(
        "en-US",
        { weekday: "long", month: "long", day: "numeric" },
      )
    : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // No tick below md: `index` only feeds the desktop AnimatePresence branch
    // (mobile renders the static word), so the interval re-rendered this whole
    // section every 6s to swap a value nothing reads — the same dead tick
    // BlogSection's rotator already gates out.
    if (!isDesktop) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isDesktop]);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-black py-16 max-md:pb-20 max-md:pt-20 md:pt-32 md:pb-32"
    >
      <div className="relative z-10 mx-auto w-full px-4 max-md:px-3 md:px-10">
        <div className="grid grid-cols-1 gap-16 max-md:gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 40 } : false}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-100px" }}
            transition={
              isMobile ? NO_ENTRY : { duration: 0.8, ease: premiumEase }
            }
            className="flex flex-col lg:col-span-5 lg:pr-8"
          >
            <motion.div
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile ? NO_ENTRY : { duration: 0.6, ease: premiumEase }
              }
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-400 font-medium max-md:mb-6 max-md:text-xs"
            >
              Get in touch
            </motion.div>

            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.1, ease: premiumEase }
              }
              className="text-6xl font-bold tracking-tight text-white max-md:text-[2.5rem] md:text-5xl lg:text-[64px] leading-[0.9em]"
            >
              Let&apos;s build <br />
              <span className="inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                {isDesktop ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      // Same swap BlogSection uses now: plain fade in
                      // place, no travel.
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.9, ease: "easeInOut" },
                      }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                      className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r pb-3 from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent"
                    >
                      {rotatingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r pb-3 from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent">
                    {rotatingWords[0]}
                  </span>
                )}
              </span>
            </motion.h2>

            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.2, ease: premiumEase }
              }
              className="mt-6 text-lg font-light leading-[1.25em] text-white max-md:mt-6 max-md:text-lg"
            >
              Ready to redefine the standard? Whether you have a specific
              project in mind or just want to explore possibilities, our team is
              ready to collaborate
            </motion.p>

            <div className="mt-12 grid grid-cols-1 gap-4 max-md:mt-10 max-md:gap-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <ChannelCard key={channel.label} {...channel} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={isDesktop ? { opacity: 0, y: 40 } : false}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-100px" }}
            transition={
              isMobile
                ? NO_ENTRY
                : { duration: 0.8, delay: 0.1, ease: premiumEase }
            }
            className="lg:col-span-7"
          >
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition-transform duration-300 hover:border-white/20 max-md:rounded-3xl">
              <AnimatePresence mode="wait" initial={false}>
                {formStep === 1 ? (
                  <motion.div
                    key="schedule"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className="flex min-h-[580px] flex-col p-8 max-md:min-h-0 max-md:p-5 sm:p-10 md:p-12"
                  >
                    <div className="mb-8">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                        Step 1 of 2
                      </p>
                      <h3 className="text-3xl font-semibold tracking-tight text-white max-md:text-2xl">
                        Pick a time to talk
                        <span className="text-[#2F85EA]">.</span>
                      </h3>
                      <p className="mt-3 text-sm text-zinc-400">
                        Choose a day and a time that works for you.
                      </p>
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                      Select a day
                    </p>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {mounted &&
                        dateOptions.map((option) => {
                          const selected =
                            scheduledDateTime.date === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                setScheduledDateTime({
                                  date: option.value,
                                  time: "",
                                })
                              }
                              className={`flex min-h-[76px] flex-col items-center justify-center rounded-xl border px-2 py-3 transition-colors ${
                                selected
                                    ? "border-white bg-white text-black"
                                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              <span className="text-xs">{option.weekday}</span>
                              <span className="mt-1 text-xl font-semibold leading-none">
                                {option.day}
                              </span>
                              <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                                {option.month}
                              </span>
                            </button>
                          );
                        })}
                    </div>

                    <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                      Available times
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {timeOptions.map((time) => {
                        const selected = scheduledDateTime.time === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!scheduledDateTime.date}
                            aria-pressed={selected}
                            onClick={() =>
                              setScheduledDateTime((current) => ({
                                ...current,
                                time,
                              }))
                            }
                            className={`rounded-full border px-4 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                              selected
                                  ? "border-white bg-white text-black"
                                : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between max-md:mt-8">
                      <p className="text-sm text-zinc-500">{timeZone}</p>
                      <button
                        type="button"
                        disabled={
                          !scheduledDateTime.date || !scheduledDateTime.time
                        }
                        onClick={() => setFormStep(2)}
                        className="w-full rounded-full bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className="p-8 max-md:p-5 sm:p-10 md:p-12"
                  >
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="mb-6 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                      ← Back to schedule
                    </button>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      Step 2 of 2
                    </p>
                    <h3 className="text-3xl font-semibold tracking-tight text-white max-md:text-2xl">
                      Your details
                      <span className="text-[#2F85EA]">.</span>
                    </h3>
                    <p className="mb-8 mt-3 text-sm text-zinc-400">
                      {selectedDateLabel} at {scheduledDateTime.time} ·{" "}
                      {timeZone}
                    </p>

                    <form className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 gap-6 max-md:gap-6 md:grid-cols-2 md:gap-8">
                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="name"
                            className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="email"
                            className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className={inputClass}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 max-md:gap-6 md:grid-cols-2 md:gap-8">
                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="phone"
                            className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="company"
                            className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                          >
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="website"
                          className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                        >
                          Website{" "}
                          <span className="normal-case tracking-normal text-zinc-600">
                            (optional)
                          </span>
                        </label>
                        <input type="url" id="website" className={inputClass} />
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="service"
                          className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                        >
                          What can we help you with?
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            defaultValue=""
                            className={`${inputClass} appearance-none pr-12 [&>option]:bg-zinc-900 [&>option]:text-white cursor-pointer`}
                          >
                            <option value="" disabled className="text-zinc-500">
                              Select a service
                            </option>
                            <option value="design">Product Design</option>
                            <option value="engineering">
                              Software Engineering
                            </option>
                            <option value="marketing">Digital Marketing</option>
                            <option value="other">Other Inquiry</option>
                          </select>
                          <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <title>Select dropdown chevron</title>
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="message"
                          className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400 max-md:text-[0.65rem]"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className={`${inputClass} resize-none`}
                          required
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-black transition-colors hover:text-white max-md:bg-gradient-to-r max-md:from-[#3445E7] max-md:via-[#2F85EA] max-md:to-[#07D6F3] max-md:text-white"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <span className="relative z-10">Send Message</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
