
import type { Metadata } from "next";
import { PatientLoginForm } from "@/components/auth/PatientLoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Área do Paciente - Login",
  description: "Acesse seu painel de paciente na AB Vitta Clínica Médica.",
  keywords: ["login paciente", "área do paciente", "minha conta", "AB Vitta"],
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Área do Paciente</CardTitle>
          <CardDescription>Acesse seu painel para visualizar agendamentos e histórico.</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
