import Image from "next/image";
import Grainient from "../ui/Grainient";

export default function ServiceSection() {
  // Store the list items in an array for cleaner code and easier updates
  const serviceItems = [
    { title: "Generative AI Systems", number: "01" },
    { title: "Brand Strategy & Architecture", number: "02" },
    { title: "Visual Identity Design", number: "03" },
    { title: "Automated Workflows", number: "04" },
  ];

  return (
    <section className="w-full min-h-screen pb-24">
      <div className="w-full flex flex-col gap-16 lg:gap-32">
        {/* Top Hero/Graphic Section */}
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-[40px] lg:h-[600px]">
          <Grainient
            color1="#3445E7"
            color2="#2F85EA"
            color3="#07D6F3"
            timeSpeed={0.7}
            colorBalance={-0.04}
            warpStrength={3.2}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={-135}
            blendSoftness={0}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />

          <Image
            src="/assets/branding.webp"
            alt="Branding and Identity Services"
            width={1200}
            height={800}
            priority
            className="absolute top-10 w-full max-w-5xl object-top lg:top-24"
          />

          <h1 className="absolute bottom-8 left-8 flex flex-col items-start gap-3 text-5xl font-bold tracking-tight text-white md:bottom-12 md:left-16 md:text-8xl lg:text-9xl">
            Branding & Identity
          </h1>
        </div>

        {/* Bottom Content Section */}
        <div className="flex h-auto w-full flex-col items-start gap-10 px-6 lg:flex-row lg:gap-20 lg:px-16">
          {/* Giant Number (Responsive) */}
          <div className="shrink-0">
            <p className="text-[12rem] font-bold leading-none tracking-tighter text-black md:text-[20rem] lg:text-[30rem]">
              01
            </p>
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col items-start justify-between gap-16 lg:mt-16 lg:gap-32">
            {/* Header & Paragraph */}
            <div className="flex flex-col items-start gap-6 max-w-4xl">
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                Designing the Future With Intelligent Creative Systems
              </h2>
              <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                I use AI as a creative amplifier—building custom tools,
                producing on-brand imagery, training custom LoRAs, and designing
                automated workflows that accelerate output. Across image, video,
                audio, copy, and code, AI removes the friction once inherent in
                ideation and iteration, enabling faster exploration, broader
                experimentation, and more fully realized creative ideas.
              </p>
            </div>

            {/* Services List */}
            <ul className="flex w-full flex-col border-t border-black/10">
              {serviceItems.map((item, index) => (
                <li
                  key={index}
                  className="group flex cursor-pointer items-center justify-between border-b border-black/10 px-6 py-6 transition-all duration-300 ease-out hover:bg-black hover:text-white md:px-8 md:py-8"
                >
                  <p className="text-xl font-medium transition-transform duration-300 ease-out group-hover:translate-x-3 md:text-2xl">
                    {item.title}
                  </p>
                  <p className="text-lg font-medium opacity-40 transition-opacity duration-300 group-hover:opacity-100 md:text-xl">
                    {item.number}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-16 lg:gap-32 mt-20">
        {/* Top Hero/Graphic Section */}
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-[40px] lg:h-[600px]">
          <Grainient
            color1="#3445E7"
            color2="#2F85EA"
            color3="#07D6F3"
            timeSpeed={0.7}
            colorBalance={-0.04}
            warpStrength={3.2}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={-135}
            blendSoftness={0}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />

          <Image
            src="/assets/branding.webp"
            alt="Branding and Identity Services"
            width={1200}
            height={800}
            priority
            className="absolute top-10 w-full max-w-5xl object-top lg:top-24"
          />

          <h1 className="absolute bottom-8 left-8 flex flex-col items-start gap-3 text-5xl font-bold tracking-tight text-white md:bottom-12 md:left-16 md:text-8xl lg:text-9xl">
            Branding & Identity
          </h1>
        </div>

        {/* Bottom Content Section */}
        <div className="flex h-auto w-full flex-col items-start gap-10 px-6 lg:flex-row lg:gap-20 lg:px-16">
          {/* Giant Number (Responsive) */}
          <div className="shrink-0">
            <p className="text-[12rem] font-bold leading-none tracking-tighter text-black md:text-[20rem] lg:text-[30rem]">
              01
            </p>
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col items-start justify-between gap-16 lg:mt-16 lg:gap-32">
            {/* Header & Paragraph */}
            <div className="flex flex-col items-start gap-6 max-w-4xl">
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                Designing the Future With Intelligent Creative Systems
              </h2>
              <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                I use AI as a creative amplifier—building custom tools,
                producing on-brand imagery, training custom LoRAs, and designing
                automated workflows that accelerate output. Across image, video,
                audio, copy, and code, AI removes the friction once inherent in
                ideation and iteration, enabling faster exploration, broader
                experimentation, and more fully realized creative ideas.
              </p>
            </div>

            {/* Services List */}
            <ul className="flex w-full flex-col border-t border-black/10">
              {serviceItems.map((item, index) => (
                <li
                  key={index}
                  className="group flex cursor-pointer items-center justify-between border-b border-black/10 px-6 py-6 transition-all duration-300 ease-out hover:bg-black hover:text-white md:px-8 md:py-8"
                >
                  <p className="text-xl font-medium transition-transform duration-300 ease-out group-hover:translate-x-3 md:text-2xl">
                    {item.title}
                  </p>
                  <p className="text-lg font-medium opacity-40 transition-opacity duration-300 group-hover:opacity-100 md:text-xl">
                    {item.number}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
