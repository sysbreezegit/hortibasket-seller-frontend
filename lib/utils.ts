import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthRedirectPath = (user: any, isProfileComplete?: boolean) => {
  if (!user) return "/login";

  // If explicitly told profile is incomplete (from login response)
  // or if essential fields are missing
  if (isProfileComplete === false || !user.name || !user.email) {
    return "/register";
  }

  // If KYC is not submitted
  if (!user.kycStatus || user.kycStatus === "not_submitted") {
    return "/profile";
  }

  return "/dashboard";
};
