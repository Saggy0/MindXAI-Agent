'use server';
/**
 * @fileOverview An AI agent that validates images submitted for Soul Sprint badges to ensure they align with the wellness activity.
 *
 * - validateSoulSprintImage - A function that handles the image validation process.
 * - ValidateSoulSprintImageInput - The input type for the validateSoulSprintImage function.
 * - ValidateSoulSprintImageOutput - The return type for the validateSoulSprintImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateSoulSprintImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo submitted for a Soul Sprint badge, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  activityDescription: z.string().describe('The description of the wellness activity for the Soul Sprint badge.'),
});
export type ValidateSoulSprintImageInput = z.infer<typeof ValidateSoulSprintImageInputSchema>;

const ValidateSoulSprintImageOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the image is valid for the given wellness activity.'),
  reason: z.string().describe('The reason why the image is invalid, if applicable.'),
});
export type ValidateSoulSprintImageOutput = z.infer<typeof ValidateSoulSprintImageOutputSchema>;

export async function validateSoulSprintImage(input: ValidateSoulSprintImageInput): Promise<ValidateSoulSprintImageOutput> {
  return validateSoulSprintImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateSoulSprintImagePrompt',
  input: {schema: ValidateSoulSprintImageInputSchema},
  output: {schema: ValidateSoulSprintImageOutputSchema},
  prompt: `You are an AI assistant that validates images submitted for Soul Sprint badges to ensure they align with the wellness activity.\n\nYou will receive a photo and a description of the wellness activity. You will determine whether the image is valid for the given activity.\n\nIf the image is not valid, you will provide a reason why.\n\nDescription of wellness activity: {{{activityDescription}}}\nPhoto: {{media url=photoDataUri}}\n\nConsider these examples:\nUser is doing a walking soul sprint and submits a photo of them at the park, the image is valid.\nUser is doing a yoga soul sprint and submits a photo of them at a restaurant, the image is invalid.\nUser is doing a meditation soul sprint and submits a photo of them meditating, the image is valid.\nUser is doing a reading soul sprint and submits a photo of their pet, the image is invalid.\n\nOutput in JSON format:\n{
  "isValid": true or false,
  "reason": "reason why the image is invalid, if applicable"
}`,
});

const validateSoulSprintImageFlow = ai.defineFlow(
  {
    name: 'validateSoulSprintImageFlow',
    inputSchema: ValidateSoulSprintImageInputSchema,
    outputSchema: ValidateSoulSprintImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
