import {
  FileText,
  MessageSquare,
  HardDrive,
  BookOpen,
  Github,
  Mail,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Zap
} from "lucide-react";
import type { SearchResult } from "../data/mockData";
import { Badge } from "./ui/badge";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

const iconMap: { [key: string]: any } = {
  FileText,
  MessageSquare,
  HardDrive,
  BookOpen,
  Github,
  Mail,
  MessageCircle,
};

export function SearchResults({ results, query }: SearchResultsProps) {
  const hasResults = results.length > 0;

  return (
    <div>
      {hasResults && (
        <div className="mb-10 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-semibold text-gray-900">Respuesta de ConnectAI</h2>
            <Badge variant="outline" className="ml-auto bg-white/50 border-indigo-200 text-indigo-700 gap-1">
              <Zap className="w-3 h-3" />
              IA Generativa
            </Badge>
          </div>

          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p>
              Basado en la información encontrada en <strong>{results[0].source}</strong> y otras fuentes internas,
              parece que para "{query}" lo más relevante es que {results[0].content.substring(0, 150)}...
            </p>
            <p className="mt-2">
              Puedes encontrar más detalles en los documentos oficiales adjuntos abajo.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-indigo-100/50 flex items-center gap-4">
            <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">Fuentes clave:</span>
            <div className="flex gap-2">
              {Array.from(new Set(results.map(r => r.source))).slice(0, 3).map(source => (
                <span key={source} className="text-xs bg-white px-2 py-1 rounded border border-indigo-100 text-indigo-600">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Se encontraron <span className="font-medium text-gray-900">{results.length}</span>{" "}
          resultados para <span className="italic">"{query}"</span>
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          const Icon = iconMap[result.sourceIcon] || FileText;
          return (
            <div
              key={result.id}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 transition-colors">
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{result.source}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{result.author}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{result.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-100"
                    >
                      {result.relevance}% relevancia
                    </Badge>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {result.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}