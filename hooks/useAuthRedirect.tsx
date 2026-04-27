"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthRedirectPath } from '@/lib/utils';

export const useAuthRedirect = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check immediately if possible, but inside useEffect to access window/localStorage safely
    const checkAuth = () => {
      try {
        const storage = localStorage.getItem("affiliate-auth");
        
        if (storage) {
          const parsed = JSON.parse(storage);
          if (parsed?.state?.accessToken) {
            const user = parsed?.state?.user;
            // Found token, redirecting...
            // Keep isLoading true
            const path = getAuthRedirectPath(user);
            router.replace(path);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to parse affiliate-auth:", err);
      }
      
      // No token found or invalid, stop loading
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isLoading };
};
