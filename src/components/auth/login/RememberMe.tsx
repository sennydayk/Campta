import type { RememberMeProps } from "@/app/login/types";

export function RememberMe({ checked, onChange }: RememberMeProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="remember-me"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-main focus:ring-border border-gray-300 rounded"
      />
      <label
        htmlFor="remember-me"
        className="ml-2 block text-sm text-font_main"
      >
        아이디 저장
      </label>
    </div>
  );
}
