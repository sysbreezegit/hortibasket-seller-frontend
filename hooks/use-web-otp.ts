import { useEffect, useState } from "react";

export function useWebOTP() {
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    if (!("OTPCredential" in window)) return;

    const ac = new AbortController();

    setTimeout(() => {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        } as any)
        .then((credential: any) => {
          console.log("WebOTP received credential:", credential);
          if (credential && credential.code) {
            setOtp(credential.code);
          }
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.log("WebOTP API error", err);
          }
        });
    }, 0);

    return () => {
      ac.abort();
    };
  }, []);

  return otp;
}
