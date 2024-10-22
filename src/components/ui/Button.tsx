import React from "react";

export interface ButtonProps {
  label: string;
  width?: string;
  rounded?: string;
  fontSize?: string;
  fontWeight?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  label,
  width = "w-full",
  rounded = "rounded-md",
  fontSize = "text-sm",
  fontWeight = "font-semibold",
  type = "button",
}: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        className={`${width} flex justify-center py-2 px-4 shadow-sm ${rounded} ${fontSize} ${fontWeight} text-font_btn bg-main hover:bg-sub`}
      >
        {label}
      </button>
    </div>
  );
}
