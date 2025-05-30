import { Hono } from 'hono';
import { createMessage, getMessage } from '../controller/message.js';

const messageRoutes = (app: Hono) => {
  // POST route to create a message
  app.post('/message', async (c) => {
    try {
      const body = await c.req.json();
      console.log('POST /message received:', body);
  
      const { message, expirationMinutes, burnAfterReading, password } = body;
  
      if (!message) {
        return c.json({ error: 'Message is required' }, 400);
      }
  
      const newMessage = await createMessage(message, expirationMinutes, burnAfterReading, password);
      return c.json({ id: newMessage.id });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error(errorMessage);
      return c.json({ error: errorMessage }, 500);
    }
  });

  // GET route to fetch a message by ID
  app.get('/message/:id', async (c) => {
    try {
      const { id } = c.req.param();
      const password = c.req.query('password') || null;

      const decryptedMessage = await getMessage(id, password);

      return c.json({ message: decryptedMessage });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error(errorMessage);
      return c.json({ error: errorMessage }, (err instanceof Error && err.message === 'Message not found') ? 404 : 500);
    }
  });
};

export { messageRoutes };