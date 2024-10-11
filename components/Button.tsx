import React from "react";

type ButtonProps = {
  onClick: () => void;
  label?: string;
  variant?: "primary" | "default" | "submit" | "edit" | "delete";
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const Button = ({
  onClick,
  label,
  variant = "submit",
  disabled = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const baseClasses =
    "px-4 w-full py-2 rounded-lg hover:transition-colors flex items-center justify-center";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const variantClasses =
    variant === "primary"
      ? "bg-pink-600 text-white hover:bg-pink-500"
      : variant === "default"
      ? "bg-gray-600 text-white hover:bg-gray-500"
      : variant === "edit"
      ? "text-blue-500 hover:text-blue-600"
      : variant === "delete"
      ? "text-red-500 hover:text-red-600"
      : "bg-green-600 text-white hover:bg-green-500";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}{" "}
      {label && <span>{label}</span>}
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}{" "}
    </button>
  );
};

export default Button;
