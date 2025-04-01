import React from "react"
import { parse } from "date-fns"
import { DatePicker } from "@/components/DatePicker"
import { Input } from "@/components/Input"
import { TextArea } from "@/components/TextArea"
import { Check, Plus } from "lucide-react"

interface Memory {
  id: string
  date: string
  title: string
  description: string
  photo: File | null
  photoMimeType: string
}

interface MemoryFormFieldsProps {
  currentMemory: Memory
  errors: { [key: string]: string }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleDateChange: (date: Date | undefined) => void
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function MemoryFormFields({
  currentMemory,
  errors,
  handleInputChange,
  handleDateChange,
  handlePhotoChange
}: MemoryFormFieldsProps) {
  return (
    <>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-full p-3 bg-secondary border border-gray-500 text-white rounded-2xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all flex items-center justify-center">
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
    </>
  )
}