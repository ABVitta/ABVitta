
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história, missão e valores da AB Vitta Clínica Médica. Saiba mais sobre nossos fundadores e nosso compromisso com a sua saúde.",
  keywords: ["sobre nós", "missão", "valores", "história da clínica", "fundadores", "AB Vitta", "compromisso com a saúde"],
};

export default function AboutUsPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Sobre a AB Vitta</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Conheça mais sobre nossa história, missão e os valores que nos guiam no cuidado com sua saúde.
        </p>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Nossa Missão</h2>
        <div className="space-y-4 text-foreground/90 text-justify">
          <p>
            Na AB Vitta Clínica Médica, nossa missão é oferecer um atendimento médico de excelência,
            pautado na humanização, ética e compromisso com o bem-estar integral de nossos pacientes.
            Buscamos ser referência em cuidados de saúde, combinando conhecimento técnico atualizado
            com uma abordagem acolhedora e personalizada.
          </p>
          <p>
            Acreditamos que a saúde é o bem mais precioso e, por isso, dedicamos nossos esforços
            para proporcionar diagnósticos precisos, tratamentos eficazes e, acima de tudo,
            uma relação de confiança e respeito com cada pessoa que nos procura.
          </p>
        </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Nossos Fundadores</h2>
            <div className="space-y-4 text-foreground/90 text-justify">
              <p>
                A AB Vitta foi fundada pelos visionários Dr. Arthur benevolent e Dra. Beatriz Vitalis, 
                médicos com vasta experiência e uma paixão compartilhada por transformar a saúde 
                através de um cuidado mais humano e acessível.
              </p>
              <p>
                Movidos pelo desejo de criar um espaço onde a tecnologia e a empatia caminham juntas,
                eles idealizaram uma clínica que não apenas trata doenças, mas promove a saúde e a
                qualidade de vida. Seu legado é o nosso compromisso diário com cada paciente.
              </p>
            </div>
          </section>
        </div>
        <div className="order-1 md:order-2">
           <Image
            src="https://picsum.photos/seed/founders/600/400?grayscale"
            alt="Fundadores da AB Vitta Clínica Médica"
            width={600}
            height={400}
            className="rounded-lg shadow-xl object-cover aspect-[3/2]"
            data-ai-hint="doctors portrait professional team"
          />
        </div>
      </div>

       <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Nossos Valores</h2>
        <ul className="list-disc list-inside space-y-2 text-foreground/90">
          <li><span className="font-semibold">Compromisso:</span> Dedicação total à saúde e satisfação dos nossos pacientes.</li>
          <li><span className="font-semibold">Ética:</span> Atuação pautada na integridade, transparência e respeito.</li>
          <li><span className="font-semibold">Excelência:</span> Busca contínua por aprimoramento técnico e qualidade no atendimento.</li>
          <li><span className="font-semibold">Humanização:</span> Cuidado individualizado, com empatia e acolhimento.</li>
          <li><span className="font-semibold">Inovação:</span> Utilização de tecnologias e práticas modernas para melhores resultados.</li>
        </ul>
      </section>
    </div>
  );
}
