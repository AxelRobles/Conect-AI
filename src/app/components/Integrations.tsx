import { useState } from "react";
import {
  MessageSquare,
  HardDrive,
  BookOpen,
  FileText,
  Github,
  CheckSquare,
  Mail,
  Folder,
  MessageCircle,
  Check,
  Plus,
  RefreshCw,
} from "lucide-react";
import { dataSources } from "../data/mockData";
import type { DataSource } from "../data/mockData";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const iconMap: { [key: string]: any } = {
  MessageSquare,
  HardDrive,
  BookOpen,
  FileText,
  Github,
  CheckSquare,
  Mail,
  Folder,
  MessageCircle,
};

export function Integrations() {
  const [sources, setSources] = useState<DataSource[]>(dataSources);
  const [searchQuery, setSearchQuery] = useState("");

  const connectedSources = sources.filter((s) => s.connected);
  const availableSources = sources.filter((s) => !s.connected);

  const toggleConnection = (id: string) => {
    setSources(
      sources.map((source) =>
        source.id === id
          ? {
              ...source,
              connected: !source.connected,
              lastSync: !source.connected ? "Just now" : undefined,
            }
          : source
      )
    );
  };

  const filteredConnected = connectedSources.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailable = availableSources.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Integraciones de Fuentes de Datos
          </h1>
          <p className="text-gray-600">
            Conecta las herramientas y servicios de tu empresa para que toda la información sea buscable
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Search and stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar integraciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">
                {connectedSources.length}
              </div>
              <div className="text-sm text-gray-600">Conectadas</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">
                {sources.length}
              </div>
              <div className="text-sm text-gray-600">Total Disponibles</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="connected" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="connected">
              Conectadas ({connectedSources.length})
            </TabsTrigger>
            <TabsTrigger value="available">
              Disponibles ({availableSources.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connected">
            {filteredConnected.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {searchQuery
                    ? "No hay fuentes conectadas que coincidan con tu búsqueda"
                    : "Aún no hay fuentes de datos conectadas"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredConnected.map((source) => (
                  <DataSourceCard
                    key={source.id}
                    source={source}
                    onToggle={toggleConnection}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available">
            {filteredAvailable.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay fuentes disponibles que coincidan con tu búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAvailable.map((source) => (
                  <DataSourceCard
                    key={source.id}
                    source={source}
                    onToggle={toggleConnection}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface DataSourceCardProps {
  source: DataSource;
  onToggle: (id: string) => void;
}

function DataSourceCard({ source, onToggle }: DataSourceCardProps) {
  const Icon = iconMap[source.icon] || FileText;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-500">{source.type}</p>
          </div>
        </div>
        {source.connected && (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <Check className="w-3 h-3 mr-1" />
            Conectada
          </Badge>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4">{source.description}</p>

      {source.connected && source.lastSync && (
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
          <RefreshCw className="w-3 h-3" />
          <span>Última sincronización {source.lastSync}</span>
        </div>
      )}

      <Button
        onClick={() => onToggle(source.id)}
        variant={source.connected ? "outline" : "default"}
        className="w-full"
      >
        {source.connected ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2" />
            Desconectar
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Conectar
          </>
        )}
      </Button>
    </div>
  );
}