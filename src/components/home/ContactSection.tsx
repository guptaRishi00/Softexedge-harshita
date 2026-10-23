"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
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

// Form tone, shared by both steps: brand gradient (#2E5BFF -> #149CCB, as on
// every other CTA), one micro-label style, white-on-black selection, a brand
// focus ring on every control.
const BRAND_GRADIENT = "bg-linear-to-r from-[#2E5BFF] to-[#149CCB]";
const microLabelClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-zinc-400";
const labelClass = `pl-1 ${microLabelClass} max-md:text-[0.65rem]`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5BFF]";
// Continue + Send: white rounded-xl; the brand gradient (an overlay span, see
// PrimaryButtonFill) fades in on hover and the label turns white. Below md
// there is no hover, so the gradient is the resting state there. A disabled
// button stays white and does not light up.
const primaryButtonClass = `${focusRing} group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-black transition-colors enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35 max-md:bg-linear-to-r max-md:from-[#2E5BFF] max-md:to-[#149CCB] max-md:text-white`;

function PrimaryButtonFill() {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 ${BRAND_GRADIENT} opacity-0 transition-opacity duration-300 group-enabled:group-hover:opacity-100`}
    />
  );
}

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
                    className="flex h-full min-h-[580px] flex-col p-8 max-md:min-h-0 max-md:p-5 sm:p-10 md:p-12"
                  >
                    <div className="mb-8">
                      <p className={`mb-3 ${microLabelClass}`}>Step 1 of 2</p>
                      <h3 className="text-3xl font-semibold tracking-tight text-white max-md:text-2xl">
                        Pick a time to talk
                        <span className="text-[#2E5BFF]">.</span>
                      </h3>
                      <p className="mt-3 text-sm text-zinc-400">
                        Choose a day and a time that works for you.
                      </p>
                    </div>

                    <p className={`mb-3 ${microLabelClass}`}>Select a day</p>
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
                              className={`flex min-h-[76px] flex-col items-center justify-center rounded-xl border px-2 py-3 transition-colors ${focusRing} ${
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

                    <p className={`mb-3 mt-8 ${microLabelClass}`}>
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
                            className={`rounded-full border px-4 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${focusRing} ${
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
                        className={`${primaryButtonClass} w-full sm:w-auto`}
                      >
                        <PrimaryButtonFill />
                        <span className="relative z-10">Continue</span>
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
                      className={`mb-6 inline-flex items-center gap-2 rounded-md text-sm font-medium text-zinc-400 transition-colors hover:text-white ${focusRing}`}
                    >
                      <ArrowLeft aria-hidden="true" className="size-4" />
                      Back to schedule
                    </button>
                    <p className={`mb-3 ${microLabelClass}`}>Step 2 of 2</p>
                    <h3 className="text-3xl font-semibold tracking-tight text-white max-md:text-2xl">
                      Your details
                      <span className="text-[#2E5BFF]">.</span>
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
                            className={labelClass}
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            autoComplete="name"
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="email"
                            className={labelClass}
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            className={inputClass}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 max-md:gap-6 md:grid-cols-2 md:gap-8">
                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="phone"
                            className={labelClass}
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            autoComplete="tel"
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3 max-md:gap-3.5">
                          <label
                            htmlFor="company"
                            className={labelClass}
                          >
                            Company{" "}
                            <span className="normal-case tracking-normal text-zinc-500">
                              (optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            autoComplete="organization"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="website"
                          className={labelClass}
                        >
                          Website{" "}
                          <span className="normal-case tracking-normal text-zinc-500">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="url"
                          id="website"
                          autoComplete="url"
                          placeholder="https://"
                          className={inputClass}
                        />
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="service"
                          className={labelClass}
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
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-zinc-500"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 max-md:gap-3.5">
                        <label
                          htmlFor="message"
                          className={labelClass}
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="A few lines on the project, goals and timeline"
                          className={`${inputClass} resize-none`}
                          required
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className={`${primaryButtonClass} w-full`}
                        >
                          <PrimaryButtonFill />
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
