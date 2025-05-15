
import { SchedulingForm } from "@/components/forms/SchedulingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar Consulta",
  description: "Agende sua consulta na AB Vitta Clínica Médica. Preencha o formulário com seus dados e preferência de especialidade, data e horário.",
  keywords: ["agendar consulta", "marcar consulta", "agendamento online", "consulta médica", "especialidades médicas", "AB Vitta"],
};

export default function SchedulingPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Agendar Consulta</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Preencha o formulário abaixo para solicitar seu agendamento.
        </p>
      </header>
      <SchedulingForm />
    </div>
  );
}
