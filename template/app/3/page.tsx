"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConsoleBox } from "@/components/console-box"
import { useState } from "react"

export default function EngineeringValidationPage() {
  const [output, setOutput] = useState("")
  const [graphImage, setGraphImage] = useState("/graph-with-nodes-and-edges.jpg")
  const [isRunning, setIsRunning] = useState(false)

  const runValidation = async () => {
    setIsRunning(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const jsonLog = `{
  "status": "completo",
  "tem_ciclo": true,
  "algoritmo": "DFS",
  "grafo": {
    "nos": 5,
    "arestas": 7
  },
  "triangulos_detectados": [
    ["v1", "v2", "v3"],
    ["v2", "v4", "v5"]
  ],
  "tempo_execucao": "0.003s",
  "memoria_usada": "2.1 MB"
}`

    setOutput(jsonLog)
    setGraphImage("/graph-with-red-highlighted-triangle-cycle.jpg")
    setIsRunning(false)
  }

  return (
    <div className="container max-w-4xl mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-balance">Oráculo Python (Validação DFS)</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Algoritmo de Busca em Profundidade</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            O oráculo Python implementa um algoritmo de Busca em Profundidade (DFS) para detectar ciclos de comprimento
            3 (triângulos) no grafo de entrada. Isso serve como validação da verdade fundamental para os resultados do
            provador de teoremas.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Etapas do Algoritmo:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Iniciar DFS a partir de cada vértice no grafo</li>
              <li>Rastrear nós visitados e o caminho atual</li>
              <li>Para cada vizinho, verificar se cria um ciclo de comprimento 3</li>
              <li>Registrar todos os triângulos detectados</li>
              <li>Retornar resultados de validação com ciclos destacados</li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground">
            Complexidade de Tempo: O(V + E) onde V são vértices e E são arestas
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Demonstração Visual</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Grafo de Entrada:</h3>
          <div className="flex justify-center items-center p-8 bg-muted rounded-lg">
            <img src={graphImage || "/placeholder.svg"} alt="Visualização do grafo" className="max-w-full h-auto" />
          </div>
        </div>

        <Button onClick={runValidation} disabled={isRunning} className="mb-4">
          {isRunning ? "Executando Validação..." : "Executar Validação Python"}
        </Button>

        {output && (
          <div>
            <h3 className="font-semibold mb-2">Saída da Validação:</h3>
            <ConsoleBox>{output}</ConsoleBox>
          </div>
        )}
      </Card>
    </div>
  )
}
