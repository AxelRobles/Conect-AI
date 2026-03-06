// Mock data sources and search results

export interface DataSource {
  id: string;
  name: string;
  type: string;
  icon: string;
  connected: boolean;
  description: string;
  lastSync?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceIcon: string;
  author: string;
  timestamp: string;
  url?: string;
  relevance: number;
}

export const dataSources: DataSource[] = [
  {
    id: "slack",
    name: "Slack",
    type: "Comunicación",
    icon: "MessageSquare",
    connected: true,
    description: "Comunicación de equipo y conversaciones",
    lastSync: "hace 2 minutos",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    type: "Documentos",
    icon: "HardDrive",
    connected: true,
    description: "Documentos, hojas de cálculo y presentaciones",
    lastSync: "hace 5 minutos",
  },
  {
    id: "confluence",
    name: "Confluence",
    type: "Wiki",
    icon: "BookOpen",
    connected: true,
    description: "Documentación de equipo y base de conocimiento",
    lastSync: "hace 10 minutos",
  },
  {
    id: "notion",
    name: "Notion",
    type: "Espacio de trabajo",
    icon: "FileText",
    connected: true,
    description: "Notas, documentos y gestión de proyectos",
    lastSync: "hace 15 minutos",
  },
  {
    id: "github",
    name: "GitHub",
    type: "Código",
    icon: "Github",
    connected: true,
    description: "Repositorios de código y documentación",
    lastSync: "hace 1 hora",
  },
  {
    id: "jira",
    name: "Jira",
    type: "Gestión de Proyectos",
    icon: "CheckSquare",
    connected: false,
    description: "Seguimiento de problemas y gestión de proyectos",
  },
  {
    id: "gmail",
    name: "Gmail",
    type: "Email",
    icon: "Mail",
    connected: false,
    description: "Correo electrónico y comunicaciones de la empresa",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    type: "Almacenamiento",
    icon: "Folder",
    connected: false,
    description: "Almacenamiento y compartición de archivos",
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    type: "Comunicación con Clientes",
    icon: "MessageCircle",
    connected: false,
    description: "Conversaciones con clientes y mensajes de soporte",
  },
];

