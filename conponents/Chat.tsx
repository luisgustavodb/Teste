

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat as GeminiChat } from "@google/genai";
import { SendIcon, LogoIcon, TrashIcon, PlusIcon, MenuIcon } from '../constants';
import { ChatSession, Message, GeminiHistoryEntry } from '../types';

// NOTE: This relies on process.env.API_KEY being set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `Você é a MindfulMe, uma assistente de IA amigável e solidária, especializada em psicologia e bem-estar mental. Seu propósito é oferecer apoio, insights e informações úteis sobre saúde mental. Seja direta, mas sempre empática e gentil. Mantenha a conversa focada estritamente em tópicos de psicologia, como estresse, ansiedade, autoconhecimento, relacionamentos, e técnicas de mindfulness. Se o usuário tentar desviar para outros assuntos (como política, fofocas, matemática, etc.), gentilmente redirecione a conversa de volta para o seu propósito principal, explicando que seu conhecimento é limitado a temas de bem-estar. Lembre sempre ao usuário que você é uma IA e não substitui um profissional de saúde licenciado. Se a conversa indicar uma necessidade séria ou uma crise, sugira fortemente que o usuário procure um terapeuta ou psicólogo qualificado. Comece a primeira conversa se apresentando brevemente.`;

const titleGenSystemInstruction = `Com base na seguinte mensagem do usuário, gere um título curto e descritivo (máximo de 5 palavras) em português e um único emoji relevante para esta sessão de chat. Retorne APENAS um objeto JSON válido no formato {"title": "...", "emoji": "..."}. Não adicione nenhum outro texto ou formatação markdown.`;


