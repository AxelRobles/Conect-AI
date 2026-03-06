import { Outlet, Link, useLocation } from "react-router";
import { Search, Database, Settings, Trash2 } from "lucide-react";
import { cn } from "./ui/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useHistory } from "../hooks/useHistory";
import { toast } from "sonner";

export function Root() {
  const location = useLocation();
  const { clearHistory } = useHistory();

  const handleResetHistory = () => {
    clearHistory();
    toast.success("Historial reiniciado correctamente");
  };

  const navigation = [
    { name: "Buscar", path: "/", icon: Search },
    { name: "Integraciones", path: "/integrations", icon: Database },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl">ConnectAI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 w-full transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Configuración</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configuración del Demo</DialogTitle>
                <DialogDescription>
                  Ajustes para la simulación de ConnectAI.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 leading-none">Historial de Búsqueda</h4>
                    <p className="text-sm text-gray-500">Elimina todas las búsquedas guardadas localmente.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 gap-2 shrink-0"
                    onClick={handleResetHistory}
                  >
                    <Trash2 className="w-4 h-4" />
                    Reiniciar
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cerrar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}