export const mockSearchResults: { [key: string]: SearchResult[] } = {
  "hoja de ruta q2": [
    {
      id: "1",
      title: "Hoja de Ruta de Producto Q2 2026",
      content:
        "Nuestra hoja de ruta para Q2 se centra en tres iniciativas clave: expandir nuestras capacidades de IA, mejorar el rendimiento móvil y lanzar el nivel empresarial. El equipo de IA priorizará mejoras en procesamiento de lenguaje natural...",
      source: "Confluence",
      sourceIcon: "BookOpen",
      author: "Sarah Johnson",
      timestamp: "Actualizado hace 2 días",
      relevance: 98,
    },
    {
      id: "2",
      title: "#hoja-de-ruta-producto - Discusión en Slack",
      content:
        "@todos: Actualización rápida sobre la hoja de ruta Q2. Hemos finalizado el conjunto de funciones y estamos pasando a la fase de implementación. El rendimiento móvil es nuestra prioridad principal según los comentarios de los clientes...",
      source: "Slack",
      sourceIcon: "MessageSquare",
      author: "Michael Chen",
      timestamp: "hace 3 días",
      relevance: 95,
    },
    {
      id: "3",
      title: "Documento de Planificación Hoja de Ruta Q2",
      content:
        "Objetivos clave para Q2: 1) Lanzar búsqueda con IA, 2) Reducir el tiempo de carga de la aplicación móvil en un 40%, 3) Entregar integración SSO empresarial. Cronograma y dependencias adjuntas...",
      source: "Google Drive",
      sourceIcon: "HardDrive",
      author: "Emily Rodriguez",
      timestamp: "hace 1 semana",
      relevance: 92,
    },
    {
      id: "4",
      title: "Tablero de Hoja de Ruta de Producto",
      content:
        "Las iniciativas Q2 están organizadas por equipo. El equipo de ingeniería se centrará en optimizaciones de rendimiento mientras que el equipo de producto trabaja en funciones de IA. Todos los elementos están etiquetados con niveles de prioridad...",
      source: "Notion",
      sourceIcon: "FileText",
      author: "David Kim",
      timestamp: "hace 4 días",
      relevance: 88,
    },
  ],
  "incorporación": [
    {
      id: "5",
      title: "Guía de Incorporación de Empleados 2026",
      content:
        "¡Bienvenido al equipo! Esta guía te ayudará a comenzar. Semana 1: Completar configuración de TI, conocer a tu equipo y revisar políticas de la empresa. Semana 2: Observar a los miembros del equipo y comenzar el primer proyecto...",
      source: "Confluence",
      sourceIcon: "BookOpen",
      author: "Equipo de RRHH",
      timestamp: "Actualizado ayer",
      relevance: 99,
    },
    {
      id: "6",
      title: "Lista de Verificación de Incorporación de Nuevos Empleados",
      content:
        "Lista de verificación completa para gerentes: Enviar correo de bienvenida, programar orientación, asignar compañero, configurar cuentas (Slack, Gmail, GitHub), pedir equipo, programar reuniones 1-a-1...",
      source: "Notion",
      sourceIcon: "FileText",
      author: "Lisa Martinez",
      timestamp: "hace 2 semanas",
      relevance: 96,
    },
    {
      id: "7",
      title: "#incorporación - Canal",
      content:
        "Este canal es para que los nuevos empleados hagan preguntas y se conecten con el equipo. ¡No dudes en contactarnos! Estamos aquí para ayudarte a tener éxito. Recursos comunes fijados arriba...",
      source: "Slack",
      sourceIcon: "MessageSquare",
      author: "Admin",
      timestamp: "hace 3 meses",
      relevance: 85,
    },
  ],
  "documentación api": [
    {
      id: "8",
      title: "Documentación de API REST",
      content:
        "Nuestra API sigue principios RESTful. La autenticación usa OAuth 2.0. URL base: https://api.company.com/v2. Límites de tasa: 1000 solicitudes por hora para el nivel estándar...",
      source: "GitHub",
      sourceIcon: "Github",
      author: "Equipo de Ingeniería",
      timestamp: "Actualizado hace 1 día",
      relevance: 97,
    },
    {
      id: "9",
      title: "Guía de Integración de API",
      content:
        "Guía paso a paso para integrar nuestra API. Incluye ejemplos de código en Python, JavaScript y Ruby. Casos de uso comunes: recuperación de datos, configuración de webhooks, operaciones masivas...",
      source: "Confluence",
      sourceIcon: "BookOpen",
      author: "Alex Thompson",
      timestamp: "hace 1 semana",
      relevance: 94,
    },
    {
      id: "10",
      title: "Guía de Migración API v2.pdf",
      content:
        "¿Migrando de v1 a v2? Esta guía cubre cambios importantes, nuevos endpoints y funciones obsoletas. Cronograma: la fecha de finalización de v1 es el 1 de julio de 2026...",
      source: "Google Drive",
      sourceIcon: "HardDrive",
      author: "Equipo de Plataforma",
      timestamp: "hace 5 días",
      relevance: 91,
    },
  ],
  "beneficios": [
    {
      id: "11",
      title: "Resumen de Beneficios para Empleados 2026",
      content:
        "El paquete de beneficios completo incluye: Seguro de salud (Médico, Dental, Visión), 401(k) con 5% de igualación, PTO ilimitado, presupuesto de $2000/año para aprendizaje, opciones de trabajo remoto, programa de bienestar...",
      source: "Notion",
      sourceIcon: "FileText",
      author: "Departamento de RRHH",
      timestamp: "Actualizado el mes pasado",
      relevance: 99,
    },
    {
      id: "12",
      title: "Inscripción de Beneficios - Temporada Abierta",
      content:
        "¡La inscripción abierta está activa! Revisa tus selecciones de beneficios y haz cambios antes del 15 de abril. Nuevo este año: cobertura mejorada de salud mental y reembolso de membresía de gimnasio...",
      source: "Gmail",
      sourceIcon: "Mail",
      author: "Equipo de Beneficios",
      timestamp: "hace 1 semana",
      relevance: 95,
    },
    {
      id: "13",
      title: "#preguntas-beneficios",
      content:
        "Preguntas comunes sobre beneficios respondidas aquí. Temas populares: HSA vs FSA, cómo agregar dependientes, acumulación de PTO y límites de contribución 401(k)...",
      source: "Slack",
      sourceIcon: "MessageSquare",
      author: "Varios",
      timestamp: "En curso",
      relevance: 87,
    },
  ],
  "comentarios clientes": [
    {
      id: "14",
      title: "Consulta de Cliente - Características del Producto",
      content:
        "El cliente preguntó sobre las próximas funciones y capacidades de integración. Respondió con los aspectos destacados de la hoja de ruta Q2 y documentación de API. El cliente expresó interés en el plan empresarial.",
      source: "WhatsApp Business",
      sourceIcon: "MessageCircle",
      author: "Equipo de Soporte",
      timestamp: "hace 2 horas",
      relevance: 94,
    },
    {
      id: "15",
      title: "Conversación de Soporte - Reporte de Error",
      content:
        "El cliente informó un problema con la aplicación móvil que se cierra en Android 13. Se notificó al equipo de ingeniería. Se proporcionó una solución alternativa al cliente. El problema se registró como alta prioridad en Jira.",
      source: "WhatsApp Business",
      sourceIcon: "MessageCircle",
      author: "Sarah Williams",
      timestamp: "Ayer",
      relevance: 91,
    },
    {
      id: "16",
      title: "Discusión de Ventas - Precios Empresariales",
      content:
        "Cliente potencial consultando sobre precios del nivel empresarial y SLA personalizado. Compartió presentación de precios y programó demostración para la próxima semana. Tamaño de la empresa: más de 500 empleados.",
      source: "WhatsApp Business",
      sourceIcon: "MessageCircle",
      author: "Equipo de Ventas",
      timestamp: "hace 3 días",
      relevance: 88,
    },
  ],
  "ley federal del trabajo": [
    {
      id: "17",
      title: "Resumen Ley Federal del Trabajo 2026",
      content:
        "Guía interna sobre los derechos y obligaciones según la LFT en México. Incluye detalles sobre el aguinaldo (mínimo 15 días), vacaciones (12 días desde el primer año), prima vacacional y días de descanso obligatorio.",
      source: "Confluence",
      sourceIcon: "BookOpen",
      author: "Legal México",
      timestamp: "Actualizado hace 1 mes",
      relevance: 98,
    },
    {
      id: "18",
      title: "#recursos-humanos-mex - Discusión Aguinaldo",
      content:
        "@canal: Recordatorio importante sobre el pago de aguinaldos antes del 20 de diciembre. Este año se procesará en la nómina del 15. Asegúrense de que todos los datos bancarios estén actualizados en el sistema.",
      source: "Slack",
      sourceIcon: "MessageSquare",
      author: "Roberto Sánchez",
      timestamp: "hace 2 semanas",
      relevance: 92,
    },
  ],
  "facturación": [
    {
      id: "19",
      title: "Guía de Facturación CFDI 4.0",
      content:
        "Procedimiento para solicitar facturas de gastos corporativos. Requisitos: RFC, Razón Social, Régimen Fiscal y Código Postal. Todos los gastos deben enviarse a través del portal interno antes del día 25 de cada mes.",
      source: "Notion",
      sourceIcon: "FileText",
      author: "Finanzas",
      timestamp: "Actualizado ayer",
      relevance: 99,
    },
    {
      id: "20",
      title: "Políticas de Viáticos México.pdf",
      content:
        "Documento con los límites de gastos para viajes dentro de la República Mexicana. Incluye topes para alimentos, transporte y hospedaje. Es obligatorio presentar el XML y PDF de cada factura para el reembolso.",
      source: "Google Drive",
      sourceIcon: "HardDrive",
      author: "Contabilidad",
      timestamp: "hace 5 días",
      relevance: 95,
    },
  ],
  "asuetos": [
    {
      id: "21",
      title: "Calendario de Días Feriados México 2026",
      content:
        "Calendario oficial de días de descanso obligatorio: 1 de enero, 2 de febrero (Constitución), 16 de marzo (Benito Juárez), 1 de mayo, 16 de septiembre, 16 de noviembre (Revolución) y 25 de diciembre.",
      source: "Confluence",
      sourceIcon: "BookOpen",
      author: "RRHH",
      timestamp: "hace 3 meses",
      relevance: 100,
    },
    {
      id: "22",
      title: "Puente de Noviembre - Operaciones",
      content:
        "Aviso a clientes sobre el cierre de oficinas el lunes 16 de noviembre por el aniversario de la Revolución Mexicana. El equipo de soporte de guardia estará disponible solo para emergencias nivel 1.",
      source: "Gmail",
      sourceIcon: "Mail",
      author: "Operaciones",
      timestamp: "hace 4 días",
      relevance: 88,
    },
  ],
};

