
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Conheça a Política de Privacidade da AB Vitta Clínica Médica.",
   robots: { // No index for placeholder pages
    index: false,
    follow: false,
  }
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Política de Privacidade</h1>
      </header>
      <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-4">1. Introdução</h2>
        <p className="text-foreground/90 mb-4">
          A AB Vitta Clínica Médica ("Clínica", "nós", "nosso") está comprometida em proteger a privacidade dos seus usuários ("você", "seu"). Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">2. Informações que Coletamos</h2>
        <p className="text-foreground/90 mb-4">
          Podemos coletar as seguintes informações pessoais:
          <ul className="list-disc list-inside ml-4 my-2">
            <li>Informações de identificação: nome, CPF, data de nascimento.</li>
            <li>Informações de contato: endereço de e-mail, número de telefone, endereço residencial.</li>
            <li>Informações de saúde: histórico médico, informações sobre consultas, resultados de exames (com seu consentimento explícito).</li>
            <li>Informações de pagamento: dados de cartão de crédito (processados por gateways seguros).</li>
            <li>Informações técnicas: endereço IP, tipo de navegador, dados de uso do site.</li>
          </ul>
        </p>
        
        <h2 className="text-2xl font-semibold text-primary mb-4">3. Como Usamos Suas Informações</h2>
        <p className="text-foreground/90 mb-4">
            Utilizamos suas informações para:
            <ul className="list-disc list-inside ml-4 my-2">
                <li>Fornecer e gerenciar nossos serviços médicos.</li>
                <li>Processar agendamentos e pagamentos.</li>
                <li>Comunicarmo-nos com você sobre consultas e informações relevantes.</li>
                <li>Melhorar nossos serviços e personalizar sua experiência.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">4. Compartilhamento de Informações</h2>
        <p className="text-foreground/90 mb-4">
            Não compartilhamos suas informações pessoais com terceiros, exceto:
            <ul className="list-disc list-inside ml-4 my-2">
                <li>Com seu consentimento explícito.</li>
                <li>Com prestadores de serviços que nos auxiliam (ex: gateways de pagamento), sob acordos de confidencialidade.</li>
                <li>Quando exigido por lei ou para proteger nossos direitos.</li>
            </ul>
        </p>
        
        <h2 className="text-2xl font-semibold text-primary mb-4">5. Segurança dos Dados</h2>
        <p className="text-foreground/90 mb-4">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">6. Seus Direitos</h2>
        <p className="text-foreground/90 mb-4">
            Você tem o direito de acessar, corrigir, excluir ou restringir o processamento de suas informações pessoais. Para exercer esses direitos, entre em contato conosco.
        </p>
        
        <h2 className="text-2xl font-semibold text-primary mb-4">7. Cookies</h2>
        <p className="text-foreground/90 mb-4">
            Nosso site pode usar cookies para melhorar a experiência do usuário. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">8. Alterações nesta Política</h2>
        <p className="text-foreground/90 mb-4">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações significativas publicando a nova política em nosso site.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">9. Contato</h2>
        <p className="text-foreground/90">
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email: contato@abvitta.com.br.
        </p>
        <p className="text-foreground/90 mt-4 text-sm">
          Última atualização: [Inserir Data da Última Atualização]
        </p>
      </section>
    </div>
  );
}
