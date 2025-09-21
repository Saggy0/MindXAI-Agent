"use client";

import { useState } from 'react';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, PhoneOff, Users, Video, VideoOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pods = [
    {
      id: 1,
      title: "Mindful Mondays",
      topic: "Start the week with intention and mindfulness practices.",
      members: 8,
      image: "https://picsum.photos/seed/pod1/600/400",
      imageHint: "zen garden"
    },
    {
      id: 2,
      title: "Fitness Accountability Crew",
      topic: "Share workout goals, celebrate wins, and stay motivated.",
      members: 12,
      image: "https://picsum.photos/seed/pod2/600/400",
      imageHint: "running track"
    },
    {
      id: 3,
      title: "Stoic Reflections",
      topic: "Discuss stoic philosophy and its application to modern life.",
      members: 5,
      image: "https://picsum.photos/seed/pod3/600/400",
      imageHint: "greek statue"
    },
];

const participants = [
    { name: "Ramnarayan", avatar: "https://picsum.photos/seed/avatar-user/100/100" },
    { name: "Alex", avatar: "https://picsum.photos/seed/avatar1/100/100" },
    { name: "Priya", avatar: "https://picsum.photos/seed/avatar2/100/100" },
    { name: "Carlos", avatar: "https://picsum.photos/seed/avatar3/100/100" },
    { name: "Emily", avatar: "https://picsum.photos/seed/avatar4/100/100" },
    { name: "Jordan", avatar: "https://picsum.photos/seed/avatar5/100/100" },
];

export default function PodsPage() {
    const [joinedPod, setJoinedPod] = useState<typeof pods[0] | null>(null);

    const handleJoinPod = (pod: typeof pods[0]) => {
        setJoinedPod(pod);
        toast({
            title: `Joined ${pod.title}!`,
            description: "A confirmation email has been sent. The pod meeting will start soon."
        });
    };

    if (joinedPod) {
        return (
            <div className="flex flex-col h-[calc(100vh-10rem)]">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold tracking-tight">{joinedPod.title}</h2>
                    <p className="text-muted-foreground mt-1">{joinedPod.topic}</p>
                </div>
                <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4 bg-card p-4 rounded-lg">
                    {participants.map(p => (
                        <div key={p.name} className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={p.avatar} alt={p.name} data-ai-hint="person face" />
                                <AvatarFallback>{p.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md">{p.name}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center gap-4 p-4 bg-card rounded-lg">
                    <Button size="lg" variant="secondary" className="bg-green-500 hover:bg-green-600 text-white rounded-full h-16 w-16"><Mic className="h-8 w-8" /></Button>
                    <Button size="lg" variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-16 w-16"><Video className="h-8 w-8" /></Button>
                    <Button size="lg" variant="destructive" className="rounded-full h-16 w-16" onClick={() => setJoinedPod(null)}>
                        <PhoneOff className="h-8 w-8" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Meeting Pods</h2>
                <p className="text-muted-foreground mt-1">
                    Connect with like-minded peers in small support groups.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pods.map(pod => (
                    <Card key={pod.id} className="flex flex-col overflow-hidden group">
                        <CardHeader className="p-0">
                             <div className="relative aspect-[16/9]">
                                <Image src={pod.image} alt={pod.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={pod.imageHint} />
                             </div>
                        </CardHeader>
                        <div className="flex flex-col flex-grow p-6">
                            <CardTitle className="text-xl">{pod.title}</CardTitle>
                            <CardContent className="p-0 mt-2 flex-grow">
                                <p className="text-muted-foreground">{pod.topic}</p>
                            </CardContent>
                            <CardFooter className="p-0 mt-4 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{pod.members} members</span>
                                </div>
                                <Button onClick={() => handleJoinPod(pod)}>Join Pod</Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
