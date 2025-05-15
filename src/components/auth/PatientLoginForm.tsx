
"use client";

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PatientLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!auth) {
      setConfigError("Firebase não está configurado corretamente. Login desabilitado.");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError('Firebase não configurado. Não é possível fazer login.');
      return;
    }
    
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence); // Persist session
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Bem-Sucedido!", description: "Redirecionando para o seu painel..." });
      router.push('/meu-painel');
    } catch (err: any) {
      console.error("Patient login error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Email ou senha inválidos. Verifique suas credenciais.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Muitas tentativas de login falhadas. Tente novamente mais tarde.");
      } else if (err.code === 'auth/invalid-email') {
        setError("O formato do email é inválido.");
      } else {
        setError(`Falha no login: ${err.message}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (configError) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Erro de Configuração</AlertTitle>
        <AlertDescription>{configError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro de Login</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || !auth}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || !auth}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || !auth}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
      {/* 
        Optionally, add a link for password reset or account creation if needed in the future.
        e.g., <p className="text-xs text-center text-muted-foreground">Não tem conta? <Link href="/registrar" className="underline">Crie uma</Link></p> 
      */}
    </div>
  );
}
