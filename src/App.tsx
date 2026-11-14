import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-900">
      <h1 className="text-6xl font-semibold tracking-tight text-white">
        Aurel
      </h1>
      <Button variant="secondary" size="lg">
        Shop now
      </Button>
    </main>
  );
}

export default App;
