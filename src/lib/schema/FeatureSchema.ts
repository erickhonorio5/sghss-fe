import { z } from "zod";

export const featureSchema = z.object({
    id: z.number(),
    icon: z.string().url(),
    title: z.string().min(3),
    description: z.string().min(10)
});

export type Feature = z.infer<typeof featureSchema>;