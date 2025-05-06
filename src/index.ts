import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { messageRoutes } from './routes/message.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.use(
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://lockit.up.railway.app',
        'https://lockitt.netlify.app',
      ];
      // Allow only the allowed origins
      return allowedOrigins.includes(origin ?? '') ? origin : '';
    },
    credentials: true, // Allow credentials (cookies, etc.)
    allowMethods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

app.use(logger());




messageRoutes(app);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
