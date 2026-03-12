import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import {
    ArrowLeft,
    Send,
    Sparkles,
    User,
    Paperclip,
    Mic,
    RefreshCcw,
    Share2,
    MoreVertical,
    ChevronDown,
    ExternalLink,
    MessageCircle,
    FileText,
    HardDrive,
    BookOpen,
    Github,
    Mail
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import { useAuth } from "../context/AuthContext";
import { getConversationFlow, type ChatMessage } from "../data/mockChats";
import { searchCompanyKnowledge } from "../data/mockData";

const iconMap: { [key: string]: any } = {
    FileText,
    MessageSquare: MessageCircle,
    HardDrive,
    BookOpen,
    Github,
    Mail,
    MessageCircle,
};

export function ChatPage() {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || "";
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize conversation
    useEffect(() => {
        if (queryParam) {
            const initialMessage: ChatMessage = {
                id: "1",
                role: "user",
                content: queryParam,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([initialMessage]);

            // Simulate AI Answer
            generateAIResponse(queryParam, true);
        }
    }, [queryParam]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const generateAIResponse = async (query: string, isInitial: boolean = false) => {
        setIsTyping(true);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const flow = getConversationFlow(query);
        let responseContent = "";
        let sources: any[] = [];

        if (isInitial && flow) {
            // If it's the start of a hardcoded flow
            responseContent = flow.turns[0].content;
            sources = flow.turns[0].sources || [];
        } else {
            // Try to find if the current message matches a follow-up in any flow
            let foundFollowup = false;
            Object.values(getConversationFlow(queryParam)?.turns || []).forEach((turn, idx) => {
                if (idx > 0 && turn.role === "assistant" && messages[messages.length - 1]?.content === getConversationFlow(queryParam)?.turns[idx - 1].content) {
                    // This is a bit simplified, but let's try to match content
                }
            });

            // Look specifically at the mock flow for the current context
            const currentFlow = getConversationFlow(queryParam);
            if (currentFlow) {
                const nextTurnIdx = messages.length;
                if (currentFlow.turns[nextTurnIdx]) {
                    responseContent = currentFlow.turns[nextTurnIdx].content;
                    sources = currentFlow.turns[nextTurnIdx].sources || [];
                } else {
                    // Generic fallback for the flow theme
                    responseContent = `Tengo más información sobre ese tema en los archivos de la empresa. ¿Hay algún detalle específico que quieras profundizar sobre "${query}"?`;
                }
            } else {
                // Search mock data for relevant info
                const results = searchCompanyKnowledge(query);
                if (results.length > 0) {
                    responseContent = `He analizado tus documentos y parece que ${results[0].content.substring(0, 200)}... Puedes encontrar más detalles en ${results[0].source}.`;
                    sources = results.slice(0, 2);
                } else {
                    responseContent = "No pude encontrar información específica en los documentos actuales. ¿Podrías reformular tu pregunta o darme más contexto?";
                }
            }
        }

        const aiMessage: ChatMessage = {
            id: Math.random().toString(),
            role: "assistant",
            content: responseContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sources: sources
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMessage: ChatMessage = {
            id: Math.random().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue("");
        generateAIResponse(currentInput);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Top Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold text-gray-900 tracking-tight">Conversación con ConnectAI</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Motor GPT-4o Enterprise</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400">
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Chat Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 md:px-0 py-8 scroll-smooth"
            >
                <div className="max-w-3xl mx-auto space-y-8">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex animate-in fade-in slide-in-from-bottom-2 duration-500",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "flex gap-4 max-w-[85%]",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}>
                                {/* Avatar */}
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                                    msg.role === "user" ? "bg-indigo-100" : "bg-indigo-600 shadow-lg shadow-indigo-100"
                                )}>
                                    {msg.role === "user" ? (
                                        user?.picture ? (
                                            <img src={user.picture} alt="" className="w-full h-full rounded-lg object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-indigo-600" />
                                        )
                                    ) : (
                                        <Sparkles className="w-4 h-4 text-white" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed",
                                        msg.role === "user"
                                            ? "bg-gray-100 text-gray-800 rounded-tr-none"
                                            : "bg-white border border-gray-100 text-gray-900 shadow-sm rounded-tl-none"
                                    )}>
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                    </div>

                                    {/* Sources / Citations */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-2 delay-300">
                                            {msg.sources.map((src, i) => {
                                                const Icon = iconMap[src.sourceIcon] || FileText;
                                                return (
                                                    <div
                                                        key={src.id}
                                                        className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-indigo-50 border border-gray-100 rounded-xl cursor-pointer transition-all group"
                                                    >
                                                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                                                            <Icon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="text-[11px] font-medium text-gray-600 group-hover:text-indigo-700 truncate max-w-[120px]">
                                                            {src.title}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            <button className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest pl-2 hover:text-indigo-700 transition-colors">
                                                Ver +{msg.sources.length} fuentes
                                            </button>
                                        </div>
                                    )}

                                    <div className={cn(
                                        "text-[10px] text-gray-400 font-medium px-1",
                                        msg.role === "user" ? "text-right" : "text-left"
                                    )}>
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="flex gap-4 max-w-[85%]">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Chat Input */}
            <div className="border-t border-gray-100 p-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <form
                        onSubmit={handleSendMessage}
                        className="relative bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all"
                    >
                        <div className="flex items-center px-2 gap-2">
                            <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600 rounded-lg">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe una pregunta de seguimiento..."
                                className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-sm py-6"
                                disabled={isTyping}
                            />
                            <div className="flex items-center gap-1">
                                <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600 rounded-lg">
                                    <Mic className="w-5 h-5" />
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all px-4"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Enviar
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 flex items-center justify-center gap-4">
                        <p className="text-[10px] text-gray-400 text-center font-medium">
                            ConnectAI puede cometer errores. Verifica la información importante con las fuentes citadas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
