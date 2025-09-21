'use server';

/**
 * @fileOverview AI-powered chat interface for wellness guidance using Groq API.
 *
 * - nirvanaChat - A function that handles the AI chat process.
 * - NirvanaChatInput - The input type for the nirvanaChat function.
 * - NirvanaChatOutput - The return type for the nirvanaChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NirvanaChatInputSchema = z.object({
  message: z.string().describe('The user message to send to the AI chatbot.'),
});
export type NirvanaChatInput = z.infer<typeof NirvanaChatInputSchema>;

const NirvanaChatOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response.'),
});
export type NirvanaChatOutput = z.infer<typeof NirvanaChatOutputSchema>;

export async function nirvanaChat(input: NirvanaChatInput): Promise<NirvanaChatOutput> {
  return nirvanaChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nirvanaChatPrompt',
  input: {schema: NirvanaChatInputSchema},
  output: {schema: NirvanaChatOutputSchema},
  prompt: `You are a wellness guide providing support and guidance to the user.\nUser message: {{{message}}}`,
});

const nirvanaChatFlow = ai.defineFlow(
  {
    name: 'nirvanaChatFlow',
    inputSchema: NirvanaChatInputSchema,
    outputSchema: NirvanaChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
