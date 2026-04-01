import { globalStyles } from "./styles";
import { AppProvider, useAppState } from "./store/AppContext";
import Header      from "./components/Header";
import StepMarca   from "./components/StepMarca";
import StepVehicul from "./components/StepVehicul";
import StepPiese   from "./components/StepPiese";
import StepSumar   from "./components/StepSumar";


function AppRouter() {
  const { pas } = useAppState();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0e0f",
      color: "#e8e6e1",
      fontFamily: "'Inter',system-ui,sans-serif",
      fontSize: 14,
    }}>
      <style>{globalStyles}</style>
      <Header />
      {pas === 1 && <StepMarca />}
      {pas === 2 && <StepVehicul />}
      {pas === 3 && <StepPiese />}
      {pas === 4 && <StepSumar />}
    </div>
  );
}

// ─── App principal cu Provider ────────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
