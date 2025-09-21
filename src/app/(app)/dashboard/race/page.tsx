"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, PlusCircle, Star, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const challenges = [
    {
      id: 1,
      title: "Morning Mile Madness",
      description: "Run or walk a mile every morning for 7 days straight. The ultimate test of consistency!",
      creator: "Alex Morgan",
      avatar: "https://picsum.photos/seed/avatar1/100/100",
      participants: 24,
      points: 250,
    },
    {
      id: 2,
      title: "30-Day Yoga Journey",
      description: "Join us for a month of daily yoga to improve flexibility, strength, and mindfulness.",
      creator: "Priya Sharma",
      avatar: "https://picsum.photos/seed/avatar2/100/100",
      participants: 78,
      points: 1500,
    },
    {
      id: 3,
      title: "Hydration Heroes",
      description: "Drink 8 glasses of water every day for two weeks. Let's build a healthy habit together.",
      creator: "Carlos Gomez",
      avatar: "https://picsum.photos/seed/avatar3/100/100",
      participants: 52,
      points: 300,
    },
    {
      id: 4,
      title: "Digital Detox Weekend",
      description: "No screens for 48 hours. Reconnect with yourself and the world around you.",
      creator: "Emily White",
      avatar: "https://picsum.photos/seed/avatar4/100/100",
      participants: 15,
      points: 500,
    },
];

const userStats = {
    points: 1250,
    streak: 3
}

const creationRequirement = {
    points: 2000,
    streak: 5
}

export default function RacePage() {

    const canCreate = userStats.points >= creationRequirement.points && userStats.streak >= creationRequirement.streak;

    const CreateChallengeButton = () => (
        <Dialog>
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="inline-block">
                             <DialogTrigger asChild>
                                <Button size="lg" disabled={!canCreate}>
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Create Challenge
                                </Button>
                            </DialogTrigger>
                        </div>
                    </TooltipTrigger>
                    {!canCreate && (
                        <TooltipContent>
                            <p>You need {creationRequirement.points} points and a {creationRequirement.streak}-day streak to create a challenge.</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create a New Race</DialogTitle>
                <DialogDescription>
                    Design a wellness challenge for the community. Set the rules and inspire others!
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="name">Challenge Name</Label>
                        <Input id="name" placeholder="e.g., Mindful Morning" />
                    </div>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the rules and goals of your challenge." />
                    </div>
                     <div className="grid items-center gap-1.5">
                        <Label htmlFor="points">Points Reward</Label>
                        <Input id="points" type="number" placeholder="e.g., 500" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Publish Challenge</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="space-y-8">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Race Challenges</h2>
                    <p className="text-muted-foreground mt-1">
                        Join user-created wellness challenges or create your own to inspire the community.
                    </p>
                </div>
                <CreateChallengeButton />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {challenges.map(challenge => (
                    <Card key={challenge.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-2">
                                        by
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={challenge.avatar} alt={challenge.creator} data-ai-hint="person face" />
                                            <AvatarFallback>{challenge.creator.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {challenge.creator}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-1 text-primary font-bold bg-accent px-2 py-1 rounded-md">
                                    <Award className="h-4 w-4" />
                                    <span>{challenge.points}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{challenge.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{challenge.participants} Racers</span>
                            </div>
                            <Button>Join Race</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
