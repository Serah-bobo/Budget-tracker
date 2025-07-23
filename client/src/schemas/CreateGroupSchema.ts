import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters"),
  description: z.string().optional(),
  budgetCap: z.coerce.number().min(0, "Budget cap must be ≥ 0").optional(),
});

export type CreateGroupSchemaType = z.infer<typeof createGroupSchema>;
