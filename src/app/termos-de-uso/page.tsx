
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Leia os Termos de Uso da AB Vitta Clínica Médica.",
  robots: { // No index for placeholder pages
    index: false,
    follow: false,
  }
};

export default function TermosDeUsoPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Termos de Uso</h1>
      </header>
      <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-4">1. Aceitação dos Termos</h2>
        <p className="text-foreground/90 mb-4">
          Ao acessar e utilizar os serviços da AB Vitta Clínica Médica ("Clínica", "nós", "nosso"), você concorda em cumprir e estar sujeito a estes Termos de Uso. Se você não concorda com estes termos, por favor, não utilize nossos serviços.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">2. Serviços Oferecidos</h2>
        <p className="text-foreground/90 mb-4">
          A AB Vitta Clínica Médica oferece serviços de consultas médicas, telemedicina, agendamento online e informações sobre saúde. Nossos serviços não substituem o aconselhamento médico de emergência.
        </p>
        
        <h2 className="text-2xl font-semibold text-primary mb-4">3. Uso do Site</h2>
        <p className="text-foreground/90 mb-4">
            Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de, restrinja ou iniba o uso e gozo do site por qualquer terceiro.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">4. Agendamento de Consultas</h2>
        <p className="text-foreground/90 mb-4">
            O agendamento de consultas está sujeito à disponibilidade dos profissionais. A confirmação do agendamento será enviada por nossos canais de comunicação. Cancelamentos ou reagendamentos devem ser feitos com antecedência, conforme política específica.
        </p>
        
        <h2 className="text-2xl font-semibold text-primary mb-4">5. Limitação de Responsabilidade</h2>
        <p className="text-foreground/90 mb-4">
            A AB Vitta Clínica Médica não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos resultantes do uso ou da incapacidade de usar nossos serviços.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">6. Modificações nos Termos</h2>
        <p className="text-foreground/90 mb-4">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">7. Contato</h2>
        <p className="text-foreground/90">
          Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através do email: contato@abvitta.com.br.
        </p>
        <p className="text-foreground/90 mt-4 text-sm">
          Última atualização: [Inserir Data da Última Atualização]
        </p>
      </section>
    </div>
  );
}
