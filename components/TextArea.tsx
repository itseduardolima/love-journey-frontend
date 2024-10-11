import React from "react";

interface TextAreaProps {
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export const TextArea = ({
  name,
  value,
  placeholder,
  onChange,
  error,
}: TextAreaProps) => {
  return (
    <div className="space-y-2">
      <textarea
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
