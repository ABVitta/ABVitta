
import type { Metadata } from "next";
import { BlogPostCard, type BlogPost } from "@/components/blog/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog - AB Vitta Clínica Médica",
  description: "Dicas de saúde, nutrição, bem-estar e informações sobre diversas especialidades médicas. Mantenha-se informado com o blog da AB Vitta.",
  keywords: ["blog saúde", "dicas de saúde", "nutrição", "bem-estar", "AB Vitta", "artigos médicos", "gripe", "resfriado", "estresse", "clínico geral"],
};

const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "Diferença entre Gripe e Resfriado: Saiba Identificar",
    slug: "diferenca-gripe-resfriado",
    excerpt: "Entenda os sintomas de cada uma e quando procurar um médico. A gripe costuma ser mais intensa, enquanto o resfriado é mais leve.",
    imageUrl: "https://picsum.photos/seed/healthTips/600/400",
    category: "Saúde Geral",
    date: "2024-07-20",
    readingTime: "3 min",
    author: "Equipe AB Vitta",
    aiHint: "medical infographic illness symptoms"
  },
  {
    id: "2",
    title: "5 Sinais de Estresse que seu Corpo Pode Estar Enviando",
    slug: "sinais-estresse-corpo",
    excerpt: "O estresse crônico afeta sua saúde física e mental. Aprenda a reconhecer os sinais de alerta e como gerenciá-los.",
    imageUrl: "https://picsum.photos/seed/stressSigns/600/400",
    category: "Bem-Estar",
    date: "2024-07-18",
    readingTime: "4 min",
    author: "Equipe AB Vitta",
    aiHint: "person stressed fatigue headache"
  },
  {
    id: "3",
    title: "Quando Devo Procurar um Clínico Geral?",
    slug: "quando-procurar-clinico-geral",
    excerpt: "O clínico geral é o primeiro contato para muitos problemas de saúde. Saiba quando uma consulta com este especialista é indicada.",
    imageUrl: "https://picsum.photos/seed/generalPractitioner/600/400",
    category: "Especialidades",
    date: "2024-07-15",
    readingTime: "5 min",
    author: "Equipe AB Vitta",
    aiHint: "doctor patient consultation medical checkup"
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Nosso Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Artigos, dicas e informações para cuidar da sua saúde e bem-estar.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsData.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Placeholder for pagination or load more button */}
      <div className="text-center mt-12">
        <p className="text-muted-foreground">Mais posts em breve!</p>
      </div>
    </div>
  );
}
