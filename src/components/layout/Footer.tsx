
import Link from "next/link"; // Import Link for Next.js navigation

export function Footer() {
  const whatsappNumber = "5511999999999"; // Same as WhatsAppButton.tsx for consistency
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`;
  const instagramLink = "https://instagram.com/abvittaclinica"; // Placeholder Instagram link

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2 mb-4 text-sm">
          <Link href="/termos-de-uso" className="hover:text-primary hover:underline">
            Termos de Uso
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-primary hover:underline">
            Política de Privacidade
          </Link>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary hover:underline"
          >
            WhatsApp
          </a>
          <a 
            href={instagramLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary hover:underline"
          >
            Instagram
          </a>
        </div>
        <p className="text-sm">&copy; 2025 AB Vitta Clínica Médica. Todos os direitos reservados.</p>
        <p className="mt-1 text-xs">Rua Imaginária, 123 - Bairro Sonho Lindo - Cidade Exemplo, UF</p>
        <p className="text-xs">
          Telefone: (XX) XXXX-XXXX | Email: contato@abvitta.com.br
        </p>
      </div>
    </footer>
  );
}
