
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Updated import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MeuPainel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setConfigError("Firebase não está configurado corretamente. Não é possível carregar o painel do paciente.");
      setLoading(false);
      // Optionally redirect to login with an error message
      // router.push('/login?error=config_failed');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push('/login'); // Redirect to patient login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    if (!auth) {
      console.error('Error logging out: Firebase auth service is not available.');
      // Optionally show a toast or alert
      return;
    }
    try {
      await signOut(auth);
      router.push('/'); // Redirect to home or login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Carregando...</p>
      </div>
    );
  }

  if (configError) {
     return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro de Configuração</AlertTitle>
          <AlertDescription>{configError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
     // This case should ideally be handled by the redirect in onAuthStateChanged
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Meu Painel</h1>
        <Button onClick={handleLogout} variant="outline" disabled={!auth}>
          Sair
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Bem-vindo(a) de volta!</CardTitle>
          <CardDescription>
            {user.phoneNumber ? `Conectado como ${user.phoneNumber}.` : user.email ? `Conectado como ${user.email}.` : 'Paciente.'}
            Acompanhe seus agendamentos e histórico de consultas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Próximos Agendamentos</h2>
            <div className="border p-4 rounded-md bg-card-foreground/5">
              <p className="text-muted-foreground">Nenhum agendamento futuro encontrado.</p>
              {/* Future: Map through appointments */}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Histórico de Consultas</h2>
            <div className="border p-4 rounded-md bg-card-foreground/5">
              <p className="text-muted-foreground">Nenhuma consulta anterior encontrada.</p>
              {/* Future: Map through history */}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Comprovantes de Atendimento</h2>
            <div className="border p-4 rounded-md bg-card-foreground/5">
              <p className="text-muted-foreground">Nenhum comprovante disponível para download.</p>
              {/* Future: List downloadable receipts */}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeuPainel;
