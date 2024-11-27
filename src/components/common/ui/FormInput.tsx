import type { FormInputProps } from "@/lib/auth/signup/types";

export function FormInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  required = true,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-font_main">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
        required={required}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
