// src/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'langchain';
import { supabase } from '../../../../lib/supabaseClient';

const openAI = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, message } = req.body;

    // Save message to the database
    await supabase.from('ChatMessage').insert({
      content: message,
      role: 'user',
      userId,
    });

    try {
      // Define logic for different types of queries
      let prompt = message;
      if (message.includes('venue suggestion')) {
        prompt = `Suggest venues for ${message}`;
      } else if (message.includes('logistics')) {
        prompt = `Provide logistics advice for ${message}`;
      }

      // Get AI response
      const response = await openAI.complete({
        prompt,
        model: 'text-davinci-003',
        maxTokens: 150,
      });

      // Save response to the database
      await supabase.from('ChatMessage').insert({
        content: response.choices[0].text,
        role: 'assistant',
        userId,
      });

      res.status(200).json({ message: response.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: 'Error generating response' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

