# Guía de Simulación de Conversaciones (Demo)

Para que el demo de ConnectAI se sienta como una experiencia de IA generativa real (estilo Gemini o ChatGPT), hemos configurado flujos de conversación específicos.

Usa las siguientes preguntas clave en el buscador principal para activar las respuestas detalladas y permitir preguntas de seguimiento.

## 1. Flujo de Recursos Humanos (Empleado)
**Pregunta Inicial:**
> ¿Cuál es el proceso para pedir vacaciones y dónde lleno el formato?

**Pregunta de Seguimiento Sugerida:**
> ¿Puedo pedir vacaciones si solo llevo 6 meses en la empresa?

---

## 2. Flujo de Operaciones / Ventas (Manager)
**Pregunta Inicial:**
> Consultas de ventas por WhatsApp hoy

**Pregunta de Seguimiento Sugerida:**
> ¿Quién es el agente que más chats ha cerrado hoy?

---

## 3. Flujo Estratégico (CEO / Director)
**Pregunta Inicial:**
> ¿Cómo vamos contra los objetivos del año (ARR, margen, retención)?

---

## Notas Técnicas
*   **Interfaz Conversacional**: El sistema ahora utiliza una página de chat dedicada (`ChatPage.tsx`) que simula el "pensamiento" de la IA y permite hilos de conversación continuos.
*   **Fuentes Citadas**: Cada respuesta de la IA incluye enlaces a documentos reales de la base de conocimientos (Notion, Drive, etc.).
*   **Preguntas Genéricas**: Si haces una pregunta que no está en esta guía, ConnectAI buscará en la base de datos de conocimiento general y generará una respuesta basada en el primer resultado encontrado.
