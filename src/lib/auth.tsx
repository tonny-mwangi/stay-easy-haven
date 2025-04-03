
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isEmailVerified: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Check if the user's email is verified
  const checkEmailVerification = (user: User | null) => {
    if (user) {
      // If email_confirmed_at is not null, the email is verified
      setIsEmailVerified(user.email_confirmed_at !== null);
    } else {
      setIsEmailVerified(false);
    }
  };

  useEffect(() => {
    // Check for active session on mount
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setUser(data.session.user);
        checkEmailVerification(data.session.user);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          checkEmailVerification(session.user);
        } else {
          setUser(null);
          setIsEmailVerified(false);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back to EliteStays!",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Sign in error:", error);
      return Promise.reject(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast({
        title: "Sign up successful",
        description: "Welcome to EliteStays! Please verify your email to complete registration.",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Sign up error:", error);
      return Promise.reject(error);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) {
        toast({
          title: "Failed to resend verification email",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and spam folder.",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Resend verification email error:", error);
      return Promise.reject(error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      toast({
        title: "Signed out successfully",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Sign out error:", error);
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isEmailVerified, 
      signIn, 
      signUp, 
      signOut,
      resendVerificationEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
