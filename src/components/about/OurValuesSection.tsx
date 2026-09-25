"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const quotes = [
  {
    text: "My vision has always been to look after the clients we work with, but to also look after the staff just as much. That will get the best results for everyone.",
    name: "Sidhartha Parasramka",
    role: "CEO",
    avatar: "/assets/ceo.jpeg",
  },
  {
    text: "Great work comes from teams that feel trusted. We give people the room to own their craft, and the results speak for themselves — for us and for our clients.",
    name: "Priya Sharma",
    role: "Creative Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Every project here starts with the same question: what would make this genuinely great? That standard, shared by everyone, is what keeps clients coming back.",
    name: "Arjun Mehta",
    role: "Head of Engineering",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

// Past this much travel, or this much flick speed, a drag reads as a deliberate
// swipe rather than a slipped tap on the card.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

// `custom` is threaded through AnimatePresence as well as the child so the
// LEAVING quote resolves `exit` against the new direction. Without that the
// outgoing card keeps whatever direction it entered with, and a backwards swipe
// throws both cards the same way.
const quoteVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 32 * dir }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -32 * dir }),
};

// A copy of the pattern ChannelCard paints behind the contact cards: same cell
// colour, same gap, same cell count, same outer overlay stop. Two deliberate,
// requested deviations: the grid is 120% wide instead of 110% (which enlarges
// the boxes, since they are 6 fractional columns of it — `-left` stays at half
// the overhang so it is still centred), and the overlay's INNER stop is 0.10
// instead of 0.5, which lightens the bright spot on the right. Its
// cells are pointer-reactive; on touch the hover intensity is always 0, so
// every cell resolves to #161616 and the whole thing collapses to this static
// markup. Keep these values in sync with ChannelCard rather than tuning them
// here — the two are meant to look identical.
const patternCellIds = Array.from({ length: 30 }, (_, i) => `values-box-${i}`);

// Mobile moves the whole card rather than swapping its contents: the outgoing
// card leaves the viewport entirely and the next one arrives from the far side.
// Percentages, not pixels, so the travel is always exactly one card width.
const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: `${100 * dir}%` }),
  center: { opacity: 1, x: "0%" },
  exit: (dir: number) => ({ opacity: 0, x: `${-100 * dir}%` }),
};

