import { LucideIcon } from "lucide-react";

interface FooterButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function FooterButton({
  icon: Icon,
  label,
  onClick,
}: FooterButtonProps) {
  return (
    <button
      className="flex flex-col items-center justify-center p-2 w-full bg-white hover:bg-sub transition-colors"
      onClick={onClick}
    >
      <Icon className="h-6 w-6 text-font_main" />
      <span className="text-xs mt-1 text-font_main">{label}</span>
    </button>
  );
}
