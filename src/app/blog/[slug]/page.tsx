
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";

// Dummy data - in a real app, this would come from a CMS or database
const blogPostsData = [
  {
    id: "1",
    title: "Diferença entre Gripe e Resfriado: Saiba Identificar",
    slug: "diferenca-gripe-resfriado",
    excerpt: "Entenda os sintomas de cada uma e quando procurar um médico. A gripe costuma ser mais intensa, enquanto o resfriado é mais leve.",
    content: "<p>A gripe e o resfriado são duas doenças respiratórias comuns, mas causadas por vírus diferentes e com intensidades distintas. Saber diferenciá-las é importante para o tratamento adequado e para evitar complicações.</p><h3>Sintomas do Resfriado:</h3><ul><li>Coriza e congestão nasal</li><li>Espirros</li><li>Dor de garganta leve</li><li>Tosse leve e seca</li><li>Mal-estar geral leve</li><li>Febre baixa (raramente)</li></ul><p>O resfriado geralmente tem uma evolução mais branda e curta, durando de 3 a 7 dias.</p><h3>Sintomas da Gripe:</h3><ul><li>Febre alta (acima de 38°C)</li><li>Dores musculares e no corpo intensas</li><li>Fadiga e fraqueza acentuadas</li><li>Dor de cabeça</li><li>Tosse seca e persistente (pode evoluir para produtiva)</li><li>Calafrios</li><li>Dor de garganta</li></ul><p>A gripe costuma ser mais debilitante e pode levar a complicações como pneumonia, especialmente em grupos de risco (idosos, crianças, gestantes, pessoas com doenças crônicas).</p><h3>Quando procurar um médico?</h3><p>Para resfriados comuns, o repouso e a hidratação costumam ser suficientes. No entanto, procure um médico se:</p><ul><li>Os sintomas da gripe estiverem presentes, especialmente febre alta e dores no corpo.</li><li>Houver dificuldade para respirar ou falta de ar.</li><li>A febre persistir por mais de 3 dias.</li><li>Os sintomas piorarem após uma melhora inicial.</li><li>Você pertencer a um grupo de risco.</li></ul><p>Não se automedique, especialmente com antibióticos, pois eles não combatem vírus. Um profissional de saúde poderá indicar o tratamento mais adequado.</p>",
    imageUrl: "https://picsum.photos/seed/healthTips/800/450",
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
    content: "<p>O estresse é uma reação natural do corpo a desafios, mas quando se torna crônico, pode ter sérias consequências para a saúde. Fique atento a estes sinais:</p><ol><li><strong>Dores de cabeça frequentes:</strong> Tensão muscular causada pelo estresse pode levar a dores de cabeça tensionais ou enxaquecas.</li><li><strong>Problemas digestivos:</strong> O estresse pode afetar o sistema digestivo, causando sintomas como dor de estômago, azia, diarreia ou constipação. A síndrome do intestino irritável também pode ser agravada.</li><li><strong>Alterações no sono:</strong> Dificuldade para dormir, insônia ou sono excessivo podem ser sinais de que o estresse está desregulando seu ciclo de sono-vigília.</li><li><strong>Fadiga constante:</strong> Sentir-se cansado o tempo todo, mesmo após uma noite de sono, pode indicar que seu corpo está sobrecarregado pelo estresse.</li><li><strong>Alterações de humor e irritabilidade:</strong> O estresse pode deixá-lo mais irritado, ansioso, triste ou com dificuldade de concentração. Mudanças bruscas de humor também são comuns.</li></ol><h3>O que fazer?</h3><p>Se você identificar esses sinais, é importante buscar formas de gerenciar o estresse. Algumas estratégias incluem:</p><ul><li>Prática regular de atividade física.</li><li>Técnicas de relaxamento, como meditação ou respiração profunda.</li><li>Manter uma alimentação equilibrada.</li><li>Estabelecer limites e aprender a dizer não.</li><li>Buscar hobbies e atividades prazerosas.</li><li>Conversar com amigos, familiares ou um profissional de saúde mental.</li></ul><p>Cuidar da sua saúde mental é fundamental para o bem-estar geral.</p>",
    imageUrl: "https://picsum.photos/seed/stressSigns/800/450",
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
    content: "<p>O médico clínico geral desempenha um papel fundamental no sistema de saúde, sendo muitas vezes o primeiro profissional a ser consultado. Ele possui uma visão integral do paciente e está apto a diagnosticar e tratar uma ampla variedade de doenças.</p><h3>Situações comuns para procurar um Clínico Geral:</h3><ul><li><strong>Check-ups anuais e exames preventivos:</strong> Para avaliação geral da saúde, solicitação de exames de rotina e orientações sobre prevenção de doenças.</li><li><strong>Sintomas agudos e inespecíficos:</strong> Como febre, dor de cabeça, mal-estar, dores no corpo, tosse, sintomas gripais, problemas digestivos leves.</li><li><strong>Acompanhamento de doenças crônicas estáveis:</strong> Como hipertensão arterial, diabetes tipo 2 (em fases iniciais ou controladas), colesterol alto, entre outras, muitas vezes em conjunto com especialistas.</li><li><strong>Orientações sobre estilo de vida saudável:</strong> Dicas sobre alimentação, atividade física, cessação do tabagismo e outros hábitos.</li><li><strong>Encaminhamento para especialistas:</strong> Quando um problema de saúde necessita de uma avaliação mais aprofundada, o clínico geral pode encaminhar para o especialista adequado (cardiologista, dermatologista, etc.).</li><li><strong>Dúvidas sobre saúde:</strong> Para esclarecer dúvidas sobre sintomas, tratamentos ou qualquer questão relacionada à sua saúde.</li></ul><p>Ter um clínico geral de confiança é importante para um cuidado contínuo e coordenado da sua saúde. Ele pode conhecer seu histórico médico e ajudá-lo a navegar pelo sistema de saúde de forma mais eficiente.</p>",
    imageUrl: "https://picsum.photos/seed/generalPractitioner/800/450",
    category: "Especialidades",
    date: "2024-07-15",
    readingTime: "5 min",
    author: "Equipe AB Vitta",
    aiHint: "doctor patient consultation medical checkup"
  },
];

export interface BlogPostPageData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  readingTime: string;
  author?: string;
  aiHint?: string;
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostsData.find(p => p.slug === params.slug);
  if (!post) {
    return {
      title: "Post Não Encontrado",
      description: "O post que você está procurando não foi encontrado.",
    };
  }
  return {
    title: `${post.title} | Blog AB Vitta`,
    description: post.excerpt,
    keywords: [post.category, post.title, "AB Vitta", "blog saúde"],
    openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.imageUrl, width: 800, height: 450, alt: post.title }],
        type: 'article',
        publishedTime: new Date(post.date).toISOString(), 
        authors: [post.author || "Equipe AB Vitta"],
    }
  };
}

export default function BlogPostPageServer({ params }: { params: { slug: string } }) {
  const post = blogPostsData.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post as BlogPostPageData} />;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}
