"use client";

import { useState } from "react";
import projects from "@/lib/data-projects";
import "../style/project.css";
import { fontJersey15 } from "@/lib/font";
import { cn } from "@/lib/utils";
import Button from "./Button";

type Props = {
  id: number;
};

function Project({ id }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedProject = projects.find((project) => project.id === id);
  const bg_col = selectedProject?.color ?? "#000000";

  const darkenColor = (color: string, percent: number) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.floor(r * (1 - percent));
    const newG = Math.floor(g * (1 - percent));
    const newB = Math.floor(b * (1 - percent));

    return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB)
      .toString(16)
      .slice(1)}`;
  };

  const darkenedColor = darkenColor(bg_col, 0.2);

  TODO Code fait a partir de chat gpt, il faut peut etre recheck !!!!!!!!!!!! et modifier les truc qui sont bizzare (tjr cf excalidraw)
  return (
    <div
      className="flex-grow mx-4 my-2 rounded-md border-2 border-blue-7/50 hover:border-blue-6/80 overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(45deg, ${darkenedColor}, ${bg_col} 20%, ${darkenedColor} 45%,${bg_col} 70%, ${darkenedColor})`,
      }}
    >
      <div className="p-bg-lines h-full w-full">
      <div className="p-bg-lines h-full w-full flex flex-col items-center justify-evenly relative">
        {!isExpanded && (
          <span
            className={cn("text-2xl text-white-1 z-10", fontJersey15.className)}
          >
            {selectedProject?.title}
          </span>
        )}

        <div
          className={cn(
            "relative flex items-center justify-center aspect-[1920/1080] w-64 rounded-lg border border-blue-9 transition-all duration-700 overflow-hidden",
            isExpanded ? "w-full aspect-auto h-full" : ""
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700",
              isExpanded ? "brightness-50" : ""
            )}
            style={{ backgroundImage: selectedProject?.image_path }}
            onClick={() => setIsExpanded(true)}
          ></div>

          {/* Contenu visible seulement en mode "normal" */}
          {!isExpanded && (
            <Button text="See more" className="absolute scale-90 z-20" />
          )}

          {/* Description visible seulement en mode "expand" */}
          {isExpanded && (
            <div className="relative z-30 text-white p-4 text-center">
              <h2 className="text-xl font-bold mb-2">
                {selectedProject?.title}
              </h2>
              <p className="text-sm">
                {selectedProject?.description ?? "No description."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;
