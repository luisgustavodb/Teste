export interface Testimonial {
  avatarUrl: string;
  name: string;
  time: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface GeminiHistoryEntry {
    role: "user" | "model";
    parts: { text: string }[];
}


export interface ChatSession {
  id: string;
  title: string;
  emoji: string;
  messages: Message[];
  history: GeminiHistoryEntry[];
}
