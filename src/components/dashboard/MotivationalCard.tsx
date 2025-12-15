import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const motivationalMessages = [
  "Você está indo muito bem! Continue assim! 💪",
  "Cada passo conta! Mantenha o ritmo! 🚀",
  "Sua dedicação está fazendo a diferença! ⭐",
  "Você superou suas metas essa semana! 🎉",
  "Continue firme no seu objetivo! 🔥",
];

export const MotivationalCard = () => {
  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <Card className="p-6 gradient-hero text-white shadow-glow animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Mensagem do Dia</h3>
          <p className="text-sm opacity-95">{randomMessage}</p>
        </div>
      </div>
    </Card>
  );
};