export default function OurValuesSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setQuoteIndex((next + quotes.length) % quotes.length);
  }, []);

  // quoteIndex is a real dependency: it re-arms the timer, so a swipe or a dot
  // click gets a full 6s dwell rather than the remainder of the previous one.
  useEffect(() => {
    const id = setInterval(() => {
      // Synchronous on-screen check at tick time (AboutImageStack's idiom):
      // the swap re-renders the quote card and runs an AnimatePresence exit +
      // enter, and it used to do that every 6s for the whole visit even with
      // the section far offscreen. One layout read per 6s costs nothing, and
      // unlike an IO flag it cannot latch the cycler dead.
      const el = sectionRef.current;
      if (el) {
        const b = el.getBoundingClientRect();
        if (b.bottom < 0 || b.top > window.innerHeight) return;
      }
      goTo(quoteIndex + 1, 1);
    }, 6000);
    return () => clearInterval(id);
  }, [quoteIndex, goTo]);
  return (
    <section
      ref={sectionRef}
      id="culture"
      className="relative flex w-full flex-col overflow-hidden bg-black font-sans py-20 md:py-32"
    >
      <div className="relative z-10 mx-auto w-full px-4 max-md:px-3 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch">
          <motion.div
            data-no-mobile-entry
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="w-full lg:w-5/12 shrink-0 flex flex-col"
          >
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:flex-1 overflow-hidden rounded-xl bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
              <Image
                src="/assets/ceo2.png"
                alt="CEO"
                fill
                className="object-cover transition-transform duration-[20s] ease-out hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          <motion.div
            data-no-mobile-entry
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="w-full lg:w-7/12 flex flex-col justify-center py-6 lg:py-12"
          >
            <div className="mb-8 max-md:mb-6">
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 max-md:text-xs">
                Our Culture
              </span>
            </div>

            {/* Metrics match AboutTraditional's mobile heading: same 40px size
                it already had, plus its leading (1.11 vs 0.9em) and
                `tracking-tight` (-1px vs -2px). Desktop keeps the tighter set. */}
            <h2 className="text-5xl max-md:text-[2.5rem] md:text-7xl lg:text-[80px] font-bold tracking-tighter max-md:tracking-tight leading-[0.9em] max-md:leading-[1.11] mb-8 max-md:mb-10 text-white">
              We've built a culture of
              {/* JSX swallows the newline before the span, so the word space has
                  to be a real inset. Desktop's pl-5 already did that job; mobile
                  had pl-0 and rendered "oftrust." — 0.25em is one word space at
                  whatever the font size is. */}
              <span className="pl-5 max-md:pl-[0.25em] bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            <p className="max-w-2xl text-lg font-light leading-[1.25em] text-white md:text-xl">
              We produce good work for good people, and with the idea that staff
              and the client will be happy throughout the full process. This in
              return will bring more work our way, whether that's via
              recommendation or further work from that client.
            </p>

            <div className="mt-12 relative flex max-md:hidden flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-[#100f0f] p-8 md:p-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={quoteIndex}
                  custom={direction}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: premiumEase }}
                  // Constrained to zero on both sides with a little elasticity:
                  // the card rubber-bands under the finger and snaps back, and
                  // the index change is what actually moves the quote. framer
                  // sets `touch-action: pan-y` for drag="x", so vertical page
                  // scrolling over the card is untouched.
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    const { offset, velocity } = info;
                    if (
                      offset.x < -SWIPE_DISTANCE ||
                      velocity.x < -SWIPE_VELOCITY
                    ) {
                      goTo(quoteIndex + 1, 1);
                    } else if (
                      offset.x > SWIPE_DISTANCE ||
                      velocity.x > SWIPE_VELOCITY
                    ) {
                      goTo(quoteIndex - 1, -1);
                    }
                  }}
                  className="flex cursor-grab flex-col gap-8 active:cursor-grabbing"
                >
                  {/* The quotes wrap to 4 or 5 lines depending on which one is
                      showing, so the card jumped 350 <-> 372px on every
                      rotation. Reserving the tallest keeps it still. Expressed
                      in em (6em = 5 lines at this 1.2em leading) rather than px
                      so it tracks the font size instead of one screen width. */}
                  <p className="text-xl md:text-2xl font-medium leading-[1.2em] tracking-tight text-white max-md:min-h-[6em]">
                    {quotes[quoteIndex].text}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-800 max-md:h-12 max-md:w-12">
                        <Image
                          src={quotes[quoteIndex].avatar}
                          alt={quotes[quoteIndex].name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-white text-lg">
                          {quotes[quoteIndex].name}
                        </h4>
                        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                          {quotes[quoteIndex].role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/about"
                      className="shrink-0 w-full sm:w-auto max-md:hidden"
                    >
                      <button
                        type="button"
                        // Mobile geometry copied from ExperimentalTestimonials'
                        // CTA (h-16, w-fit, pl-0/pr-3, 40px icon at rounded-lg,
                        // h-5 arrows, text-lg). Colours are deliberately NOT
                        // copied — that CTA is dark-on-white, this one lives on
                        // a dark card and keeps its white-on-transparent sweep.
                        className="group relative flex h-14 max-md:h-16 w-full sm:w-fit max-md:w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl pl-3 pr-3 max-md:pl-0 max-md:pr-3 transition-colors duration-300 hover:border-white before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100"
                      >
                        <span className="relative z-10 text-base max-md:text-lg font-bold tracking-tight text-white transition-colors group-hover:text-black">
                          Connect With Me
                        </span>

                        <div className="relative z-10 flex h-9 w-9 max-md:h-10 max-md:w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl max-md:rounded-lg bg-white text-black transition-colors duration-300 group-hover:bg-black">
                          <svg width="0" height="0" className="absolute">
                            <title>Connect arrow gradient</title>
                            <defs>
                              <linearGradient
                                id="culture-icon-grad"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop stopColor="#2E5BFF" offset="0%" />
                                <stop stopColor="#149CCB" offset="100%" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <MdArrowOutward className="absolute z-10 h-4 w-4 max-md:h-5 max-md:w-5 transition-transform duration-300 max-md:-translate-y-8 max-md:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8" />
                          <MdArrowOutward
                            className="absolute z-10 h-4 w-4 max-md:h-5 max-md:w-5 -translate-x-8 translate-y-8 transition-transform duration-300 max-md:translate-x-0 max-md:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
                            style={{ fill: "url(#culture-icon-grad)" }}
                          />
                        </div>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="lg:mt-8 flex items-center gap-2">
                {quotes.map((q, i) => (
                  <button
                    key={q.name}
                    type="button"
                    aria-label={`Show quote ${i + 1}`}
                    onClick={() => goTo(i, i > quoteIndex ? 1 : -1)}
                    className="-mx-[9px] -my-[19px] flex h-11 items-center px-[9px]"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === quoteIndex
                        ? "w-6 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile: the card itself is the carousel. Same index/direction
                state as the desktop block above, so the two never disagree —
                only the presentation differs. Profile leads, quote follows, and
                the dots sit outside the card. */}
            <div className="mt-12 md:hidden">
              {/* Defined once here, not inside the card: popLayout keeps the
                  outgoing card mounted during a swipe, so a per-card def would
                  put two or three identical ids in the document at the same
                  time. A paint server resolves document-wide, so one is enough. */}
              <svg width="0" height="0" className="absolute">
                <title>Connect arrow gradient</title>
                <defs>
                  <linearGradient
                    id="values-cta-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop stopColor="#2E5BFF" offset="0%" />
                    <stop stopColor="#149CCB" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
              {/* popLayout, not "wait": "wait" holds the incoming card until the
                  outgoing one has fully left, so slowing the transition just
                  stretches an empty viewport. popLayout takes the leaving card
                  out of flow so both move at once — one slides out as the next
                  slides in, which is what actually reads as a carousel. The
                  clipper is `relative` so the popped card is positioned against
                  it; every slide is the same height, so nothing collapses while
                  the outgoing card is out of flow. */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={quoteIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: premiumEase }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      const { offset, velocity } = info;
                      if (
                        offset.x < -SWIPE_DISTANCE ||
                        velocity.x < -SWIPE_VELOCITY
                      ) {
                        goTo(quoteIndex + 1, 1);
                      } else if (
                        offset.x > SWIPE_DISTANCE ||
                        velocity.x > SWIPE_VELOCITY
                      ) {
                        goTo(quoteIndex - 1, -1);
                      }
                    }}
                    className="relative flex cursor-grab flex-col gap-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/20 p-5 py-10 active:cursor-grabbing"
                  >
                    {/* No mask — the darkening is an overlay painted OVER the
                        grid, the same technique ChannelCard uses below md,
                        though this one is deliberately lighter than its
                        0.5/0.96. Masking the grid to alpha `a` over a black
                        card and painting black at `1 - a` over it are the same
                        result, and the overlay skips the offscreen composite
                        pass that `mask-image` forces on the whole subtree every
                        paint. Parked at 85%/50% because touch never moves it. */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                    >
                      <div className="relative -left-[10%] grid w-[120%] -translate-y-6 grid-cols-6 gap-2">
                        {patternCellIds.map((id) => (
                          <div
                            key={id}
                            className="relative aspect-square w-full overflow-hidden rounded-md bg-[#161616] p-[0.8px]"
                          >
                            <div className="relative z-10 h-full w-full rounded-md bg-[#161616]" />
                          </div>
                        ))}
                      </div>

                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(300px circle at 85% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.96) 100%)",
                        }}
                      />
                    </div>

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-800">
                        <Image
                          src={quotes[quoteIndex].avatar}
                          alt={quotes[quoteIndex].name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-white">
                          {quotes[quoteIndex].name}
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                          {quotes[quoteIndex].role}
                        </p>
                      </div>
                    </div>

                    {/* Reserve 5 lines so the card — and the dots beneath it —
                        hold still across slides. Measured line counts move in
                        lockstep at 320/360/375/390/430; only 414 splits them
                        (5 lines vs 4), which this floor absorbs. At 320 all
                        three run to 6 lines and grow together, so the floor
                        costs nothing there. In em so it tracks the font size
                        rather than one screen width. */}
                    <p className="relative z-10 flex min-h-[6em] items-center text-xl font-normal leading-[1.2em] tracking-tight text-white">
                      {quotes[quoteIndex].text}
                    </p>

                    {/* Compact version of the desktop card's CTA: same white
                        pill / dark icon idiom, 40px instead of 56. Self
                        contained — it does not reference the desktop button's
                        `culture-icon-grad` def, which lives in a max-md:hidden
                        subtree. */}
                    <Link href="/about" className="relative z-10 w-fit">
                      <button
                        type="button"
                        className="flex h-11 w-fit cursor-pointer items-center justify-between gap-2 rounded-lg bg-white px-3 text-base font-bold tracking-tight text-black"
                      >
                        Connect With Me
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-white">
                          <MdArrowOutward
                            className="h-3.5 w-3.5"
                            style={{ fill: "url(#values-cta-grad)" }}
                          />
                        </span>
                      </button>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {quotes.map((q, i) => (
                  <button
                    key={q.name}
                    type="button"
                    aria-label={`Show quote ${i + 1}`}
                    onClick={() => goTo(i, i > quoteIndex ? 1 : -1)}
                    className="-mx-[9px] -my-[19px] flex h-11 items-center px-[9px]"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === quoteIndex
                        ? "w-6 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                        : "w-1.5 bg-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
