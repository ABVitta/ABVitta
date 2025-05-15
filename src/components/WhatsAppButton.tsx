
"use client";

import { MessageSquare } from "lucide-react"; // Using MessageSquare as a generic chat icon
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WhatsAppButton() {
  // Replace with your actual WhatsApp number
  const whatsappNumber = "5511999999999"; // Example: 55 (Brazil) + 11 (São Paulo) + 999999999 (Number)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`;

  return (
    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" passHref>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 opacity-50 hover:opacity-100 transition-opacity duration-300"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageSquare className="h-7 w-7 text-white" />
      </Button>
    </Link>
  );
}
