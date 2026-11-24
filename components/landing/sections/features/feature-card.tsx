import type { ComponentType } from "react"
import { assets } from "@/lib/landing/assets"

/**
 * One feature: illustration, title, text, with the soft glow behind it.
 */
export function FeatureCard({
  Illustration,
  title,
  description,
}: {
  Illustration: ComponentType
  title: string
  description: string
}) {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        style={{ backgroundImage: `url(${assets.featureIconBg.src})`, zIndex: -1 }}
        className="opacity-40 bg-cover bg-center w-[214px] md:w-[397px] h-[156px] md:h-[205px] absolute left-[-10%] md:left-0 top-[-10%]"
      />

      <div className="flex flex-col items-center">
        {/* The scene is drawn full size and shrunk with a transform, which does not shrink its layout box.
            Taking it out of the flow keeps a wide scene from widening the grid column on small screens. */}
        <div className="relative mb-4 h-[72px] w-full sm:h-[96px] md:mb-6 lg:h-[120px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Illustration />
          </div>
        </div>
        <h2 className="text-[#1F2937] text-base md:text-lg lg:text-[22px] font-medium mb-3 md:mb-4 text-center w-full">{title}</h2>
        <p className="text-[#6B7280] text-xs md:text-sm lg:text-[14px] text-center leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
