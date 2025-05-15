
"use client";

import type { BlogPostPageData } from "@/app/blog/[slug]/page";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays, Clock, UserCircle } from "lucide-react";

interface BlogPostDetailProps {
  post: BlogPostPageData;
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setFormattedDate(
        new Date(post.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      );
    }
  }, [post]);

  if (!post) {
    // This should ideally be caught by notFound() in the server component
    return <div>Post não encontrado.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <article className="space-y-8">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o Blog
        </Link>

        <header>
          <Badge variant="secondary" className="mb-2">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1.5" />
              <span>Publicado em {formattedDate || "Carregando data..."}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              <span>{post.readingTime} de leitura</span>
            </div>
            {post.author && (
              <div className="flex items-center">
                <UserCircle className="h-4 w-4 mr-1.5" />
                <span>Por {post.author}</span>
              </div>
            )}
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={`Imagem principal para ${post.title}`}
            fill // Changed from layout="fill"
            style={{objectFit:"cover"}} // Changed from objectFit="cover"
            priority
            data-ai-hint={post.aiHint || "article health blog detail"}
          />
        </div>

        <Card className="shadow-lg">
          <CardContent className="prose prose-lg max-w-none p-6 md:p-8 text-foreground/90">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
        </Card>

        <div className="text-center mt-12">
            <Link href="/agendar" legacyBehavior>
                <a className="inline-block bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3 px-8 rounded-lg shadow-md transition-colors">
                    Agende sua Consulta
                </a>
            </Link>
        </div>
      </article>
    </div>
  );
}
