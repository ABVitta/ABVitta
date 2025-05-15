
import { DoctorCard, type Doctor } from "@/components/DoctorCard";
import type { Metadata } from "next";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Nossos Médicos",
  description: "Conheça a equipe de médicos especialistas da AB Vitta Clínica Médica. Profissionais qualificados em diversas áreas da saúde.",
  keywords: ["médicos", "especialistas", "equipe médica", "cardiologia", "dermatologia", "pediatria", "ginecologia", "ortopedia", "clínica geral", "AB Vitta"],
};

const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dra. Ana Beatriz Silva",
    specialization: "Cardiologia",
    crm: "12345/SP",
    photoUrl: "https://picsum.photos/seed/doctorFemaleCardiology/400/300",
    bio: "Especialista em doenças do coração e prevenção cardiovascular. Ampla experiência em ecocardiografia e acompanhamento de pacientes crônicos.",
    availableOnline: true,
  },
  {
    id: "2",
    name: "Dr. Bruno Oliveira Costa",
    specialization: "Dermatologia",
    crm: "67890/RJ",
    photoUrl: "https://picsum.photos/seed/doctorMaleDermatology/400/300",
    bio: "Focado em dermatologia clínica e estética. Tratamentos para acne, psoríase, e procedimentos de rejuvenescimento facial.",
    availableOnline: false,
  },
  {
    id: "3",
    name: "Dra. Carla Pereira Dias",
    specialization: "Pediatria",
    crm: "11223/MG",
    photoUrl: "https://picsum.photos/seed/doctorFemalePediatrics/400/300",
    bio: "Cuidado integral da criança e do adolescente. Acompanhamento do desenvolvimento infantil e puericultura.",
    availableOnline: true,
  },
  {
    id: "4",
    name: "Dr. Daniel Ferreira Lima",
    specialization: "Ortopedia e Traumatologia",
    crm: "44556/BA",
    photoUrl: "https://picsum.photos/seed/doctorMaleOrthopedics/400/300",
    bio: "Especialista em lesões esportivas e cirurgia do joelho. Atua com reabilitação e medicina regenerativa.",
    availableOnline: false,
  },
  {
    id: "5",
    name: "Dra. Helena Rodrigues Martins",
    specialization: "Ginecologia e Obstetrícia",
    crm: "77889/PR",
    photoUrl: "https://picsum.photos/seed/doctorFemaleGynecology/400/300",
    bio: "Acompanhamento pré-natal, partos e saúde da mulher em todas as fases da vida. Foco em medicina preventiva.",
    availableOnline: true,
  },
   {
    id: "6",
    name: "Dr. Lucas Almeida Gomes",
    specialization: "Clínica Geral",
    crm: "22334/SC",
    photoUrl: "https://picsum.photos/seed/doctorMaleGeneral/400/300",
    bio: "Atendimento primário, diagnósticos e encaminhamentos. Visão holística da saúde do paciente adulto.",
    availableOnline: true,
  },
];

export default function DoctorsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Nossos Médicos</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Conheça nossa equipe de especialistas dedicados ao seu bem-estar.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {doctorsData.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <section className="mt-12 py-8 bg-primary/5 rounded-lg shadow-md">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-7 w-7 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400 text-yellow-400 opacity-50'}`} /> // 4.9 stars
            ))}
          </div>
          <p className="text-lg font-semibold text-primary">
            Avaliação 4,9 baseada em mais de 200 atendimentos
          </p>
          <p className="text-sm text-muted-foreground">
            Compromisso com a excelência no cuidado ao paciente.
          </p>
        </div>
      </section>
    </div>
  );
}

