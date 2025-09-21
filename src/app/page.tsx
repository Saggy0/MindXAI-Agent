
"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed w-full z-20 top-0">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="sr-only">mindX Agent</span>
          <span className="ml-2 text-lg font-bold">mindX Agent</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#sprints"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sprints
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40 border-y relative">
             <Image
                src="https://picsum.photos/seed/home-hero/1920/1080"
                alt="Hero Background"
                fill
                className="object-cover opacity-10 z-0"
                data-ai-hint="abstract background"
            />
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 relative z-10">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Unlock Your Potential with mindX Agent
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  A gamified wellness platform with AI-powered guidance to help you build healthy habits and thrive.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center">
                 <Image
                    src="https://picsum.photos/seed/mindx-hero-img/600/600"
                    alt="Wellness"
                    width={600}
                    height={600}
                    className="rounded-xl object-cover"
                    data-ai-hint="person meditating"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Personal Wellness Toolkit</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  mindX Agent combines gamification, community, and AI to create a holistic wellness experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1 p-4 rounded-lg bg-card shadow-sm">
                <h3 className="text-lg font-bold">Gamified Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Earn points and badges by completing wellness activities in Soul Sprints and user-created Races.
                </p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg bg-card shadow-sm">
                <h3 className="text-lg font-bold">AI Companion "Nirvana"</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized guidance, ask questions, and receive YouTube recommendations from your AI wellness guide.
                </p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg bg-card shadow-sm">
                <h3 className="text-lg font-bold">Community Pods</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded peers in small, topic-focused video chat groups for support and accountability.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="sprints" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Prove Your Progress with AI Validation</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                In Soul Sprints, you complete daily wellness tasks and submit an image as proof. Our AI agent verifies that your submission matches the activity, ensuring fair play and real progress.
              </p>
            </div>
             <div className="flex justify-center">
                <Image src="https://picsum.photos/seed/sprint-img/600/400" width={600} height={400} alt="Soul Sprint" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover" data-ai-hint="person hiking" />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 mindX Agent. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

    