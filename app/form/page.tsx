"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Check,
  Download,
  Copy,
  X,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { format, parse } from "date-fns";
import QRCode from "qrcode";
import { api } from "@/services/api";
import { Loader } from "@/components/Loader";
import { CoupleData } from "@/types/CoupleData";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: File | null;
  photoMimeType: string;
}

function LoveStoryForm() {
  const [step, setStep] = useState(0);
  const [coupleData, setCoupleData] = useState<CoupleData>({
    partner1: "",
    partner2: "",
    title: "",
  });
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentMemory, setCurrentMemory] = useState<Memory>({
    id: "",
    date: "",
    title: "",
    description: "",
    photo: null,
    photoMimeType: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [journeyLink, setJourneyLink] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const totalSteps = 4;

  const createJourneyMutation = useMutation({
    mutationFn: async (data: CoupleData) => {
      const response = await api.post("/journey", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["journey", data.id], data);
      createMemories(data.id);
    },
    onError: () => {
      setErrors({
        general:
          "Ocorreu um erro ao salvar sua jornada. Por favor, tente novamente.",
      });
    },
  });

  const createMemoryMutation = useMutation({
    mutationFn: async (data: { memory: Memory; journeyId: string }) => {
      const formData = new FormData();
      formData.append("date", data.memory.date);
      formData.append("title", data.memory.title);
      formData.append("description", data.memory.description);
      formData.append("journeyId", data.journeyId);
      if (data.memory.photo) {
        formData.append("photo", data.memory.photo);
      }
      const response = await api.post("/memories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onError: () => {
      setErrors({
        general:
          "Ocorreu um erro ao salvar uma memória. Por favor, tente novamente.",
      });
    },
  });

  const createMemories = async (journeyId: string) => {
    for (const memory of memories) {
      await createMemoryMutation.mutateAsync({ memory, journeyId });
    }
    const link = `${window.location.origin}/journey/${journeyId}`;
    setJourneyLink(link);
    generateQRCode(link);
  };

  const generateQRCode = async (url: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setErrors({
        general:
          "Ocorreu um erro ao gerar o código QR. Por favor, tente novamente.",
      });
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "love_journey_qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyLink = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const validateStep = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (step < 3) {
      if (step === 0 && (!coupleData.partner1 || !coupleData.partner2)) {
        isValid = false;
        if (!coupleData.partner1) newErrors.partner1 = "Campo obrigatório";
        if (!coupleData.partner2) newErrors.partner2 = "Campo obrigatório";
      } else if (step === 1 && !coupleData.title) {
        isValid = false;
        newErrors.title = "Campo obrigatório";
      }
    } else {
      if (showMemoryForm) {
        if (!currentMemory.date) newErrors.date = "Campo obrigatório";
        if (!currentMemory.title) newErrors.title = "Campo obrigatório";
        if (!currentMemory.description)
          newErrors.description = "Campo obrigatório";
        if (!currentMemory.photo) newErrors.photo = "Campo obrigatório";
        isValid = Object.keys(newErrors).length === 0;
      } else {
        isValid = memories.length >= 3;
      }
    }

    setErrors(newErrors);
    setIsNextDisabled(!isValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (step < 3) {
      setCoupleData((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentMemory((prev) => ({ ...prev, [name]: value }));
    }
    validateStep();
  };

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    setCurrentMemory((prev) => ({ ...prev, date: formattedDate }));
    validateStep();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentMemory((prev) => ({
        ...prev,
        photo: file,
        photoMimeType: file.type,
      }));
      validateStep();
    }
  };

  const handleAddMemory = () => {
    if (
      currentMemory.date &&
      currentMemory.title &&
      currentMemory.description &&
      currentMemory.photo
    ) {
      const newMemory = { ...currentMemory, id: editingMemoryId || uuidv4() };
      setMemories((prev) =>
        editingMemoryId
          ? prev.map((mem) => (mem.id === editingMemoryId ? newMemory : mem))
          : [...prev, newMemory]
      );
      setCurrentMemory({
        id: "",
        date: "",
        title: "",
        description: "",
        photo: null,
        photoMimeType: "",
      });
      setEditingMemoryId(null);
      setShowMemoryForm(false);
      validateStep();
    } else {
      setErrors({
        ...errors,
        memory: "Todos os campos da lembrança são obrigatórios",
      });
    }
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((memory) => memory.id !== id));
    validateStep();
  };

  const handleEditMemory = (id: string) => {
    const memoryToEdit = memories.find((memory) => memory.id === id);
    if (memoryToEdit) {
      setCurrentMemory(memoryToEdit);
      setEditingMemoryId(id);
      setShowMemoryForm(true);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (memories.length < 3) {
      setErrors({
        general: "Adicione pelo menos 3 lembranças antes de finalizar.",
      });
      return;
    }
    createJourneyMutation.mutate(coupleData);
  };

  const renderMemoryForm = () => (
    <div className="space-y-4 bg-gray-700 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-pink-300 mb-4">
        {editingMemoryId ? "Editar Lembrança" : "Nova Lembrança"}
      </h3>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-full p-3 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all flex items-center justify-center">
          {currentMemory.photo ? (
            <Check className="mr-2" size={20} />
          ) : (
            <Plus className="mr-2" size={20} />
          )}
          {currentMemory.photo ? "Foto selecionada" : "Adicionar foto"}
        </div>
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
        )}
      </div>
      <div>
        <DatePicker
          date={
            currentMemory.date
              ? parse(currentMemory.date, "dd/MM/yyyy", new Date())
              : undefined
          }
          onDateChange={handleDateChange}
          placeholder="Selecione uma data"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>
      <div>
        <label>Título</label>
        <Input
          type="text"
          name="title"
          value={currentMemory.title}
          onChange={handleInputChange}
          placeholder="Ex: Primeiro beijo"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <label>Descrição</label>
        <TextArea
          name="description"
          value={currentMemory.description}
          onChange={handleInputChange}
          placeholder="Ex: Senti meu coração acelerar quando..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={() => setShowMemoryForm(false)}
          variant="default"
          label="Cancelar"
        />

        <Button
          onClick={handleAddMemory}
          label={editingMemoryId ? "Salvar Alterações" : "Salvar"}
          variant="primary"
        />
      </div>
      {errors.memory && (
        <p className="text-red-500 text-sm mt-2">{errors.memory}</p>
      )}
    </div>
  );

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-pink-300 mb-4">
              Bem-vindos! Vamos começar com seus nomes.
            </h2>
            <div>
              <Input
                type="text"
                name="partner1"
                value={coupleData.partner1}
                onChange={handleInputChange}
                placeholder="Nome do Parceiro 1"
              />
              {errors.partner1 && (
                <p className="text-red-500 text-sm mt-1">{errors.partner1}</p>
              )}
            </div>
            <div>
              <Input
                type="text"
                name="partner2"
                value={coupleData.partner2}
                onChange={handleInputChange}
                placeholder="Nome do Parceiro 2"
              />
              {errors.partner2 && (
                <p className="text-red-500 text-sm mt-1">{errors.partner2}</p>
              )}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-pink-300 mb-4">
              Qual é o título história do casal?
            </h2>
            <div>
              <Input
                type="text"
                name="title"
                value={coupleData.title}
                onChange={handleInputChange}
                placeholder="Ex: Nossa História de Amor"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-pink-300 mb-4">
              Agora, vamos adicionar lembranças especiais!
            </h2>
            <p className="text-gray-300">
              Adicione pelo menos 3 lembranças para sua linha do tempo.
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-5 mb-4">
              <h2 className="text-2xl font-bold  text-pink-300">Lembranças</h2>
              <Button
                label="Adicionar lembrança"
                variant="primary"
                onClick={() => setShowMemoryForm(true)}
                icon={<Plus size={20} className="mr-2" />}
              />
            </div>
            {memories.map((memory) => (
              <div
                onClick={() => handleEditMemory(memory.id)}
                key={memory.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-pink-300 truncate flex-grow mr-4">
                  {memory.title}
                </h3>
                <div>
                  <Button
                    onClick={() => handleDeleteMemory(memory.id)}
                    variant="delete"
                    icon={<X size={20} />}
                  />
                </div>
              </div>
            ))}
            {showMemoryForm && renderMemoryForm()}
            {memories.length >= 3 && (
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSubmit}
                  label="Gerar página"
                  variant="submit"
                />
              </div>
            )}
          </div>
        );
    }
  };

  if (createJourneyMutation.isPending || createMemoryMutation.isPending) {
    return <Loader />;
  }

  if (journeyLink && qrCodeUrl) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-pink-300 mb-6">
            Sua linha do tempo está pronta!
          </h2>
          <div className="mb-6 flex justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          <button
            onClick={handleDownloadQRCode}
            className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors flex items-center justify-center mb-4"
          >
            <Download size={20} className="mr-2" />
            Download QR Code
          </button>
          <div className="flex items-center mb-4">
            <input
              ref={linkInputRef}
              type="text"
              value={journeyLink}
              readOnly
              className="flex-grow p-[6px] bg-gray-700 text-white rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-pink-600 text-white rounded-r-lg hover:bg-pink-500 transition-colors"
            >
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Compartilhe o link ou o código QR para que outros possam ver sua
            linha do tempo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < step
                    ? "bg-pink-500"
                    : index === step
                    ? "bg-pink-300"
                    : "bg-gray-600"
                }`}
              >
                {index < step ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-600 rounded-full">
            <div
              className="h-full bg-pink-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderForm()}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-500 text-white rounded-lg flex items-center">
            <p>{errors.general}</p>
          </div>
        )}
        {step < 3 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {step > 0 && (
              <Button
                label="Voltar"
                onClick={handleBack}
                variant="default"
                icon={<ArrowLeft size={20} />}
                disabled={step === 0}
              />
            )}
            <Button
              label="Próximo"
              onClick={handleNext}
              disabled={isNextDisabled}
              variant="primary"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Component() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoveStoryForm />
    </QueryClientProvider>
  );
}
