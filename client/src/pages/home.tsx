import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { puzzleImages, type PuzzleImageId, type PuzzleSize } from "@shared/schema";
import { LayoutGrid, Grid3x3 } from "lucide-react";
import { motion } from "framer-motion";

import mehrangarhImg from "@assets/stock_images/mehrangarh_fort_jodh_e91f273d.jpg";
import blueCityImg from "@assets/stock_images/jodhpur_blue_city_ae_458ca24a.jpg";
import ghantaGharImg from "@assets/stock_images/ghanta_ghar_clock_to_35fa07b3.jpg";
import umaidBhavanImg from "@assets/stock_images/umaid_bhavan_palace__3cd5570e.jpg";
import jaswantThadaImg from "@assets/stock_images/jaswant_thada_white__a863f28a.jpg";
import stepwellImg from "@assets/stock_images/toorji_ka_jhalra_ste_72c4e8ae.jpg";

const imageMap: Record<PuzzleImageId, string> = {
  mehrangarh: mehrangarhImg,
  blueCity: blueCityImg,
  ghantaGhar: ghantaGharImg,
  umaidBhavan: umaidBhavanImg,
  jaswantThada: jaswantThadaImg,
  stepwell: stepwellImg,
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<PuzzleImageId | null>(null);
  const [selectedSize, setSelectedSize] = useState<PuzzleSize>("4x4");

  const handleStartGame = () => {
    if (selectedImage) {
      setLocation(`/game?image=${selectedImage}&size=${selectedSize}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground" data-testid="text-title">
            Jodhpur Puzzle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
            Experience the beauty of Rajasthan's Blue City through an elegant sliding puzzle
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6 text-center" data-testid="text-select-image">
              Select a Landmark
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(puzzleImages).map(([id, image]) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`cursor-pointer overflow-hidden aspect-square relative group ${
                      selectedImage === id ? "ring-4 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(id as PuzzleImageId)}
                    data-testid={`card-image-${id}`}
                  >
                    <img
                      src={imageMap[id as PuzzleImageId]}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
                      <p className="text-white font-medium text-center text-sm md:text-base">
                        {image.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6 text-center" data-testid="text-select-size">
              Choose Difficulty
            </h2>
            <div className="flex gap-4 justify-center">
              <Button
                variant={selectedSize === "4x4" ? "default" : "outline"}
                size="lg"
                className="min-w-[140px] h-16 flex flex-col items-center justify-center gap-1"
                onClick={() => setSelectedSize("4x4")}
                data-testid="button-size-4x4"
              >
                <Grid3x3 className="w-5 h-5" />
                <span className="font-medium">4×4 Grid</span>
              </Button>
              <Button
                variant={selectedSize === "5x5" ? "default" : "outline"}
                size="lg"
                className="min-w-[140px] h-16 flex flex-col items-center justify-center gap-1"
                onClick={() => setSelectedSize("5x5")}
                data-testid="button-size-5x5"
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">5×5 Grid</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              disabled={!selectedImage}
              onClick={handleStartGame}
              className="min-w-[200px] h-14 text-lg"
              data-testid="button-start-game"
            >
              Start Puzzle
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
