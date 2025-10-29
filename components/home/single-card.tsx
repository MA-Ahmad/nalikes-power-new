"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play } from "lucide-react";
import { useState } from "react";

interface GameCardProps {
  title: string;
  amount: string;
  badges?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
  isNew?: boolean;
  isHot?: boolean;
  image?: string;
  progress: number;
}

export function GameCard({
  title,
  amount,
  badges = [],
  isNew = false,
  isHot = false,
  image,
  progress,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative bg-gradient-dark border-pink-light/10 text-white overflow-hidden cursor-pointer transition-transform hover:scale-102 px-4 min-h-[24rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute object-contain w-full flex items-center-justify-center top-0 left-1/2 -translate-x-1/2">
        <img
          src={image}
          alt="Solana themed items"
          className=" w-full h-full  "
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
      <CardContent className="flex flex-col justify-between px-2 h-full z-10">
        {/* Header with badges and star */}
        <div className="flex justify-between items-start pb-2">
          <div className="flex gap-2">
            {isNew && (
              <div className="bg-gradient-to-b from-[#6F6BFF] to-[#434099] text-white text-xs px-2 py-1 rounded-md flex items-center justify-center">
                NEW
              </div>
            )}
            {isHot && (
              <div className="bg-gradient-to-b from-[#EE4FFB] to-[#8D2F95] text-white text-xs px-2 py-1 rounded-md flex items-center justify-center">
                HOT
              </div>
            )}
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant || "default"}
                className="text-xs px-2 py-1"
              >
                {badge.text}
              </Badge>
            ))}
          </div>
          <Star
            className={`h-6 w-6 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            stroke="white"
            fill="none"
          />
        </div>

        {/* Footer with amount and play */}
        <div className="flex flex-col pt-0">
          <div className="flex flex-col justify-center mb-2">
            {/* Title */}
            <h3 className="text-2xl font-bold text-white leading-tight">
              {title}
            </h3>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="px-4 py-px  bg-[#A27B01]/30 border border-[#FDC61C] rounded text-[#FDC61C] font-semibold">
              {amount}
            </span>
            <div className="flex gap-px w-full">
              {Array.from({ length: 4 }, (_, index) => {
                const totalProgress = progress;
                const segmentWidth = 100 / 4;
                const segmentStart = index * segmentWidth;
                const segmentEnd = (index + 1) * segmentWidth;

                let segmentFillPercentage = 0;
                if (totalProgress >= segmentEnd) {
                  segmentFillPercentage = 100;
                } else if (totalProgress > segmentStart) {
                  segmentFillPercentage =
                    ((totalProgress - segmentStart) / segmentWidth) * 100;
                }
                return (
                  <div
                    key={index}
                    className="flex-1 h-5 rounded bg-white/10 border border-white/20 overflow-hidden group/segment hover:scale-110 transition-transform duration-300"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#FEE59A]  to-[#FED867] transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${segmentFillPercentage}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
