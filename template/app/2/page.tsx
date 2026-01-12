"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConsoleBox } from "@/components/console-box"
import { useState } from "react"

export default function AxiomGeneratorPage() {
  const [output, setOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAxioms = async () => {
    setIsGenerating(true)
    setOutput("")

    const tptpCode = `% Formato TPTP - Axiomas de Grafos Livres de C3
% Gerado a partir de representação de grafo em JSON

fof(aresta_1_2, axiom, adj(v1, v2)).
fof(aresta_2_3, axiom, adj(v2, v3)).
fof(aresta_3_4, axiom, adj(v3, v4)).
fof(aresta_1_4, axiom, adj(v1, v4)).

% Axioma de simetria para arestas não direcionadas
fof(simetria, axiom, ![X, Y]: (adj(X, Y) => adj(Y, X))).

% Anti-reflexividade
fof(sem_auto_loops, axiom, ![X]: ~adj(X, X)).

% Conjectura de detecção de triângulo
fof(triangulo_existe, conjecture, 
  ?[V1, V2, V3]: (
    adj(V1, V2) & adj(V2, V3) & adj(V3, V1) &
    V1 != V2 & V2 != V3 & V3 != V1
  )
).

% Fim da geração de axiomas`

    // Simulate typing effect
    for (let i = 0; i < tptpCode.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      setOutput(tptpCode.substring(0, i + 1))
    }

    setIsGenerating(false)
  }

  return (
    <div className="container max-w-4xl mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-balance">Tradução de JSON para TPTP</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Gerador de Axiomas em Python</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Nosso script Python converte dados de grafos do formato JSON para o formato TPTP (Thousands of Problems for
            Theorem Provers), que pode ser consumido por provadores automáticos de teoremas como o Vampire.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Processo de Tradução:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Analisar representação de grafo em JSON (nós e arestas)</li>
              <li>
                Gerar axiomas de arestas como predicados{" "}
                <code className="bg-background px-2 py-1 rounded">adj(v1, v2)</code>
              </li>
              <li>Adicionar axiomas estruturais (simetria, anti-reflexividade)</li>
              <li>Formular a conjectura de detecção de triângulos</li>
              <li>Gerar sintaxe TPTP válida</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Demonstração Interativa</h2>
        <p className="text-foreground/80 mb-4">
          Clique no botão abaixo para gerar axiomas TPTP a partir de um grafo de exemplo:
        </p>

        <Button onClick={generateAxioms} disabled={isGenerating} className="mb-4">
          {isGenerating ? "Gerando..." : "Gerar Axiomas"}
        </Button>

        {output && <ConsoleBox>{output}</ConsoleBox>}
      </Card>
    </div>
  )
}
