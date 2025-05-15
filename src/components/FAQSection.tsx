
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    id: "faq1",
    question: "Como funciona o agendamento online?",
    answer:
      "Você pode agendar sua consulta diretamente pelo nosso site, na seção 'Agendar Consulta'. Basta preencher seus dados, escolher a especialidade, o profissional (se houver preferência), a data e o horário disponíveis. Após a solicitação, nossa equipe entrará em contato para confirmar.",
  },
  {
    id: "faq2",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos diversas formas de pagamento, incluindo cartões de crédito (parcelado em até 3x para consultas de R$200), débito e PIX. O pagamento é geralmente realizado no momento da confirmação do agendamento ou na clínica para consultas presenciais.",
  },
  {
    id: "faq3",
    question: "A AB Vitta atende por teleconsulta?",
    answer:
      "Sim! Oferecemos teleconsultas para diversas especialidades, proporcionando comodidade e acesso à saúde de onde você estiver. Verifique a disponibilidade de telemedicina para o especialista desejado ao agendar.",
  },
  {
    id: "faq4",
    question: "Quais especialidades médicas são oferecidas?",
    answer:
      "Contamos com uma equipe multidisciplinar, incluindo Cardiologia, Dermatologia, Pediatria, Ginecologia, Ortopedia e Clínica Geral. Consulte nossa página 'Nossos Médicos' para conhecer todos os especialistas.",
  },
  {
    id: "faq5",
    question: "Como me preparo para uma teleconsulta?",
    answer:
      "Para uma teleconsulta, certifique-se de ter uma boa conexão com a internet, um dispositivo com câmera e microfone (celular, tablet ou computador) e esteja em um local tranquilo e privado. Tenha em mãos seus documentos e, se aplicável, exames anteriores.",
  },
];

export function FAQSection() {
  return (
    <section className="py-12 px-4 w-full bg-muted/30 rounded-xl shadow-md">
      <div className="container mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-3" />
          <h2 className="text-3xl font-semibold text-primary">Perguntas Frequentes</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Tire suas dúvidas sobre nossos serviços e funcionamento.
          </p>
        </header>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="bg-card mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="px-6 py-4 text-lg font-medium text-left hover:no-underline text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-base text-foreground/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
