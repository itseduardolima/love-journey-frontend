"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { api } from "@/services/api";

export default function PaymentSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get("external_reference");

    if (externalReference) {
      verifyPaymentStatus(externalReference);
    } else {
      setError("No journey ID found in the URL.");
      setIsLoading(false);
    }
  }, []);

  const verifyPaymentStatus = async (journeyId: string) => {
    try {
      const response = await api.get(`/payment/${journeyId}/status`);
      if (response.data.status === "approved") {
        router.push(`/qr-code/${journeyId}`);
      } else {
        setError("Pagamento ainda não aprovado. Tente novamente mais tarde.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error verifying payment status:", error);
      setError("Ocorreu um erro ao verificar o status do pagamento.");
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get("external_reference");
    if (externalReference) {
      setIsLoading(true);
      setError(null);
      verifyPaymentStatus(externalReference);
    } else {
      router.push("/");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-gray-300 mb-4">{error}</p>
            <Button onClick={handleRetry} className="w-full mb-2">
              Tente novamente
            </Button>
            <Button onClick={() => router.push("/")} className="w-full">
              Voltar para o ínicio
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-green-500 mb-4">
              Pagamento realizado com sucesso!
            </h1>
            <p className="text-gray-300 mb-4">
              Seu pagamento foi processado com sucesso. Você será redirecionado
              para a página do código QR em breve.
            </p>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
