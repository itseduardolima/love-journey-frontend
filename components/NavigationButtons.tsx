import { ArrowLeft, ArrowRight } from "lucide-react"
import Button from "./Button"

interface NavigationButtonsProps {
  step: number
  isNextDisabled: boolean
  onBack: () => void
  onNext: () => void
}

export function NavigationButtons({ step, isNextDisabled, onBack, onNext }: NavigationButtonsProps) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {step > 0 && (
        <Button
          label="Voltar"
          onClick={onBack}
          variant="default"
          icon={<ArrowLeft size={20} />}
          disabled={step === 0}
        />
      )}
      <Button
        label="Próximo"
        onClick={onNext}
        disabled={isNextDisabled}
        variant="primary"
        icon={<ArrowRight size={20} />}
        iconPosition="right"
      />
    </div>
  )
}