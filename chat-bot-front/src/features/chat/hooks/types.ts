import { z } from 'zod';

export const promptSchema = z.string().min(1, "Prompt cannot be empty").max(999, "Prompt is too long");