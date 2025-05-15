
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Updated import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminPainelPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setConfigError("Firebase não está configurado corretamente. Não é possível carregar o painel.");
      setLoading(false);
      // Optionally redirect to a generic error page or login with a message
      // router.push('/admin/login?error=config_failed'); 
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login'); // Redirect to admin login if not authenticated
      }
      setLoading(false);
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
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out (admin):', error);
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
    // This case should ideally be handled by the redirect in onAuthStateChanged,
    // but as a fallback or if auth is unavailable.
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Painel do Médico/Admin</h1>
        <Button onClick={handleLogout} variant="destructive" disabled={!auth}>
          Sair
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo(a), {user.email}!</CardTitle>
          <CardDescription>Gerencie seus horários e agendamentos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Adicionar Horários Disponíveis</h2>
            {/* Placeholder for form to add availability */}
            <p className="text-muted-foreground">Em breve: Formulário para adicionar novos horários à sua agenda.</p>
            <Button className="mt-2" disabled>Adicionar Horário (Em breve)</Button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Agendamentos Futuros</h2>
            {/* Placeholder for upcoming appointments list */}
            <p className="text-muted-foreground">Em breve: Lista de seus próximos agendamentos.</p>
            <div className="border p-4 mt-2 rounded-md bg-card">
              <p>Nenhum agendamento futuro no momento.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Status de Atendimento</h2>
            {/* Placeholder for managing appointment status */}
            <p className="text-muted-foreground">Em breve: Funcionalidade para marcar status de atendimento (agendado, em andamento, concluído).</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
