export const Button = ({ className, size = "medium", children }) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground  hover:bg-primary/90 shadow-lg shadow-primary/25";

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
    default: "px-6 py-3 text-base",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${className || ""}`;

  return (
    <button className={classes}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
