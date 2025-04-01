"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { StepIndicator } from "@/components/StepIndicator";
import { NavigationButtons } from "@/components/NavigationButtons";
import { MemoryFormFields } from "@/components/MemoryFormFields";

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: File | null;
  photoMimeType: string;
}

interface CoupleData {
  partner1: string;
  partner2: string;
  title: string;
  isPaid: boolean;
}

export default function FreeLoveJourneyForm() {
  const [step, setStep] = useState(0);
  const [coupleData, setCoupleData] = useState<CoupleData>({
    partner1: "",
    partner2: "",
    title: "",
    isPaid: false,
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
  const [formTouched, setFormTouched] = useState(false);
  const [fieldsTouched, setFieldsTouched] = useState<{
    [key: string]: boolean;
  }>({});

  const queryClient = useQueryClient();
  const router = useRouter();

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
    router.push(`/qr-code/${journeyId}`);
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (step < 3) {
      if (step === 0 && (!coupleData.partner1 || !coupleData.partner2)) {
        isValid = false;
        if (!coupleData.partner1 && fieldsTouched.partner1)
          newErrors.partner1 = "Campo obrigatório";
        if (!coupleData.partner2 && fieldsTouched.partner2)
          newErrors.partner2 = "Campo obrigatório";
      } else if (step === 1 && !coupleData.title) {
        isValid = false;
        if (fieldsTouched.title) newErrors.title = "Campo obrigatório";
      }
    } else if (step === 3) {
      if (showMemoryForm) {
        if (!currentMemory.date && fieldsTouched.date)
          newErrors.date = "Campo obrigatório";
        if (!currentMemory.title && fieldsTouched.title)
          newErrors.title = "Campo obrigatório";
        if (!currentMemory.description && fieldsTouched.description)
          newErrors.description = "Campo obrigatório";
        if (!currentMemory.photo && fieldsTouched.photo)
          newErrors.photo = "Campo obrigatório";

        // Verificar se todos os campos necessários estão preenchidos
        isValid = Boolean(
          currentMemory.date &&
            currentMemory.title &&
            currentMemory.description &&
            currentMemory.photo
        );
      } else {
        isValid = memories.length === 3;
      }
    }

    setErrors(newErrors);
    setIsNextDisabled(!isValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Marcar o campo como tocado
    setFieldsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (step < 3) {
      setCoupleData((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentMemory((prev) => ({ ...prev, [name]: value }));
    }
    validateStep();
  };

  const handleDateChange = (date: Date | undefined) => {
    setFieldsTouched((prev) => ({
      ...prev,
      date: true,
    }));

    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    setCurrentMemory((prev) => ({ ...prev, date: formattedDate }));
    validateStep();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsTouched((prev) => ({
      ...prev,
      photo: true,
    }));

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
    // Marcar todos os campos como tocados ao tentar adicionar
    setFieldsTouched({
      date: true,
      title: true,
      description: true,
      photo: true,
    });

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

      // Resetar os campos tocados após adicionar com sucesso
      setFieldsTouched({});

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

      // Resetar os campos tocados ao editar
      setFieldsTouched({});
    }
  };

  const handleNext = () => {
    // Marcar o formulário como tocado ao tentar avançar
    setFormTouched(true);

    // Marcar todos os campos relevantes como tocados
    if (step === 0) {
      setFieldsTouched({
        ...fieldsTouched,
        partner1: true,
        partner2: true,
      });
    } else if (step === 1) {
      setFieldsTouched({
        ...fieldsTouched,
        title: true,
      });
    }

    validateStep();

    if (!isNextDisabled) {
      setStep((prev) => prev + 1);
      // Resetar os campos tocados ao avançar para o próximo passo
      setFieldsTouched({});
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    // Resetar os erros ao voltar
    setErrors({});
  };

  const handleSubmit = () => {
    setFormTouched(true);

    if (memories.length !== 3) {
      setErrors({
        general: "Adicione 3 lembranças antes de finalizar.",
      });
      return;
    }
    createJourneyMutation.mutate(coupleData);
  };

  useEffect(() => {
    // Só validar se o formulário já foi tocado ou se estamos em um passo avançado
    if (formTouched || step > 0 || Object.keys(fieldsTouched).length > 0) {
      validateStep();
    }
  }, [
    step,
    coupleData,
    currentMemory,
    memories,
    showMemoryForm,
    formTouched,
    fieldsTouched,
  ]);

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Bem-vindo! Vamos começar com os nomes.
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
                <p className="text-destructive text-sm mt-1">
                  {errors.partner1}
                </p>
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
                <p className="text-destructive text-sm mt-1">
                  {errors.partner2}
                </p>
              )}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Qual é o título da história do casal?
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
                <p className="text-destructive text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Agora, vamos adicionar lembranças especiais!
            </h2>
            <p className="text-gray-300">
              Adicione 3 lembranças para sua linha do tempo.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-5 mb-4">
              <h2 className="text-2xl font-bold text-primary">Lembranças</h2>
              {memories.length < 3 && (
                <Button
                  label="Adicionar lembrança"
                  variant="primary"
                  onClick={() => setShowMemoryForm(true)}
                  icon={<Plus size={20} className="mr-2" />}
                />
              )}
            </div>
            {memories.map((memory) => (
              <div
                onClick={() => handleEditMemory(memory.id)}
                key={memory.id}
                className="bg-secondary border border-gray-500 p-4 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-secondary/80 transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary truncate flex-grow mr-4">
                  {memory.title}
                </h3>
                <div>
                  <Button
                    onClick={() => {
                      handleDeleteMemory(memory.id);
                    }}
                    variant="delete"
                    icon={<X size={20} />}
                  />
                </div>
              </div>
            ))}
            {showMemoryForm && (
              <div className="space-y-4 bg-secondary p-4 rounded-lg border border-gray-500">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {editingMemoryId ? "Editar Lembrança" : "Nova Lembrança"}
                </h3>
                <MemoryFormFields
                  currentMemory={currentMemory}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleDateChange={handleDateChange}
                  handlePhotoChange={handlePhotoChange}
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    onClick={() => {
                      setShowMemoryForm(false);
                      setFieldsTouched({});
                      setErrors({});
                    }}
                    variant="default"
                    label="Cancelar"
                  />
                  <Button
                    onClick={handleAddMemory}
                    label={editingMemoryId ? "Salvar Alterações" : "Salvar"}
                    variant="primary"
                  />
                </div>
              </div>
            )}

            {memories.length === 3 && (
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
      default:
        return null;
    }
  };

  if (createJourneyMutation.isPending || createMemoryMutation.isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-secondary-dark text-gray-100 flex items-center justify-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl max-w-md w-full">
        <StepIndicator totalSteps={totalSteps} currentStep={step} />
        {renderForm()}
        {errors.general && (
          <div className="mt-4 p-3 bg-destructive text-white rounded-lg flex items-center">
            <p>{errors.general}</p>
          </div>
        )}
        {step < 3 && (
          <NavigationButtons
            step={step}
            isNextDisabled={isNextDisabled}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
