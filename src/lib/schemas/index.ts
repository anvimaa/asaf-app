import { z } from 'zod';

export const categorySchema = z.object({
    categoryName: z.string().min(3, 'Nome muito curto!'),
    description: z.string().optional(),
});
