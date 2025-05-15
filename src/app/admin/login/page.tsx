
"use client";

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Updated import
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!auth) {
      setConfigError("Firebase não está configurado corretamente. Funcionalidades de autenticação estão desabilitadas.");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError("Firebase não configurado. Não é possível fazer login.");
      return;
    }
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence); // Persist session
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Bem-Sucedido!", description: "Redirecionando para o painel administrativo..." });
      router.push('/admin/painel');
    } catch (err: any) {
      console.error("Admin login error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Email ou senha inválidos. Verifique suas credenciais.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Muitas tentativas de login falhadas. Tente novamente mais tarde.");
      } else {
        setError(`Falha no login: ${err.message}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (configError) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro de Configuração</AlertTitle>
          <AlertDescription>{configError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Painel Administrativo</CardTitle>
          <CardDescription>Acesso restrito para médicos e administradores.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Erro de Login</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !auth}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
