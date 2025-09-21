
'use server';
/**
 * @fileOverview An AI agent that provides YouTube video recommendations based on a user's question.
 *
 * - getYoutubeRecommendations - A function that handles the recommendation process.
 * - GetYoutubeRecommendationsInput - The input type for the getYoutubeRecommendations function.
 * - GetYoutubeRecommendationsOutput - The return type for the getYoutubeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YoutubeRecommendationSchema = z.object({
  videoId: z.string().describe('The YouTube video ID.'),
  title: z.string().describe('The title of the YouTube video.'),
  channel: z.string().describe('The name of the YouTube channel.'),
});
export type YoutubeRecommendation = z.infer<typeof YoutubeRecommendationSchema>;


const GetYoutubeRecommendationsInputSchema = z.object({
  question: z.string().describe("The user's question to get recommendations for."),
});
export type GetYoutubeRecommendationsInput = z.infer<typeof GetYoutubeRecommendationsInputSchema>;

const GetYoutubeRecommendationsOutputSchema = z.object({
  recommendations: z.array(YoutubeRecommendationSchema).describe('A list of YouTube video recommendations.'),
  level: z.enum(['high', 'medium', 'low']).describe('The priority level of the question.'),
});
export type GetYoutubeRecommendationsOutput = z.infer<typeof GetYoutubeRecommendationsOutputSchema>;

export async function getYoutubeRecommendations(input: GetYoutubeRecommendationsInput): Promise<GetYoutubeRecommendationsOutput> {
  return getYoutubeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youtubeRecommendationsPrompt',
  input: {schema: GetYoutubeRecommendationsInputSchema},
  output: {schema: GetYoutubeRecommendationsOutputSchema},
  prompt: `You are a helpful assistant that recommends YouTube videos and assesses the urgency of a user's question related to wellness and mental health.

Based on the user's question, you will provide 3 relevant YouTube video recommendations.
You will also determine if the question's urgency is "high", "medium", or "low". 
High-priority questions might involve crises, severe distress, or urgent need for support.
Medium-priority questions are for general advice or coping strategies.
Low-priority questions are for casual curiosity or mindfulness topics.

User Question: {{{question}}}

For example:
- If the question is "I feel like I'm having a panic attack right now, what do I do?", the level should be 'high'.
- If the question is "How can I deal with stress at work?", the level should be 'medium'.
- If the question is "What are some good meditation channels?", the level should be 'low'.

Return a JSON object with "recommendations" (an array of 3 video objects with videoId, title, and channel) and "level".`,
});

const getYoutubeRecommendationsFlow = ai.defineFlow(
  {
    name: 'getYoutubeRecommendationsFlow',
    inputSchema: GetYoutubeRecommendationsInputSchema,
    outputSchema: GetYoutubeRecommendationsOutputSchema,
  },
  async input => {
    // In a real application, you might use a tool to search YouTube.
    // Here, we are relying on the model's knowledge to generate plausible recommendations.
    const {output} = await prompt(input);
    return output!;
  }
);
