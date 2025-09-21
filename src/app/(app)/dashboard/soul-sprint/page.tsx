"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Dumbbell,
  Flower,
  Footprints,
  GlassWater,
  Sparkles,
  Upload,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HexagonBadge } from "@/components/hexagon-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { validateImageAction } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const badges = [
  { id: "yoga", title: "30 Min Yoga", icon: Flower, isUnlocked: true, imageUrl: "https://picsum.photos/seed/yoga/400/400", desc: "Complete a 30-minute yoga session. Focus on your breath and find your flow." },
  { id: "meditation", title: "15 Min Meditation", icon: Sparkles, isUnlocked: true, imageUrl: "https://picsum.photos/seed/meditation/400/400", desc: "Practice 15 minutes of mindfulness meditation. Clear your mind and be present." },
  { id: "reading", title: "Read 1 Chapter", icon: BookOpen, isUnlocked: false, desc: "Read one chapter of any book. Expand your mind and escape into a story." },
  { id: "walking", title: "5k Steps Walk", icon: Footprints, isUnlocked: true, imageUrl: "https://picsum.photos/seed/walking/400/400", desc: "Go for a walk and achieve at least 5,000 steps. Enjoy the fresh air." },
  { id: "workout", title: "Home Workout", icon: Dumbbell, isUnlocked: false, desc: "Complete a 20-minute home workout. Get your body moving and feel the energy." },
  { id: "hydration", title: "2L Water", icon: GlassWater, isUnlocked: false, desc: "Stay hydrated by drinking at least 2 liters of water throughout the day." },
];

type BadgeType = (typeof badges)[0];

export default function SoulSprintPage() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !selectedBadge) return;
    setIsLoading(true);

    try {
      const result = await validateImageAction({
        photoDataUri: imagePreview!,
        activityDescription: selectedBadge.desc,
      });

      if (result.success && result.data) {
        if (result.data.isValid) {
          toast({
            title: "Badge Unlocked!",
            description: `Congratulations, you've earned the ${selectedBadge.title} badge.`,
            variant: "default",
          });
          // Here you would update the badge state in your database
        } else {
          toast({
            title: "Image Invalid",
            description: result.data.reason,
            variant: "destructive",
          });
        }
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: error instanceof Error ? error.message : "Could not validate image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      handleCloseDialog();
    }
  };
  
  const handleCloseDialog = () => {
    setSelectedBadge(null);
    setImageFile(null);
    setImagePreview(null);
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="https://picsum.photos/seed/sprint-hero/1200/400" alt="Soul Sprint Hero" fill className="object-cover" data-ai-hint="serene landscape" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-3xl font-bold tracking-tight text-white">Soul Sprints</h2>
              <p className="text-white/80 max-w-xl mt-2">Complete daily wellness activities to earn unique badges. Submit proof of your activity to claim your reward.</p>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 justify-items-center">
          {badges.map((badge) => (
            <HexagonBadge
              key={badge.id}
              {...badge}
              onClick={() => !badge.isUnlocked && setSelectedBadge(badge)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedBadge} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Unlock: {selectedBadge?.title}</DialogTitle>
            <DialogDescription>{selectedBadge?.desc}</DialogDescription>
            <DialogDescription className="pt-2 text-primary font-semibold">Submit an image to prove completion.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Image Submission</Label>
              {imagePreview ? (
                <div className="relative aspect-video w-full">
                  <Image src={imagePreview} alt="Preview" fill className="rounded-md object-cover" />
                  <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setImageFile(null); setImagePreview(null); }}>
                    Remove
                  </Button>
                </div>
              ) : (
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                  </div>
                  <Input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                </Label>
              )}
            </div>
             <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>AI Validation</AlertTitle>
              <AlertDescription>
                Our AI agent will verify that your image matches the wellness activity.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!imageFile || isLoading}>
              {isLoading ? "Validating..." : "Submit for Validation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
