import { Card } from "@/components/ui/card"

export default function TheoreticalBasisPage() {
  return (
    <div className="container max-w-4xl mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-balance">O Problema de Grafos Livres de C3</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Definição Matemática</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Um <strong>triângulo</strong> (ou C₃) é um ciclo de comprimento 3 em um grafo não direcionado. Formalmente,
            para um grafo G = (V, E):
          </p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm my-4">
            <p>∃ v₁, v₂, v₃ ∈ V : (v₁, v₂) ∈ E ∧ (v₂, v₃) ∈ E ∧ (v₃, v₁) ∈ E</p>
            <p className="mt-2">onde v₁ ≠ v₂ ≠ v₃</p>
          </div>

          <p>
            Um grafo é <strong>livre de C₃</strong> (livre de triângulos) se e somente se tal tripla não existe.
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Problema de Decisão em Lógica de Primeira Ordem</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Podemos formular o problema de detecção de triângulos como um problema de satisfatibilidade em LPO:</p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm my-4">
            <p>∀ G = (V, E) : livre_triangulos(G) ↔</p>
            <p className="ml-4">¬∃ v₁, v₂, v₃ ∈ V :</p>
            <p className="ml-8">adj(v₁, v₂) ∧ adj(v₂, v₃) ∧ adj(v₃, v₁) ∧</p>
            <p className="ml-8">v₁ ≠ v₂ ∧ v₂ ≠ v₃ ∧ v₃ ≠ v₁</p>
          </div>

          <p>
            Esta formulação nos permite usar provadores automáticos de teoremas como o Vampire para verificar se um dado
            grafo é livre de C₃.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Representação Visual</h2>
        <div className="flex justify-center items-center p-8 bg-muted rounded-lg">
          <img
            src="/graph-theory-triangle-c3-diagram.jpg"
            alt="Representação Teórica de Grafo"
            className="max-w-full h-auto"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Exemplo: Um grafo com ciclos triangulares destacados
        </p>
      </Card>
    </div>
  )
}
