import { assets } from "@/lib/landing/assets"
import { sections } from "@/lib/landing/routes"
import type { LandingDictionary } from "@/lib/i18n/get-dictionary"

/** "Flexible pricing": the free-plan card. Shown only while subscriptions are switched on. */
export function PricingSection({ t }: { t: LandingDictionary }) {
  const s = t.landing.services

  return (
    <div id={sections.pricing} className="flex flex-col" style={{ scrollMarginTop: "100px" }}>
      <div className="my-6 sm:my-8 md:my-12 flex flex-col items-center justify-center px-4">
        <div
          style={{ backgroundImage: `url(${assets.headBg1.src})` }}
          className="bg-cover bg-center w-full max-w-[1000px] h-20 sm:h-24 md:h-[106px] p-4 sm:p-5 flex items-center justify-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-normal px-2">{s.pricingTitle}</h1>
        </div>
      </div>

      <div
        className="gradient w-[90%] max-w-[1200px] min-h-[300px] sm:min-h-[320px] relative rounded-2xl sm:rounded-[25px] md:rounded-[30px] self-center flex flex-col px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12"
        style={{ boxShadow: "4px 4px 20px 5px rgba(153, 148, 148, 0.25)" }}
      >
        <span className="h-10 sm:h-12 md:h-[50px] w-20 sm:w-[90px] md:w-[95px] bg-[#3D70FE] rounded-2xl sm:rounded-[18px] md:rounded-[20px] text-white text-sm sm:text-base text-center flex items-center justify-center absolute top-4 sm:top-5 left-4 sm:left-5">
          {s.freeBadge}
        </span>
        <h1 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl font-medium text-center mb-4 sm:mb-5 md:mb-6 mt-8 sm:mt-10 md:mt-0 px-2">
          {s.freeTitle}
        </h1>
        <p className="font-normal text-sm sm:text-base md:text-[15px] lg:text-base text-[#6B7280] text-center mb-3 sm:mb-4 leading-relaxed px-2">
          {s.freeDescription1}
        </p>
        <p className="font-normal text-sm sm:text-base md:text-[15px] lg:text-base text-[#6B7280] text-center leading-relaxed px-2">
          {s.freeDescription2}
        </p>
      </div>
    </div>
  )
}
