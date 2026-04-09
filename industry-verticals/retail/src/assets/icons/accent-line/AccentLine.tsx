const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      className={`bg-accent mt-2 block h-1 w-16 rounded-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default AccentLine;
