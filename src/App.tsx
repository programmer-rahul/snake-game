import GameLobby from "./components/GameLobby";
import GamePlayScreen from "./components/GamePlayScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/play" element={<GamePlayScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
