
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, ArrowRight, Heart, GraduationCap, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import { TestimonialCard, type Testimonial } from "@/components/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FAQSection } from "@/components/FAQSection";

const testimonialsData: Testimonial[] = [
  { id: "1", name: "J.S.", quote: "Atendimento excelente e muito atencioso! Recomendo.", stars: 5 },
  { id: "2", name: "M.P.", quote: "Profissionais competentes e uma clínica muito bem estruturada.", stars: 5 },
  { id: "3", name: "A.C.", quote: "Sempre fui muito bem tratado, desde a recepção até a consulta.", stars: 5 },
  { id: "4", name: "R.F.", quote: "Ótima experiência, médicos que realmente se importam com o paciente.", stars: 5 },
  { id: "5", name: "L.M.", quote: "Clínica com ambiente agradável e equipe nota 10!", stars: 5 },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
}


export default function HomePage() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })
  );

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 md:space-y-16 py-12 md:py-20">
      <AnimatedSection className="flex flex-col items-center space-y-4">
        <Stethoscope className="h-20 w-20 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-primary">AB Vitta</span>
          <span className="block text-3xl md:text-4xl text-foreground/90">Clínica Médica</span>
        </h1>
      </AnimatedSection>

      <AnimatedSection>
        <p className="text-2xl md:text-3xl text-primary/90 font-medium max-w-xl" style={{color: "#004E64"}}>
          Compromisso com sua saúde.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <Link href="/agendar">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-7 text-lg font-bold group transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl">
            Agende sua Consulta
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </AnimatedSection>
      
      <AnimatedSection className="mt-12 w-full max-w-4xl">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkb2N0b3J8ZW58MHx8fHwxNzQ3MTcxMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Moderna recepção de clínica médica com médica sorrindo"
          width={1200}
          height={600}
          className="rounded-lg shadow-xl object-cover"
          data-ai-hint="modern clinic reception smiling female doctor"
          priority
        />
      </AnimatedSection>

      <AnimatedSection
        className={cn(
          "mt-16 py-12 px-6 w-full max-w-5xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-xl shadow-xl"
        )}
      >
        <h2 className="text-3xl font-semibold mb-12 text-primary">Nossos Diferenciais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow" whileHover={{ y: -5 }}>
            <Heart className="h-10 w-10 text-primary mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Atendimento Humanizado</h3>
            <p className="text-muted-foreground">Foco no paciente, com escuta atenta e cuidado individualizado.</p>
          </motion.div>
          <motion.div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow" whileHover={{ y: -5 }}>
            <GraduationCap className="h-10 w-10 text-primary mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Profissionais Qualificados</h3>
            <p className="text-muted-foreground">Equipe médica experiente e em constante atualização.</p>
          </motion.div>
          <motion.div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow" whileHover={{ y: -5 }}>
            <MonitorSmartphone className="h-10 w-10 text-primary mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Tecnologia e Conforto</h3>
            <p className="text-muted-foreground">Estrutura moderna para diagnósticos precisos e seu bem-estar.</p>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        className={cn(
          "mt-16 py-12 w-full max-w-5xl"
        )}
      >
        <h2 className="text-3xl font-semibold mb-12 text-primary">Depoimentos</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.play}
        >
          <CarouselContent>
            {testimonialsData.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex h-10 w-10 bg-primary/80 hover:bg-primary text-primary-foreground shadow-md" />
          <CarouselNext className="hidden sm:flex h-10 w-10 bg-primary/80 hover:bg-primary text-primary-foreground shadow-md" />
        </Carousel>
      </AnimatedSection>

      <AnimatedSection className="mt-16 py-12 w-full max-w-5xl">
        <FAQSection />
      </AnimatedSection>

    </div>
  );
}
