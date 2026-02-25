import TripList from "./components/TripList/TripList";

function App() {
  return (
    <>
      <header>
        <h1>Reisesuche</h1>
      </header>

      <main>
        <div>
          <div>
            <TripList />
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
