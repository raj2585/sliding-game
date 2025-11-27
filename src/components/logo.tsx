import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

type LogoProps = {
  showText?: boolean;
  size?: number;
  orientation?: "row" | "column";
  className?: string;
  textClassName?: string;
};

export function BrandMark({
  showText = true,
  size = 44,
  orientation = "row",
  className,
  textClassName,
}: LogoProps) {
  const [, setLocation] = useLocation();

  return (
    <button
      type="button"
      onClick={() => setLocation("/")}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        orientation === "column" && "flex-col text-center",
        className,
      )}
      aria-label="Jodhpur Puzzle"
    >
      <img
        src="/logo.svg"
        alt="Jodhpur Puzzle logo"
        style={{ width: size, height: size }}
        className="drop-shadow-lg select-none"
        draggable={false}
      />
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-[0.25em] text-xs uppercase text-muted-foreground group-hover:text-foreground transition-colors",
            orientation === "column" && "tracking-[0.35em]",
            textClassName,
          )}
        >
          Jodhpur Puzzle
        </span>
      )}
    </button>
  );
}