interface ChatComponentProps {
    userName: string | null;
    avatarUrl: string;
    chatSessions: ChatSession[];
    activeChatId: string | null;
    onSelectChat: (id: string) => void;
    onNewChat: () => void;
    onUpdateChat: (session: ChatSession) => void;
    onDeleteChat: (id: string) => void;
    onDeleteAllChats: () => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userName, avatarUrl, chatSessions, activeChatId, onSelectChat, onNewChat, onUpdateChat, onDeleteChat, onDeleteAllChats }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const activeChat = chatSessions.find(s => s.id === activeChatId);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    const handleSelectChatAndCloseSidebar = (id: string) => {
        onSelectChat(id);
        setIsSidebarOpen(false);
    }
    
    const handleNewChatAndCloseSidebar = () => {
        onNewChat();
        setIsSidebarOpen(false);
    }

    useEffect(scrollToBottom, [activeChat?.messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !activeChatId) return;

        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const userMessage: Message = { role: 'user', text: currentInput };
        let updatedSession: ChatSession;

        const isNewChat = !activeChat || activeChat.messages.length === 0;

        if (isNewChat) {
            updatedSession = {
                id: activeChatId,
                title: 'Novo Chat...',
                emoji: '💬',
                messages: [userMessage],
                history: []
            };
            onUpdateChat(updatedSession);
        } else {
            updatedSession = {
                ...activeChat!,
                messages: [...activeChat!.messages, userMessage],
            };
        }

        try {
            if (isNewChat) {
                const titleResponse = await ai.models.generateContent({
                     model: "gemini-2.5-flash-preview-04-17",
                     contents: `User message: "${currentInput}"`,
                     config: {
                        systemInstruction: titleGenSystemInstruction,
                        responseMimeType: "application/json",
                     }
                });

                let jsonStr = titleResponse.text.trim();
                const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
                const match = jsonStr.match(fenceRegex);
                if (match && match[2]) {
                  jsonStr = match[2].trim();
                }
                try {
                    const { title, emoji } = JSON.parse(jsonStr);
                    updatedSession.title = title;
                    updatedSession.emoji = emoji;
                } catch (jsonError) {
                    console.error("Failed to parse title/emoji JSON:", jsonError);
                    updatedSession.title = "Chat sobre " + currentInput.slice(0, 15);
                    updatedSession.emoji = "🗣️";
                }
            }
            
            const chatHistory = updatedSession.history || [];
            const chat: GeminiChat = ai.chats.create({
                model: 'gemini-2.5-flash-preview-04-17',
                config: { systemInstruction },
                history: chatHistory,
            });

            const result = await chat.sendMessageStream({ message: currentInput });
            
            let modelResponseText = '';
            updatedSession.messages.push({ role: 'model', text: '' });
            onUpdateChat(updatedSession);
            
            for await (const chunk of result) {
                if (chunk.text) {
                    modelResponseText += chunk.text;
                    const streamingSession = {
                        ...updatedSession,
                        messages: updatedSession.messages.map((m, i) => i === updatedSession.messages.length - 1 ? { ...m, text: modelResponseText } : m)
                    };
                    onUpdateChat(streamingSession);
                }
            }

            const finalHistory = await chat.getHistory();
            const finalSession = {
                ...updatedSession,
                messages: updatedSession.messages.map((m, i) => i === updatedSession.messages.length - 1 ? { ...m, text: modelResponseText } : m),
                history: finalHistory as GeminiHistoryEntry[]
            };
            onUpdateChat(finalSession);

        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage = { role: 'model' as const, text: 'Desculpe, algo deu errado. Não consegui processar sua mensagem.' };
            const errorSession = { ...updatedSession, messages: [...updatedSession.messages, errorMessage] };
            onUpdateChat(errorSession);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex w-full h-full my-8 sm:my-12 relative">
             {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}
            {/* Sidebar */}
            <div className={`
                absolute top-0 left-0 h-full w-4/5 max-w-sm flex flex-col bg-slate-50 p-3 z-40
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:w-1/4 md:max-w-xs md:h-auto md:rounded-xl md:border md:border-gray-200/80 md:z-auto
            `}>
                <button 
                    onClick={handleNewChatAndCloseSidebar}
                    className="flex items-center justify-center w-full p-2 mb-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                    <PlusIcon />
                    <span className="ml-2">Novo Chat</span>
                </button>
                <div className="flex-grow overflow-y-auto pr-1 space-y-2">
                    {chatSessions.map(session => (
                        <div key={session.id} className={`group flex items-center p-2 rounded-lg cursor-pointer transition-colors ${activeChatId === session.id ? 'bg-brand-blue/20' : 'hover:bg-gray-200'}`} onClick={() => handleSelectChatAndCloseSidebar(session.id)}>
                            <span className="text-xl mr-3">{session.emoji || '💬'}</span>
                            <span className="flex-grow text-sm font-medium text-gray-800 truncate">{session.title || 'Novo Chat'}</span>
                             <button onClick={(e) => { e.stopPropagation(); onDeleteChat(session.id); }} className="p-1 rounded-md text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <TrashIcon />
                            </button>
                        </div>
                    ))}
                </div>
                {chatSessions.length > 0 && (
                    <button 
                        onClick={onDeleteAllChats}
                        className="w-full mt-4 p-2 text-sm text-red-600 font-medium hover:bg-red-100 rounded-lg transition-colors"
                    >
                        Limpar todos os chats
                    </button>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="flex-grow bg-white rounded-xl border border-gray-200/80 shadow-lg flex flex-col min-h-0 md:ml-6">
                {!activeChatId ? (
                     <div className="flex flex-col items-center justify-center h-full text-center p-4 relative">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden absolute top-4 left-4 p-2 rounded-md hover:bg-gray-100">
                           <MenuIcon />
                        </button>
                        <img src={avatarUrl} alt="Seu avatar" className="w-24 h-24 rounded-full object-cover mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mt-2">Pronto para conversar, {userName?.split(' ')[0] || 'Usuário'}?</h2>
                        <p className="text-gray-600 mt-2">Selecione uma conversa ou inicie um novo chat para começar.</p>
                     </div>
                ) : (
                <>
                <div className="p-4 border-b border-gray-200 flex items-center gap-4 md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 rounded-md hover:bg-gray-100">
                        <MenuIcon />
                    </button>
                    <div className="flex items-center gap-3 overflow-hidden">
                       <span className="text-xl">{activeChat?.emoji || '💬'}</span>
                       <h3 className="font-semibold text-gray-800 truncate">{activeChat?.title || 'Chat'}</h3>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto mb-4 p-4 sm:p-6 space-y-6">
                    {activeChat?.messages.map((msg, index) => (
                         <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                    <LogoIcon />
                                </div>
                            )}
                            <div className={`flex flex-col max-w-xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <p className="text-sm text-gray-600 font-medium mb-1">
                                    {msg.role === 'user' ? (userName?.split(' ')[0] || 'Você') : 'MindfulMe'}
                                </p>
                                <div className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-slate-100 text-gray-800 rounded-bl-none'}`}>
                                    {msg.text}
                                    {isLoading && msg.role === 'model' && index === activeChat.messages.length - 1 && <span className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></span>}
                                </div>
                            </div>
                            {msg.role === 'user' && (
                                <img 
                                    src={avatarUrl} 
                                    alt={userName || 'User avatar'} 
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0" 
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 sm:p-6 border-t border-gray-200/80 bg-white rounded-b-xl">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-4">
                      <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSendMessage(e); }}
                          placeholder={isLoading ? "MindfulMe está digitando..." : "Digite sua mensagem..."}
                          disabled={isLoading}
                          className="flex-grow w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:text-sm transition disabled:bg-gray-100"
                      />
                      <button
                          type="submit"
                          disabled={!input.trim() || isLoading}
                          className="flex-shrink-0 bg-brand-blue text-white rounded-lg p-3 hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-brand-blue/50 disabled:cursor-not-allowed transition-colors"
                      >
                          <SendIcon />
                      </button>
                  </form>
                </div>
                </>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;