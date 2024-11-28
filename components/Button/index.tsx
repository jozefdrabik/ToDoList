import React from "react";
import { IButton } from "@/components/Button/prop";

export default function Button({
  onClick,
  label,
  secondary = false,
  type = "button",
  className,
}: IButton): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} h-12 w-32 md:w-40 rounded-lg text-center flex items-center justify-center ${secondary ? "border-black bg-white border" : "bg-indigo-600 text-white"}`}
    >
      {label}
    </button>
  );
}
