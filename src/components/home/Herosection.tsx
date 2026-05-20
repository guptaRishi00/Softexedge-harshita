import Header from "../layout/Header";

export default function Herosection({}: any) {
  return (
    <div className="relative lg:min-h-[96.5vh] rounded-[20px] overflow-hidden">
      <video
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 backdrop-blur-xl" />

      <div className="absolute z-20 p-5 w-full flex flex-col items-center justify-between gap-10 h-full">
        <Header />

        <div className="w-full flex items-center justify-center text-center ">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
              We Engineer
            </h1>

            <div className="flex items-center justify-center gap-2 md:gap-5">
              <p className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
                Digital
              </p>
              <div className="w-16 h-8 sm:w-24 sm:h-12 md:w-[150px] md:h-[68px] lg:w-[200px] lg:h-[90px] xl:w-[220px] xl:h-[100px] overflow-hidden rounded-full shrink-0 flex items-center justify-center border border-white/20 shadow-xl">
                <video
                  src="/assets/hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
                Solutions
              </p>
            </div>

            <p className="text-lg md:text-xl lg:text-5xl font-medium text-white mt-5">
              crafted for impact
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20 px-4">
          <p className="text-center md:text-start text-white/70 font-medium max-w-sm text-sm md:text-xs leading-relaxed">
            We design and engineer high-performance web experiences, immersive
            interfaces, and custom creative systems for industry leaders.
          </p>
          <p className="text-center md:text-end text-white/70 font-medium max-w-sm text-sm md:text-xs leading-relaxed">
            From concept to cinematic deployment, we remove the friction of
            innovation, driving digital acceleration with refined design
            systems.
          </p>
        </div>
      </div>
    </div>
  );
}
