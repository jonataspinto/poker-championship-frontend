
import { format, formatISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (date: Date, pattern = "dd MMMM HH:mm:ss") => format(date, pattern, { locale: ptBR });

export const formatDateToIso = (date: Date) => formatISO(date)
