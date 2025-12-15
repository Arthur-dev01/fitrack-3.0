import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SleepRecord } from '@/types/sleep';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit, Trash2, Moon, Sun } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SleepHistoryProps {
  records: SleepRecord[];
  isLoading: boolean;
  onEdit: (record: SleepRecord) => void;
  onDelete: (id: string) => void;
}

export function SleepHistory({ records, isLoading, onEdit, onDelete }: SleepHistoryProps) {
  const getQualityColor = (quality: number) => {
    if (quality >= 4) return 'bg-green-500';
    if (quality >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getQualityLabel = (quality: number) => {
    const labels = ['', 'Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];
    return labels[quality];
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Nenhum registro de sono encontrado. Comece adicionando um novo registro!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {format(new Date(record.slept_at), "EEEE, d 'de' MMMM", { locale: ptBR })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(record.id)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Dormiu</p>
                  <p className="font-semibold">
                    {format(new Date(record.slept_at), 'HH:mm')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Acordou</p>
                  <p className="font-semibold">
                    {format(new Date(record.woke_at), 'HH:mm')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Duração</p>
                <p className="font-semibold">{record.duration_hours.toFixed(1)}h</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Qualidade:</span>
              <Badge className={getQualityColor(record.quality)}>
                {getQualityLabel(record.quality)}
              </Badge>
            </div>

            {record.notes && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Observações:</p>
                <p className="text-sm">{record.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
