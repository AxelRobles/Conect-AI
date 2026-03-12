import type { SearchResult } from "./mockData";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    sources?: SearchResult[];
}

export interface MockChatFlow {
    initialQuery: string;
    turns: Omit<ChatMessage, "id" | "timestamp">[];
}

export const mockChatFlows: Record<string, MockChatFlow> = {
    // Empleado Flow: Vacaciones
    "vacaciones": {
        initialQuery: "¿Cuál es el proceso para pedir vacaciones y dónde lleno el formato?",
        turns: [
            {
                role: "assistant",
                content: "Para solicitar vacaciones en ConnectAI, debes seguir el proceso establecido en el manual de beneficios. \n\n1. **Verifica tus días disponibles**: Puedes consultarlos en el portal de Nómina.\n2. **Llena el formato digital**: El formato oficial se encuentra en [Portal RH/Vacaciones](https://ejemplo.com/form-vacaciones).\n3. **Aprobación**: Tu manager directo debe aprobar la solicitud con al menos 2 semanas de anticipación.",
                sources: [
                    {
                        id: "v1",
                        title: "Política de Vacaciones 2024",
                        content: "Manual detallado sobre días de descanso, prima vacacional y procesos de solicitud.",
                        author: "Recursos Humanos",
                        source: "Notion",
                        sourceIcon: "BookOpen",
                        timestamp: "hace 2 meses",
                        relevance: 98
                    }
                ]
            },
            {
                role: "user",
                content: "¿Puedo pedir vacaciones si solo llevo 6 meses en la empresa?"
            },
            {
                role: "assistant",
                content: "De acuerdo con la nueva Ley Federal del Trabajo en México y nuestra política interna, tienes derecho a disfrutar de vacaciones proporcionales a partir de los 6 meses, aunque lo estándar es esperar al primer año para los 12 días completos. Te sugiero revisar el apartado 'Adelanto de vacaciones' en el manual de RH."
            }
        ]
    },
    // Manager Flow: Ventas WhatsApp
    "whatsapp": {
        initialQuery: "Consultas de ventas por WhatsApp hoy",
        turns: [
            {
                role: "assistant",
                content: "Hoy se han registrado **14 nuevas consultas** de ventas a través de WhatsApp Business. \n\n*   **8 consultas** son sobre el nuevo plan Enterprise.\n*   **4 consultas** solicitan un demo personalizado.\n*   **2 consultas** son seguimientos de precios.\n\nEl tiempo promedio de respuesta actual es de 12 minutos.",
                sources: [
                    {
                        id: "w1",
                        title: "Log de WhatsApp Business - 11 Marzo",
                        content: "Resumen de interacciones, leads generados y estado de los chats de venta.",
                        author: "Sistema WhatsApp",
                        source: "WhatsApp Business",
                        sourceIcon: "MessageCircle",
                        timestamp: "hace 1 hora",
                        relevance: 100
                    }
                ]
            },
            {
                role: "user",
                content: "¿Quién es el agente que más chats ha cerrado hoy?"
            },
            {
                role: "assistant",
                content: "El agente con mayor actividad hoy es **Ricardo Torres**, con 6 cierres exitosos y una calificación de satisfacción de 4.8/5. Le sigue Sofía Méndez con 4 cierres."
            }
        ]
    },
    // CEO Flow: OKRs
    "okrs": {
        initialQuery: "¿Cómo vamos contra los objetivos del año (ARR, margen, retención)?",
        turns: [
            {
                role: "assistant",
                content: "Al cierre del Q1, estas son las métricas clave vs objetivos:\n\n*   **ARR**: $4.2M (Objetivo: $4.0M) - **+5% sobre el plan** 📈\n*   **Margen Bruto**: 68% (Objetivo: 70%) - **Slightly under** ⚠️\n*   **Retención (NDR)**: 105% (Objetivo: 102%) - **Strong performance** ✅\n\nEl crecimiento en el mercado mexicano ha sido el principal motor este trimestre.",
                sources: [
                    {
                        id: "ceo1",
                        title: "Dashboard Financiero Q1 2024",
                        content: "Reporte consolidado de ingresos, costos operativos y métricas de retención de clientes.",
                        author: "Finanzas",
                        source: "Google Drive",
                        sourceIcon: "HardDrive",
                        timestamp: "hace 3 días",
                        relevance: 95
                    }
                ]
            }
        ]
    }
};

export const getConversationFlow = (query: string): MockChatFlow | null => {
    const q = query.toLowerCase();
    if (q.includes("vacaciones")) return mockChatFlows["vacaciones"];
    if (q.includes("whatsapp") || q.includes("ventas")) return mockChatFlows["whatsapp"];
    if (q.includes("okr") || q.includes("objetivos") || q.includes("arr")) return mockChatFlows["okrs"];
    return null;
};
