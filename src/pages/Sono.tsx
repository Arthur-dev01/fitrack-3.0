import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SleepForm } from '@/components/sleep/SleepForm';
import { SleepHistory } from '@/components/sleep/SleepHistory';
import { SleepDashboard } from '@/components/sleep/SleepDashboard';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { SleepRecord } from '@/types/sleep';

export default function Sono() {
  const { user } = useAuth();
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<SleepRecord | null>(null);

  const fetchSleepRecords = async () => {
    if (!user) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('sleep_records')
      .select('*')
      .eq('user_id', user.id)
      .order('slept_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar registros",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSleepRecords(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSleepRecords();
  }, [user]);

  const handleSave = async () => {
    await fetchSleepRecords();
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleEdit = (record: SleepRecord) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('sleep_records')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro ao excluir registro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registro excluído",
        description: "O registro de sono foi removido com sucesso",
      });
      fetchSleepRecords();
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sono</h1>
          <p className="text-muted-foreground">Monitore e melhore a qualidade do seu sono</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingRecord ? 'Editar' : 'Novo'} Registro de Sono</CardTitle>
            <CardDescription>
              {editingRecord ? 'Atualize' : 'Adicione'} as informações sobre seu sono
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SleepForm
              record={editingRecord}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingRecord(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SleepDashboard records={sleepRecords} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="history">
          <SleepHistory
            records={sleepRecords}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
