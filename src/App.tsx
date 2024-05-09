import GameLobby from "./components/GameLobby";
import GameScreen from "./components/GameScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/play" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
