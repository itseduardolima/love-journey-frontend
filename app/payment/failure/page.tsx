"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function PaymentErrorPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    setErrorMessage(
      error || "Ocorreu um erro desconhecido durante o processo de pagamento."
    );
  }, []);

  const handleRetry = () => {
    router.push("/form");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-500 mb-4">Payment Error</h1>
        <p className="text-gray-300 mb-6">{errorMessage}</p>
        <Button
          onClick={handleRetry}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Tente novamente
        </Button>
      </div>
    </div>
  );
}
