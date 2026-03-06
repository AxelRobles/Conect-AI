import { useState } from "react";
import {
  Search as SearchIcon,
  Sparkles,
  Mic,
  Paperclip,
  History,
  Globe,
  ChevronRight,
  User,
  ShieldCheck,
  Briefcase,
  Zap,
  Clock,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "./ui/sheet";
import { useHistory } from "../hooks/useHistory";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { history: searchHistory, addHistoryItem } = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addHistoryItem(query);
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
    }
  };

  const navigateToQuery = (q: string) => {
    addHistoryItem(q);
    navigate(`/search-results?q=${encodeURIComponent(q)}`);
  };

  const roleQueries = {
    empleado: [
      "¿Cuáles son las últimas dudas de clientes recibidas por WhatsApp?",
      "¿Cuál es el proceso para pedir vacaciones y dónde lleno el formato?",
      "¿Dónde está la política de viáticos y qué monto máximo puedo reembolsar?",
      "¿Cómo me conecto a la VPN y a quién le levanto ticket si falla?",
      "¿Dónde encuentro la última versión del deck / presentación de [Proyecto X]?",
      "¿Cuál es el checklist para desplegar a producción?",
      "¿Quién es el dueño del sistema [Sistema Y] y cuál es el canal de soporte?",
      "¿Dónde está la guía para onboarding de mi equipo?",
      "¿Cómo solicito acceso a [Herramienta Z] y cuánto tarda la aprobación?",
      "¿Cuál es el calendario de guardias (on-call) de este mes?",
      "¿Cuál fue la decisión final sobre [tema] y en qué documento quedó?",
      "¿Cuál es el template oficial para una propuesta / PRD / RFC?",
      "¿Qué significa este error [pegar error] y cómo lo resolvieron antes?",
    ],
    manager: [
      "Consultas de ventas por WhatsApp hoy",
      "¿Cuáles son los OKRs actuales de mi equipo y cuándo se actualizan?",
      "¿Cuál es el estado de los proyectos críticos y los próximos hitos?",
      "¿Qué acuerdos se tomaron en la última reunión de stakeholders de [Proyecto X]?",
      "¿Cuál es el headcount plan aprobado para este trimestre?",
      "¿Qué prioridades quedaron para el próximo sprint y por qué?",
      "¿Qué dependencias externas tenemos (equipos / vendors) y quién es el owner?",
      "¿Cuál es el runbook de incidentes y el proceso de escalamiento?",
      "¿Qué aprendizajes salieron del último postmortem relacionado a [servicio]?",
      "¿Qué tickets / iniciativas están bloqueadas y qué falta para desbloquearlas?",
      "¿Qué KPIs estoy comprometido a cumplir (SLA, NPS, costo) y cómo van?",
      "¿Qué policies aplican para contratación de contractors / proveedores?",
      "¿Dónde está la matriz RACI del programa [Programa]?",
    ],
    director: [
      "¿Cómo va el desempeño de mi área vs. OKRs (tendencia mensual/trimestral)?",
      "¿Qué iniciativas están aportando más al objetivo estratégico [crecimiento/costos/retención]?",
      "¿Cuál es el forecast de presupuesto (burn vs plan) y principales variaciones?",
      "¿Qué riesgos top tenemos este trimestre y cuál es el plan de mitigación?",
      "¿Cuáles son los 5 clientes/cuentas con mayor riesgo y qué plan hay?",
      "¿Qué decisiones estratégicas están pendientes y qué información falta?",
      "¿Cómo está la salud operativa (incidentes severos, MTTR, disponibilidad) por producto?",
      "¿Qué está causando el churn / caída de conversión y qué experimentos corren?",
      "¿Qué proyectos deberían pausarse para liberar capacidad y por qué?",
      "¿Qué “wins” y “bloqueos” reportaron los managers esta semana?",
      "¿Qué acuerdos comerciales/legales impactan a [producto/mercado] y dónde están documentados?",
      "¿Cuáles son los principales hallazgos de auditoría/compliance y fechas de remediación?",
    ],
    ceo: [
      "¿Cómo vamos contra los objetivos del año (ARR, margen, retención, NPS) y tendencia?",
      "¿Cuáles son las 3 apuestas principales de crecimiento y qué evidencia las respalda?",
      "¿Qué clientes estratégicos están en riesgo y qué apoyo necesitan de mí?",
      "¿Qué métricas muestran señales tempranas de problema (pipeline, churn, calidad, soporte)?",
      "¿Cuál es el resumen ejecutivo de los top proyectos y su impacto esperado?",
      "¿Qué decisiones clave están “atascadas” y cuál es el costo de no decidir?",
      "¿Dónde están las notas de la última junta del board y los action items?",
      "¿Qué cambios organizacionales se propusieron y cuál es el rationale?",
      "¿Cuál es el estado de caja/runway y escenarios (base, conservador, agresivo)?",
      "¿Qué riesgos reputacionales/legales tenemos abiertos y plan de contención?",
      "¿Cuál es la estrategia de pricing empaquetada y quién la aprueba?",
      "¿Qué dicen los clientes y el mercado (feedback sintetizado) sobre [producto]?",
    ],
  };

  return (
    <div className="min-h-full flex flex-col items-center bg-white px-4 pt-20 pb-20">
      <div className="w-full max-w-4xl">
        {/* Branding/Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            ConnectAI
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            El cerebro de tu empresa. Busca en Slack, Google Drive, Notion y más en un solo lugar.
          </p>
        </div>

        {/* Search bar area */}
        <div className="relative group mb-16">
          <form
            onSubmit={handleSearch}
            className="relative bg-white border-2 border-gray-100 shadow-xl shadow-indigo-100/20 rounded-3xl p-2 focus-within:border-indigo-500 transition-all"
          >
            <div className="flex items-center px-4 gap-3">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pregunta sobre reglamentos, documentos o conversaciones..."
                className="flex-1 border-none bg-transparent py-6 text-lg focus-visible:ring-0 placeholder:text-gray-400"
              />

              <div className="flex items-center gap-1 border-l border-gray-100 pl-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Adjuntar archivo para contexto</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                        <Mic className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Búsqueda por voz</TooltipContent>
                  </Tooltip>

                  <Button
                    type="submit"
                    className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-8 py-6 h-auto font-semibold shadow-lg shadow-indigo-200"
                  >
                    Buscar
                  </Button>
                </TooltipProvider>
              </div>
            </div>
          </form>

          {/* Quick Stats/Links */}
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1.5 cursor-help">
              <Globe className="w-4 h-4" />
              <span>Contexto: México (CDMX)</span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
                  <History className="w-4 h-4" />
                  <span>Ver historial</span>
                </div>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" />
                    Historial de Búsqueda
                  </SheetTitle>
                  <SheetDescription>
                    Tus búsquedas recientes en este demo.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] px-1">
                  {searchHistory.length === 0 ? (
                    <div className="text-center py-10">
                      <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No hay búsquedas recientes.</p>
                    </div>
                  ) : (
                    searchHistory.map((item, idx) => (
                      <button
                        key={`${item.query}-${idx}`}
                        className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group flex flex-col gap-1"
                        onClick={() => navigateToQuery(item.query)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors truncate pr-4">
                            {item.query}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                          Hace {formatDistanceToNow(new Date(item.timestamp), { locale: es })}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Personalizar respuestas IA</span>
            </div>
          </div>
        </div>

        {/* Suggestions with Tabs */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between px-2">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              Explorar por rol
            </h2>
            <p className="text-xs text-gray-400 italic">Demo Glean Proxy para México</p>
          </div>

          <Tabs defaultValue="empleado" className="w-full">
            <TabsList className="w-full bg-gray-50/50 p-1 rounded-2xl border border-gray-100 mb-8 grid grid-cols-4 gap-1 h-auto">
              <TabsTrigger value="empleado" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
                <User className="w-4 h-4" />
                <span>Empleado</span>
              </TabsTrigger>
              <TabsTrigger value="manager" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Manager</span>
              </TabsTrigger>
              <TabsTrigger value="director" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Director</span>
              </TabsTrigger>
              <TabsTrigger value="ceo" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
                <Zap className="w-4 h-4" />
                <span>CEO</span>
              </TabsTrigger>
            </TabsList>

            {(Object.keys(roleQueries) as Array<keyof typeof roleQueries>).map((role) => (
              <TabsContent key={role} value={role} className="mt-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {roleQueries[role].map((q) => (
                    <button
                      key={q}
                      onClick={() => navigateToQuery(q)}
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-left group animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                          <SearchIcon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 line-clamp-2">
                          {q}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}