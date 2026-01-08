
import { z } from 'zod';
import { aqiDataSchema, chatRequestSchema, chatResponseSchema, insertUserSchema, users } from './schema';

export const api = {
  aqi: {
    get: {
      method: 'GET' as const,
      path: '/api/aqi',
      input: z.object({
        city: z.string(),
      }),
      responses: {
        200: aqiDataSchema,
        404: z.object({ message: z.string() }),
      },
    },
  },
  chat: {
    post: {
      method: 'POST' as const,
      path: '/api/chat',
      input: chatRequestSchema,
      responses: {
        200: chatResponseSchema,
        500: z.object({ message: z.string() }),
      },
    },
  },
  users: {
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({ username: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
