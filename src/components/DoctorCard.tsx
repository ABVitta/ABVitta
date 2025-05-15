
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, StethoscopeIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  crm: string;
  photoUrl: string;
  bio?: string;
  availableOnline?: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const consultationFee = "R$ 200,00";
const installments = "em até 3x";

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="group flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
        {doctor.availableOnline && (
          <Badge variant="default" className="absolute top-3 right-3 z-10 bg-green-500 hover:bg-green-600 text-white shadow-md">
            <Zap className="h-3 w-3 mr-1.5 fill-white" />
            Online
          </Badge>
        )}
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={doctor.photoUrl}
              alt={`Foto de ${doctor.name}`}
              layout="fill"
              objectFit="cover"
              className="bg-muted"
              data-ai-hint="doctor portrait professional"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl md:text-2xl text-primary mb-1">{doctor.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
              <StethoscopeIcon className="h-4 w-4 mr-2 text-secondary"/>
              <span>{doctor.specialization}</span>
          </div>
          <Badge variant="outline" className="mb-3 text-xs">CRM: {doctor.crm}</Badge>
          {doctor.bio && <p className="text-sm text-foreground/80 line-clamp-3">{doctor.bio}</p>}
        </CardContent>
        <CardFooter className="p-6 bg-muted/50 border-t">
          <div className="flex items-center text-sm text-foreground">
              <Banknote className="h-5 w-5 mr-2 text-green-600"/>
              <span>Consulta: {consultationFee} <span className="text-xs text-muted-foreground">({installments})</span></span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
