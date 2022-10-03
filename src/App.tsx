import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import SelectionMenu from "./components/SelectionMenu";
import "./styles/App.css";

const App = () => {
  const landingPage = (<LandingPage updateScene={() => updateScene(selectionMenu)}></LandingPage>)
  const selectionMenu = (<SelectionMenu></SelectionMenu>);
  const [currentScene, updateScene] = useState(landingPage);

  return (
    <div className="h-full w-full flex justify-center items-center">
      {currentScene}
    </div>
  );
};

export default App;
