
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string; // Consider using Date type if doing complex date ops
  readingTime: string;
  author?: string;
  aiHint?: string; // For Unsplash keyword hint
}

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    setFormattedDate(
      new Date(post.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    );
  }, [post.date]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
          <a className="block">
            <CardHeader className="p-0">
              <div className="relative w-full aspect-video">
                <Image
                  src={post.imageUrl}
                  alt={`Imagem de capa para ${post.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="bg-muted"
                  data-ai-hint={post.aiHint || "article health blog"}
                />
              </div>
            </CardHeader>
          </a>
        </Link>
        <CardContent className="p-6 flex-grow">
          <Badge variant="secondary" className="mb-2">{post.category}</Badge>
          <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
            <a className="block">
              <CardTitle className="text-xl md:text-2xl text-primary mb-2 hover:underline">{post.title}</CardTitle>
            </a>
          </Link>
          <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-3">{post.excerpt}</CardDescription>
          <div className="flex items-center text-xs text-muted-foreground space-x-3">
            <div className="flex items-center">
              <CalendarDays className="h-3.5 w-3.5 mr-1" />
              <span>{formattedDate || "Carregando data..."}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{post.readingTime} de leitura</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t">
          <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
            <a className="flex items-center text-sm text-accent hover:text-accent/80 font-semibold group">
              Leia Mais
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

