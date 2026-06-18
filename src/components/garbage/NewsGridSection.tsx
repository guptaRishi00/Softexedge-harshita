// app/components/NewsGridSection.tsx

import { Clock3 } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    id: 1,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    time: "2 mins",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
    tag: null,
  },
  {
    id: 2,
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    author: "Carrie Rose",
    time: "2 mins",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop",
    tag: "News",
  },
  {
    id: 3,
    title:
      "Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category",
    author: "Ray Saddiq",
    time: "2 mins",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
    tag: "Food/Hospitality/Drink",
  },
];

export default function NewsGridSection() {
  return (
    <section className="w-full bg-white py-10 md:py-0">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-8 px-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="group cursor-pointer">
            {/* Image Card */}
            <div className="relative overflow-hidden">
              {/* Tag */}
              {article.tag && (
                <div className="absolute left-6 top-5 z-10">
                  <span className="rounded-full bg-white/60 px-4 py-1 text-sm font-medium text-white backdrop-blur-md">
                    {article.tag}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[1/1] overflow-hidden rounded-[22px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Meta */}
            <div className="mt-5 flex items-center gap-3">
              {/* Author */}
              <div className="flex items-center gap-2 rounded-full bg-[#ececea] pl-1.5 pr-3 py-1.5">
                <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-300">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                    alt={article.author}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-sm font-medium text-neutral-700">
                  {article.author}
                </span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 rounded-full bg-[#ececea] px-3 py-1.5">
                <Clock3 className="h-4 w-4 text-neutral-500" />

                <span className="text-sm font-medium text-neutral-600">
                  {article.time}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="mt-4 max-w-[95%] text-sm font-medium leading-[1.3] tracking-[-0.03em] text-black md:text-xl">
              {article.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
