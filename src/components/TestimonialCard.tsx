
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  stars: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg text-left">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-primary">{testimonial.name}</CardTitle>
          <div className="flex">
            {Array(testimonial.stars)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            {Array(5 - testimonial.stars)
              .fill(0)
              .map((_, i) => (
                <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" /> // For empty stars if needed
              ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
      </CardContent>
    </Card>
  );
}
