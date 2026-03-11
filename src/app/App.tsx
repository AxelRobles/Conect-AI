import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

// TODO: Reemplaza esto con tu Client ID real de Google Cloud Console
const GOOGLE_CLIENT_ID = "691508898763-m0iuuujbj6agnmn0ql9p0nqgu0672env.apps.googleusercontent.com"; // Placeholder para demo

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
