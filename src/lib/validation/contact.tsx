import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter your correct email address'),
  subject: z
    .string()
    .min(1, 'Subject line is required')
    .max(100, 'Please enter a subject line of no more than 100 characters'),
  message: z
    .string()
    .min(10, 'Please enter a message of at least 10 characters')
    .max(1000, 'Please enter your message in 1000 characters or less'),
});
