"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { api } from "@/services/api";
import { Clock } from "lucide-react";

export default function PaymentPendingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get("external_reference");

    if (externalReference) {
      setJourneyId(externalReference);
      checkPaymentStatus(externalReference);
    } else {
      setError("No journey ID found in the URL.");
      setIsLoading(false);
    }
  }, []);

  const checkPaymentStatus = async (journeyId: string) => {
    try {
      const response = await api.get(`/payment/${journeyId}/status`);
      if (response.data.status === "approved") {
        router.push(`/payment/success?external_reference=${journeyId}`);
      } else if (response.data.status === "pending") {
        setIsLoading(false);
      } else {
        setError("O pagamento falhou. Por favor, tente novamente.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setError("Ocorreu um erro ao verificar o status do pagamento.");
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = () => {
    if (journeyId) {
      setIsLoading(true);
      checkPaymentStatus(journeyId);
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
          </div>
        ) : (
          <div>
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-yellow-500 mb-4">
              Pagamento Pendente
            </h1>
            <p className="text-gray-300 mb-6">
              Seu pagamento está sendo processado. Isso pode levar alguns
              minutos.
            </p>
            <Button
              onClick={handleRefreshStatus}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              Verificar status do pagamento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
