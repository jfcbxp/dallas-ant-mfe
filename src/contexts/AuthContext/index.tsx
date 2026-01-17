import { createContext, useContext } from 'react';

interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
	checkRequestError: (error: Error) => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}

	return context;
};
