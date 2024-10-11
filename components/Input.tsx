import React from "react";

interface InputProps {
  type: "text" | "date";
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className="space-y-2">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-3 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
