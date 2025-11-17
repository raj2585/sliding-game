import { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Compass, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { puzzleImages } from "@shared/schema";

const highlights = [
  {
    icon: Crown,
    title: "Global League",
    description: "Secure a unique explorer name and climb the leaderboard.",
  },
  {
    icon: Timer,
    title: "Precision Timing",
    description: "Race against the clock with buttery-smooth tile animations.",
  },
  {
    icon: Compass,
    title: "Iconic Landmarks",
    description: "Rebuild Mehrangarh, Blue City lanes, and more Jodhpur gems.",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const featuredImages = useMemo(() => Object.values(puzzleImages).slice(0, 3), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#fbf7f0] to-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 md:px-10">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Jodhpur Puzzle</span>
          <span>Season 01</span>
        </header>

        <div className="grid flex-1 gap-10 md:grid-cols-[1.05fr,0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Crafted for calm focus
            </p>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
                Slide into Jodhpur&apos;s heritage with a puzzle built for slow mornings and sharp minds.
              </h1>
              <p className="text-lg text-muted-foreground">
                Match the tiles, savor the textures, and log a personal best. Your journey starts by choosing a name that no other explorer can claim.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="h-14 px-10 text-lg"
                onClick={() => setLocation("/enter")}
                data-testid="button-begin"
              >
                Begin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-semibold text-foreground">One tap away</span>
                <span className="text-sm text-muted-foreground">Set your name, then pick a landmark</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <Card key={item.title} className="p-4 space-y-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <Card className="relative overflow-hidden border-primary/20 bg-card/80 backdrop-blur">
              <div className="grid gap-3 p-6">
                {featuredImages.map((image) => (
                  <div
                    key={image.id}
                    className="rounded-2xl overflow-hidden border border-border/60 shadow-sm"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-36 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {image.name}
                      </p>
                      <p className="text-xs text-muted-foreground/80">
                        Handpicked from the Blue City archives
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="pointer-events-none absolute -left-8 top-6 h-24 w-24 rounded-full bg-primary/20 blur-3xl md:-left-12" />
            <div className="pointer-events-none absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
          </motion.div>
        </div>

        <footer className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex justify-between">
          <span>Built in Rajasthan hues</span>
          <span>Optimized for calm play</span>
        </footer>
      </div>
    </div>
  );
}
