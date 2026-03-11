import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface UserProfile {
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: UserProfile | null;
    login: (credential: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("conectai_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (credential: string) => {
        try {
            const decoded: any = jwtDecode(credential);
            const profile: UserProfile = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
            };
            setUser(profile);
            localStorage.setItem("conectai_user", JSON.stringify(profile));
        } catch (error) {
            console.error("Error decoding Google token:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("conectai_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
