const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span className={`bg-foreground/30 mt-3 block h-px w-12 ${className}`} aria-hidden="true" />
  );
};

export default AccentLine;
