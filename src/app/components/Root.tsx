import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Search, Database, Settings, Trash2, History, MessageSquare, LogOut, User as UserIcon } from "lucide-react";
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
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { history, clearHistory } = useHistory();
  const { user, logout } = useAuth();

  const handleResetHistory = () => {
    clearHistory();
    toast.success("Historial reiniciado correctamente");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Sesión cerrada correctamente");
  };

  const navigation = [
    { name: "Buscar", path: "/", icon: Search },
    { name: "Integraciones", path: "/integrations", icon: Database },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-gray-900">ConnectAI</span>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="p-4 mx-2 mt-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            ) : (
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-indigo-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Usuario"}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Search History Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-8 mt-6 mb-2">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              Recientes
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-0.5 custom-scrollbar">
            {history.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-gray-400 italic">No hay búsquedas aún</p>
              </div>
            ) : (
              history.slice(0, 15).map((item, idx) => (
                <button
                  key={`${item.query}-${idx}`}
                  onClick={() => navigate(`/chat?q=${encodeURIComponent(item.query)}`)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all text-left group"
                >
                  <MessageSquare className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 shrink-0" />
                  <span className="truncate flex-1">{item.query}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-all duration-200">
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Configuración</span>
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

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}