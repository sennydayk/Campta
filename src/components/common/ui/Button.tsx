import React from "react";

export interface ButtonProps {
  label: string;
  width?: string;
  rounded?: string;
  fontSize?: string;
  fontWeight?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  width = "w-full",
  rounded = "rounded-md",
  fontSize = "text-sm",
  fontWeight = "font-semibold",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        className={`${width} flex justify-center py-2 px-4 shadow-sm ${rounded} ${fontSize} ${fontWeight} 
        ${
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "text-font_btn bg-main hover:bg-sub"
        }
        transition-colors
        duration-200
      `}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
