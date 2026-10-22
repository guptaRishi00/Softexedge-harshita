"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /** Time in milliseconds between revealing each subsequent real character. */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /** Time in milliseconds between gibberish flips for unrevealed characters. */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters. */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters. */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  return Array.from(original, (character) =>
    character === " " ? " " : generateRandomCharacter(charset),
  ).join("");
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [revealCount, setRevealCount] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const lastFlipTimeRef = useRef(0);
  const scrambleCharsRef = useRef(
    text ? generateGibberishPreservingSpaces(text, charset).split("") : [],
  );

  useEffect(() => {
    if (!isInView) return;

    scrambleCharsRef.current = generateGibberishPreservingSpaces(
      text,
      charset,
    ).split("");
    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    setRevealCount(0);

    let cancelled = false;
    const update = (now: number) => {
      if (cancelled) return;

      const elapsedMs = now - startTimeRef.current;
      const totalLength = text.length;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      setRevealCount(currentRevealCount);
      if (currentRevealCount >= totalLength) return;

      if (now - lastFlipTimeRef.current >= Math.max(0, flipDelayMs)) {
        for (let index = currentRevealCount; index < totalLength; index += 1) {
          scrambleCharsRef.current[index] =
            text[index] === " " ? " " : generateRandomCharacter(charset);
        }
        lastFlipTimeRef.current = now;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => {
      cancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [charset, flipDelayMs, isInView, revealDelayMs, text]);

  if (!text) return null;

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {Array.from(text, (character, index) => {
        const isRevealed = index < revealCount;
        const displayCharacter = isRevealed
          ? character
          : character === " "
            ? " "
            : (scrambleCharsRef.current[index] ??
              generateRandomCharacter(charset));

        return (
          <span
            key={`${index}:${character}`}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayCharacter}
          </span>
        );
      })}
    </motion.span>
  );
}
