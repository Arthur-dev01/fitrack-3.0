import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileText, Calendar, TrendingUp, Apple, Moon, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reportTypes = [
  {
    id: "complete",
    name: "Relatório Completo",
    description: "Todos os dados de treinos, nutrição e sono",
    icon: FileText,
  },
  {
    id: "workouts",
    name: "Relatório de Treinos",
    description: "Histórico e performance dos treinos",
    icon: Dumbbell,
  },
  {
    id: "nutrition",
    name: "Relatório de Nutrição",
    description: "Análise de refeições e macronutrientes",
    icon: Apple,
  },
  {
    id: "sleep",
    name: "Relatório de Sono",
    description: "Qualidade e padrões de sono",
    icon: Moon,
  },
  {
    id: "progress",
    name: "Relatório de Progresso",
    description: "Evolução geral com gráficos e estatísticas",
    icon: TrendingUp,
  },
];

const Relatorios = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("complete");
  const [period, setPeriod] = useState("month");
  const [format, setFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeStats, setIncludeStats] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);

  const handleExport = () => {
    const reportName = reportTypes.find((r) => r.id === selectedReport)?.name;
    const periodLabel = {
      week: "Última Semana",
      month: "Último Mês",
      quarter: "Últimos 3 Meses",
      year: "Último Ano",
    }[period];

    toast({
      title: "✅ Relatório Gerado!",
      description: `${reportName} (${periodLabel}) foi exportado em ${format.toUpperCase()}.`,
    });

    // Simula download do arquivo
    console.log({
      report: selectedReport,
      period,
      format,
      options: { includeCharts, includeStats, includeDetails },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Relatórios
        </h1>
        <p className="text-muted-foreground mt-1">
          Exporte e analise seus dados de forma completa
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Seleção de Relatório */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Relatório</CardTitle>
              <CardDescription>
                Escolha o tipo de dados que deseja exportar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedReport === report.id
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        selectedReport === report.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{report.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Configurações de Exportação */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Período
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Últimos 3 Meses</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Formato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opções</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                />
                <Label
                  htmlFor="charts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Incluir gráficos
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stats"
                  checked={includeStats}
                  onCheckedChange={(checked) => setIncludeStats(checked as boolean)}
                />
                <Label
                  htmlFor="stats"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Incluir estatísticas
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="details"
                  checked={includeDetails}
                  onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
                />
                <Label
                  htmlFor="details"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Incluir detalhes
                </Label>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleExport}
            className="w-full shadow-card hover:shadow-card-hover"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Preview/Resumo */}
      <Card>
        <CardHeader>
          <CardTitle>Preview do Relatório</CardTitle>
          <CardDescription>
            Visualização prévia do que será exportado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Tipo:</span>
              <span className="font-medium">
                {reportTypes.find((r) => r.id === selectedReport)?.name}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Período:</span>
              <span className="font-medium">
                {{
                  week: "Última Semana",
                  month: "Último Mês",
                  quarter: "Últimos 3 Meses",
                  year: "Último Ano",
                }[period]}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Formato:</span>
              <span className="font-medium uppercase">{format}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Inclusos:</span>
              <span className="font-medium">
                {[
                  includeCharts && "Gráficos",
                  includeStats && "Estatísticas",
                  includeDetails && "Detalhes",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
