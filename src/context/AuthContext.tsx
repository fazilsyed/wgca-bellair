'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        // Set cookie with token
        Cookies.set('auth-token', token, { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // If on an auth page, redirect to home
        if (['/signin', '/signup', '/reset-password'].includes(pathname)) {
          router.push('/home');
        }
      } else {
        setUser(null);
        Cookies.remove('auth-token');
        
        // If on a protected route, redirect to signin
        if (!pathname.startsWith('/signin') && 
            !pathname.startsWith('/signup') && 
            !pathname.startsWith('/reset-password') &&
            pathname !== '/') {
          router.push('/signin');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    const token = await userCredential.user.getIdToken();
    Cookies.set('auth-token', token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    Cookies.set('auth-token', token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  };

  const logout = async () => {
    await signOut(auth);
    Cookies.remove('auth-token');
    router.push('/signin');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 