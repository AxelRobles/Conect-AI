import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = (response: any) => {
        if (response.credential) {
            login(response.credential);
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
            {/* Left side - Branding & Info */}
            <div className="md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Abstract background blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <Zap className="w-6 h-6 text-indigo-600" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight">ConnectAI</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        El cerebro digital de las empresas mexicanas.
                    </h1>

                    <div className="space-y-6 max-w-md">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-indigo-500/30 rounded-lg backdrop-blur-sm">
                                <Globe className="w-5 h-5 text-indigo-100" />
                            </div>
                            <p className="text-indigo-100 text-lg">
                                Busca en Slack, Drive, Notion y más en un solo lugar.
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-indigo-500/30 rounded-lg backdrop-blur-sm">
                                <ShieldCheck className="w-5 h-5 text-indigo-100" />
                            </div>
                            <p className="text-indigo-100 text-lg">
                                Seguridad de grado empresarial para proteger la información de tu organización.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-12 border-t border-indigo-500/50">
                    <p className="text-indigo-200 text-sm">
                        © 2026 ConnectAI.
                    </p>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="md:w-1/2 h-full flex flex-col items-center justify-center p-8 md:p-24 relative bg-gray-50">
                <div className="w-full max-w-sm space-y-10">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-6 md:hidden">
                            <Zap className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Bienvenido</h2>
                        <p className="text-gray-500">
                            Inicia sesión para acceder al panel de búsqueda de tu empresa.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 space-y-8">
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">
                                Identificación Corporativa
                            </p>

                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={() => console.log("Login Failed")}
                                    useOneTap
                                    theme="filled_blue"
                                    shape="pill"
                                    text="signin_with"
                                    width="100%"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-100"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-300">Solo usuarios autorizados</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs text-center text-gray-400">
                                Al iniciar sesión, aceptas nuestros <span className="text-indigo-600 hover:underline cursor-pointer">Términos de Servicio</span> y <span className="text-indigo-600 hover:underline cursor-pointer">Privacidad</span>.
                            </p>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-medium text-gray-600">Demo optimizado para visualización rápida</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
