import TripList from "./components/TripList/TripList";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-indigo-950 text-white py-4 shadow-md">
        <h1 className="text-2xl font-bold max-w-7xl mx-auto px-4">Explore Trips</h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <TripList />
      </main>
    </div>
  );
}

export default App;
