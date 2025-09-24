
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, signOut, User, updateProfile } from "firebase/auth";
import { auth, storage } from '@/lib/firebase-client';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  uploadProfilePicture: (file: File) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) return;
    
    const storageRef = ref(storage, `profile-pictures/${user.uid}`);
    
    try {
        toast({ title: 'Uploading...', description: 'Your new profile picture is being uploaded.' });
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        await updateProfile(user, { photoURL: downloadURL });

        // Create a new user object with the updated photoURL to trigger a re-render
        setUser({ ...user, photoURL: downloadURL });

        toast({ title: 'Success!', description: 'Your profile picture has been updated.' });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not upload your profile picture. Please try again.' });
    }
  }


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, logout, uploadProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
