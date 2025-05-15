
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateGoogleCalendarLink(
  title: string,
  startTime: Date,
  endTime: Date,
  description?: string,
  location?: string
): string {
  const formatDate = (date: Date): string => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };

  const T = {
    BASE: "https://www.google.com/calendar/render?action=TEMPLATE",
    NAME: `&text=${encodeURIComponent(title)}`,
    START_TIME: `&dates=${formatDate(startTime)}`,
    END_TIME: `/${formatDate(endTime)}`,
    DESCRIPTION: description ? `&details=${encodeURIComponent(description)}` : "",
    LOCATION: location ? `&location=${encodeURIComponent(location)}` : "",
  };

  return `${T.BASE}${T.NAME}${T.START_TIME}${T.END_TIME}${T.DESCRIPTION}${T.LOCATION}`;
}
