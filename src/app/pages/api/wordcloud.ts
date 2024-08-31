// // src/pages/api/wordcloud.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '../../../../lib/supabaseClient';

// interface Message {
//   content: string;
// }

// interface WordCount {
//   text: string;
//   value: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Fetch messages from the database
//     const { data: messages, error } = await supabase
//       .from<Message>('ChatMessage')
//       .select('content')
//       .eq('role', 'user');

//     if (error) {
//       throw new Error('Error fetching messages');
//     }

//     // Count word occurrences
//     const wordCounts: Record<string, number> = {};
//     messages?.forEach(({ content }: Message) => {
//       content.split(/\s+/).forEach((word: string) => {
//         const cleanedWord = word.toLowerCase().replace(/[^\w]/g, ''); // Clean punctuation
//         if (cleanedWord.length > 3 && !['the', 'and', 'a', 'of'].includes(cleanedWord)) {
//           wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
//         }
//       });
//     });

//     // Format the data for react-wordcloud
//     const wordCloudData: WordCount[] = Object.entries(wordCounts).map(([word, count]) => ({ text: word, value: count }));

//     res.status(200).json(wordCloudData);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// }