export function searchCompanyKnowledge(query: string): SearchResult[] {
  const lowercaseQuery = query.toLowerCase();

  // Specific keyword mapping for the demo
  if (lowercaseQuery.includes("vacaciones") || lowercaseQuery.includes("formato")) {
    return [
      {
        id: "v1",
        title: "Política de Vacaciones y Ausencias",
        content: "Para solicitar vacaciones, debes ingresar al portal de Workday > Tiempo Libre. El formato se llena digitalmente y requiere aprobación de tu manager directo con al menos 2 semanas de anticipación.",
        source: "Notion",
        sourceIcon: "FileText",
        author: "People Ops",
        timestamp: "hace 2 meses",
        relevance: 100
      },
      mockSearchResults["ley federal del trabajo"][0]
    ];
  }

  if (lowercaseQuery.includes("vpn") || lowercaseQuery.includes("ticket")) {
    return [
      {
        id: "vpn1",
        title: "Guía de Conexión VPN (GlobalProtect)",
        content: "Usa tus credenciales de Okta para iniciar sesión en GlobalProtect. Si falla, levanta un ticket en el portal de IT Service Desk bajo la categoría 'Conectividad'. El tiempo promedio de respuesta es de 2 horas.",
        source: "Confluence",
        sourceIcon: "BookOpen",
        author: "IT Infrastructure",
        timestamp: "hace 15 días",
        relevance: 98
      }
    ];
  }

  if (lowercaseQuery.includes("okr") || lowercaseQuery.includes("objetivos")) {
    return [
      {
        id: "okr1",
        title: "Tablero de OKRs Q1 2026 - Ingeniería",
        content: "Objetivos principales: 1) Estabilidad del sistema al 99.9%, 2) Reducción de deuda técnica en 20%, 3) Lanzamiento de ConnectAI México. Estatus actual: 65% completado.",
        source: "Notion",
        sourceIcon: "FileText",
        author: "Director de Producto",
        timestamp: "hace 3 días",
        relevance: 95
      }
    ];
  }

  if (lowercaseQuery.includes("ceo") || lowercaseQuery.includes("estratégicos") || lowercaseQuery.includes("crecimiento")) {
    return [
      {
        id: "ceo1",
        title: "Resumen Ejecutivo - Q1 Strategy Review",
        content: "Nuestras 3 apuestas de crecimiento: Expansión en LATAM, Integraciones Deep-Learning y reducción de Churn en el sector Enterprise. Las métricas de retención muestran un incremento del 12% mes a mes.",
        source: "Google Drive",
        sourceIcon: "HardDrive",
        author: "Estrategia Corporativa",
        timestamp: "Ayer",
        relevance: 99
      },
      {
        id: "ceo2",
        title: "Notas de la Junta del Board - Enero 2026",
        content: "Action items: 1) Aprobar presupuesto de marketing para Q2, 2) Revisar plan de contratación de Head of Sales, 3) Finalizar auditoría de cumplimiento anual.",
        source: "Notion",
        sourceIcon: "FileText",
        author: "CEO Office",
        timestamp: "hace 1 semana",
        relevance: 92
      }
    ];
  }

  // Generic category matching
  for (const [key, results] of Object.entries(mockSearchResults)) {
    if (lowercaseQuery.includes(key.toLowerCase()) || key.toLowerCase().includes(lowercaseQuery)) {
      return results;
    }
  }

  // Default mixed results if no specific match
  return [
    mockSearchResults["ley federal del trabajo"][0],
    mockSearchResults["facturación"][0],
    mockSearchResults["asuetos"][0],
    {
      id: "gen1",
      title: "Guía General de Empleados",
      content: "Busca aquí información sobre trámites administrativos, accesos y cultura organizacional.",
      source: "Manual Interno",
      sourceIcon: "BookOpen",
      author: "Admin",
      timestamp: "hace 1 año",
      relevance: 80
    }
  ];
}