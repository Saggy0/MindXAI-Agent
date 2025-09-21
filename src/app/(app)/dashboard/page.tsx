"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Hexagon } from "lucide-react";
import { addDays, format } from "date-fns";

const StatCard = ({ icon, title, value, unit }: { icon: React.ElementType, title: string, value: string | number, unit: string }) => {
    const Icon = icon;
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{unit}</p>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const today = new Date();
    const [date, setDate] = useState<Date | undefined>(today);
    
    // Mock streak days
    const streakDays = [
        today,
        addDays(today, -1),
        addDays(today, -2),
        addDays(today, -4),
        addDays(today, -5),
        addDays(today, -8),
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                 <h2 className="text-3xl font-bold tracking-tight">Welcome back, Ramnarayan!</h2>
                 <p className="text-muted-foreground">Here's your wellness snapshot for today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard icon={Flame} title="Current Streak" value="3" unit="Days" />
                <StatCard icon={Star} title="Total Points" value="1,250" unit="XP" />
                <StatCard icon={Hexagon} title="Badges Earned" value="6" unit="This month" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Daily Wellness Quote</CardTitle>
                        <CardDescription>A little inspiration to fuel your day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                            "The greatest wealth is health."
                            <footer className="mt-2 block text-sm text-muted-foreground not-italic">— Virgil</footer>
                        </blockquote>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Streak Calendar</CardTitle>
                         <CardDescription>Your activity this month.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md"
                            modifiers={{ streak: streakDays }}
                            modifiersClassNames={{
                                streak: "bg-primary/20 text-primary-foreground rounded-full",
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
