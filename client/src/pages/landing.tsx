import { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ball {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  colors: [string, string];
}

const BALL_COUNT = 36;
const COLOR_PALETTE: Array<[string, string]> = [
  ["#FDE68A", "#F97316"],
  ["#A5B4FC", "#6366F1"],
  ["#7DD3FC", "#0EA5E9"],
  ["#FBCFE8", "#EC4899"],
  ["#FEE2E2", "#F87171"],
  ["#C4B5FD", "#8B5CF6"],
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const balls = useMemo(() => createBalls(), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BallPitBackground balls={balls} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 py-8 flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
          <span>Jodhpur Puzzle</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Season 01
          </span>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl space-y-6"
          >
            <p className="text-sm font-semibold tracking-[0.3em] text-white/70 uppercase">
              A playful tribute to the Blue City
            </p>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Drift through color, tap to begin the puzzle journey.
            </h1>
            <p className="text-lg text-white/80">
              Inspired by the floating ballpit backdrop from React Bits, this intro warms you up before you claim your unique explorer identity.
            </p>
            <Button
              size="lg"
              className="h-14 px-10 text-lg gap-3 bg-white/90 text-slate-900 hover:bg-white"
              onClick={() => setLocation("/enter")}
              data-testid="button-begin"
            >
              Begin
              <ArrowDownRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </main>

        <footer className="px-6 py-6 text-sm text-white/60 flex justify-between">
          <span>Crafted with ❤️ for puzzle lovers</span>
          <span>Scroll down to skip the animation</span>
        </footer>
      </div>
    </div>
  );
}

function BallPitBackground({ balls }: { balls: Ball[] }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black opacity-90" />
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="ballpit-orb mix-blend-screen"
          style={{
            width: ball.size,
            height: ball.size,
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            background: `radial-gradient(circle at 30% 30%, ${ball.colors[0]}, ${ball.colors[1]})`,
            animationDuration: `${ball.duration}s`,
            animationDelay: `${ball.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function createBalls(): Ball[] {
  return Array.from({ length: BALL_COUNT }, (_, idx) => {
    const size = Math.round(80 + Math.random() * 140);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 16 + Math.random() * 16;
    const delay = Math.random() * 12;
    const colors = COLOR_PALETTE[idx % COLOR_PALETTE.length];

    return {
      id: idx,
      size,
      x,
      y,
      duration,
      delay,
      colors,
    };
  });
}

