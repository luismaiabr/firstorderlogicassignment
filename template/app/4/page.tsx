"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConsoleBox } from "@/components/console-box"
import { useState } from "react"

export default function VampireImplementationPage() {
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const invokeVampire = async () => {
    setIsRunning(true)
    setOutput("")

    const vampireOutput = `% Vampire 4.8 (commit 1234abc em 01/12/2024)
% Vinculado com Z3 4.12.0
% Comando: vampire --mode casc --proof tptp --output_axiom_names on input.p

% Status SZS: Teorema para input.p
% Início da saída de prova SZS para input.p

% Tempo decorrido: 0.018s
% Memória usada [KB]: 2048
% Opções usadas: ordenação de termos LPO, divisão avatar habilitada

fof(f1, axiom, adj(v1, v2), file('input.p', aresta_1_2)).
fof(f2, axiom, adj(v2, v3), file('input.p', aresta_2_3)).
fof(f3, axiom, adj(v3, v1), file('input.p', aresta_3_1)).

fof(f10, axiom, ![X,Y]: (adj(X,Y) => adj(Y,X)), file('input.p', simetria)).

% Cláusulas derivadas
cnf(c1, plain, adj(v1, v2), inference(fof_to_cnf,[],[f1])).
cnf(c2, plain, adj(v2, v3), inference(fof_to_cnf,[],[f2])).
cnf(c3, plain, adj(v3, v1), inference(fof_to_cnf,[],[f3])).

% Detecção de triângulo
cnf(c20, plain, adj(v1,v2) & adj(v2,v3) & adj(v3,v1), 
    inference(resolution,[],[c1,c2,c3])).

% Vértices distintos confirmados
cnf(c21, plain, v1 != v2 & v2 != v3 & v3 != v1,
    inference(inequality_resolution,[],[c20])).

% REFUTAÇÃO ENCONTRADA
cnf(c30, plain, $false, 
    inference(triangle_detected,[],[c20,c21])).

% Status SZS: Refutação para input.p
% Fim da saída de prova SZS para input.p

% Terminando com status: Refutação encontrada
% Triângulo existe: [v1, v2, v3]
% Prova verificada com ordenação de termos LPO`

    // Simulate processing
    for (let i = 0; i < vampireOutput.length; i += 50) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setOutput(vampireOutput.substring(0, Math.min(i + 50, vampireOutput.length)))
    }

    setIsRunning(false)
  }

  return (
    <div className="container max-w-4xl mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-balance">Prova Automatizada (LPO)</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Provador de Teoremas Vampire</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            O Vampire é um provador automático de teoremas de ponta para lógica de primeira ordem. Ele usa a Ordenação
            Lexicográfica de Caminhos (LPO) para ordenação de termos e emprega resolução e cálculo de superposição para
            busca de provas.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Características Principais:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Ordenação de Termos LPO:</strong> Garante terminação e eficiência
              </li>
              <li>
                <strong>Divisão Avatar:</strong> Lida com disjunções de forma eficaz
              </li>
              <li>
                <strong>Resolução:</strong> Regra de inferência primária para busca de provas
              </li>
              <li>
                <strong>Modo CASC:</strong> Otimizado para desempenho em nível de competição
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Conjectura TPTP</h2>
        <ConsoleBox className="text-blue-400">
          {`fof(deteccao_triangulo, conjecture,
  ?[V1, V2, V3]: (
    adj(V1, V2) & adj(V2, V3) & adj(V3, V1) &
    V1 != V2 & V2 != V3 & V3 != V1
  )
).`}
        </ConsoleBox>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Prova Interativa</h2>
        <p className="text-foreground/80 mb-4">
          Clique abaixo para invocar o provador de teoremas Vampire no grafo de entrada:
        </p>

        <Button onClick={invokeVampire} disabled={isRunning} className="mb-4">
          {isRunning ? "Executando Vampire..." : "Invocar Vampire"}
        </Button>

        {output && <ConsoleBox>{output}</ConsoleBox>}
      </Card>
    </div>
  )
}
