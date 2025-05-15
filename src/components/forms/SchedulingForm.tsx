
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, generateGoogleCalendarLink } from "@/lib/utils";
import { CalendarIcon, CheckCircle, ExternalLink, Share2 } from "lucide-react"; // Added Share2 for Google Calendar
import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const specialties = [
  "Cardiologia",
  "Dermatologia",
  "Pediatria",
  "Ginecologia",
  "Ortopedia",
  "Clínica Geral",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(?\d{2}\)?\s?(\d{4,5})-?\d{4}$/;

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  cpf: z.string().regex(cpfRegex, "CPF inválido. Use o formato XXX.XXX.XXX-XX."),
  phone: z.string().regex(phoneRegex, "Telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX."),
  specialty: z.string({ required_error: "Selecione uma especialidade." }),
  date: z.date({ required_error: "Selecione uma data." }),
  time: z.string({ required_error: "Selecione um horário." }),
  whatsappReminder: z.boolean().default(false).optional(),
});

export function SchedulingForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
      whatsappReminder: true, // Default to checked
      specialty: searchParams.get("especialidade") || undefined,
      // medico: searchParams.get("medico") || undefined, // If you add a doctor field
    },
  });

  useEffect(() => {
    const specialtyParam = searchParams.get("especialidade");
    if (specialtyParam && specialties.includes(specialtyParam)) {
      form.setValue("specialty", specialtyParam);
    }
    // Add similar logic for 'medico' if you have a doctor select field
    // const medicoParam = searchParams.get("medico");
    // if (medicoParam) {
    //   form.setValue("medico", medicoParam); // Assuming 'medico' is a field name
    // }
  }, [searchParams, form]);


  const whatsappNumber = "5511999999999";
  const whatsappMessage = (name: string) => encodeURIComponent(`Olá, sou ${name}. Acabei de solicitar um agendamento pelo site e gostaria de confirmar.`);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Combine date and time for Google Calendar
    const [hours, minutes] = values.time.split(':').map(Number);
    const appointmentDateTime = new Date(values.date);
    appointmentDateTime.setHours(hours, minutes, 0, 0);
    const appointmentEndTime = addHours(appointmentDateTime, 1); // Assuming 1-hour consultation

    const gCalLink = generateGoogleCalendarLink(
      `Consulta ${values.specialty} - AB Vitta`,
      appointmentDateTime,
      appointmentEndTime,
      `Consulta com ${values.specialty} para ${values.name}. CPF: ${values.cpf}. Telefone: ${values.phone}. Lembrete WhatsApp: ${values.whatsappReminder ? 'Sim' : 'Não'}`,
      "AB Vitta Clínica Médica (Online ou Presencial)"
    );

    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Agendamento Solicitado!
        </div>
      ),
      description: `Obrigado, ${values.name}. Seu pedido para ${values.specialty} em ${format(values.date, "dd/MM/yyyy", { locale: ptBR })} às ${values.time} foi recebido. Aguarde nossa confirmação. ${values.whatsappReminder ? 'Lembrete por WhatsApp ativado.' : ''}`,
      variant: "default",
      duration: 10000,
      action: (
        <div className="flex flex-col space-y-2 mt-2">
          <Link href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage(values.name)}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full">
              Confirmar no WhatsApp <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={gCalLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full">
              Adicionar ao Google Calendar <Share2 className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    });
    form.reset({
        name: "",
        cpf: "",
        phone: "",
        whatsappReminder: true, 
        specialty: searchParams.get("especialidade") || undefined,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 md:p-8 bg-card shadow-xl rounded-lg">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  {...field}
                  onChange={(e) => field.onChange(formatCPF(e.target.value))}
                  maxLength={14}
                />
              </FormControl>
              <FormDescription>Digite seu CPF no formato XXX.XXX.XXX-XX.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(XX) XXXXX-XXXX"
                  {...field}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                  maxLength={15}
                />
              </FormControl>
              <FormDescription>Inclua o DDD. Ex: (11) 98765-4321.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade Desejada</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data Preferida</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0)) || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário Preferido</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="whatsappReminder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Deseja receber um lembrete por WhatsApp 24h antes da consulta?
                </FormLabel>
                <FormDescription>
                  Marcando esta opção, enviaremos uma mensagem para o número de telefone informado.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
          Enviar Pedido de Agendamento
        </Button>
      </form>
    </Form>
  );
}
