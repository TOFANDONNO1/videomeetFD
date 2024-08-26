import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SocketProvider } from "./providers/Socket";
import { Room } from "./pages/Room";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <div className="App">
      <h1>Video Calling App</h1>
      <SocketProvider>
        <PeerProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room/>}/>
        </Routes>
        </PeerProvider>

      </SocketProvider>
    </div>
  );
}

export default App;
