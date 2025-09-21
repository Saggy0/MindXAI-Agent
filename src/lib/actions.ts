"use server";

import {
  validateSoulSprintImage,
  type ValidateSoulSprintImageInput,
} from "@/ai/flows/ai-soul-sprint-image-validation";
import { 
  getYoutubeRecommendations, 
  type GetYoutubeRecommendationsInput
} from "@/ai/flows/youtube-recommendations-flow";
import { nirvanaChat, type NirvanaChatInput } from "@/ai/ai-nirvana-chat";
import { z } from "zod";

const validateImageActionSchema = z.object({
  photoDataUri: z.string(),
  activityDescription: z.string(),
});

export async function validateImageAction(input: ValidateSoulSprintImageInput) {
  const parsedInput = validateImageActionSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: "Invalid input." };
  }

  try {
    const result = await validateSoulSprintImage(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in validateImageAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during image validation.";
    return { success: false, error: errorMessage };
  }
}

const getYoutubeRecommendationsActionSchema = z.object({
  question: z.string(),
});

export async function getYoutubeRecommendationsAction(input: GetYoutubeRecommendationsInput) {
  const parsedInput = getYoutubeRecommendationsActionSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: "Invalid input." };
  }

  try {
    const result = await getYoutubeRecommendations(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getYoutubeRecommendationsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}

const nirvanaChatActionSchema = z.object({
  message: z.string(),
});

export async function nirvanaChatAction(input: NirvanaChatInput) {
    const parsedInput = nirvanaChatActionSchema.safeParse(input);

    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    try {
        const result = await nirvanaChat(parsedInput.data);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error in nirvanaChatAction:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: errorMessage };
    }
}
