import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { SleepRecord } from '@/types/sleep';
import { format } from 'date-fns';

interface SleepFormProps {
  record?: SleepRecord | null;
  onSave: () => void;
  onCancel: () => void;
}

export function SleepForm({ record, onSave, onCancel }: SleepFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [sleptAt, setSleptAt] = useState('');
  const [wokeAt, setWokeAt] = useState('');
  const [quality, setQuality] = useState([3]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (record) {
      setSleptAt(format(new Date(record.slept_at), "yyyy-MM-dd'T'HH:mm"));
      setWokeAt(format(new Date(record.woke_at), "yyyy-MM-dd'T'HH:mm"));
      setQuality([record.quality]);
      setNotes(record.notes || '');
    }
  }, [record]);

  const calculateDuration = (slept: string, woke: string) => {
    const sleptDate = new Date(slept);
    const wokeDate = new Date(woke);
    const diffMs = wokeDate.getTime() - sleptDate.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60)); // Convert to hours
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!sleptAt || !wokeAt) {
      toast({
        title: "Erro",
        description: "Preencha os horários de dormir e acordar",
        variant: "destructive",
      });
      return;
    }

    const duration = calculateDuration(sleptAt, wokeAt);
    
    if (duration <= 0) {
      toast({
        title: "Erro",
        description: "O horário de acordar deve ser depois do horário de dormir",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const sleepData = {
      user_id: user.id,
      slept_at: new Date(sleptAt).toISOString(),
      woke_at: new Date(wokeAt).toISOString(),
      duration_hours: duration,
      quality: quality[0],
      notes: notes || null,
    };

    let error;

    if (record) {
      const result = await supabase
        .from('sleep_records')
        .update(sleepData)
        .eq('id', record.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('sleep_records')
        .insert([sleepData]);
      error = result.error;
    }

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: record ? "Registro atualizado" : "Registro criado",
        description: `Duração: ${duration.toFixed(1)} horas`,
      });
      onSave();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sleptAt">Hora que dormiu</Label>
          <Input
            id="sleptAt"
            type="datetime-local"
            value={sleptAt}
            onChange={(e) => setSleptAt(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wokeAt">Hora que acordou</Label>
          <Input
            id="wokeAt"
            type="datetime-local"
            value={wokeAt}
            onChange={(e) => setWokeAt(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Qualidade do sono: {quality[0]}/5</Label>
        <Slider
          value={quality}
          onValueChange={setQuality}
          min={1}
          max={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Péssimo</span>
          <span>Ruim</span>
          <span>Regular</span>
          <span>Bom</span>
          <span>Excelente</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações (opcional)</Label>
        <Textarea
          id="notes"
          placeholder="Como foi seu sono? Teve algum sonho? Acordou durante a noite?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
