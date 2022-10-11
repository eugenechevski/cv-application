import { useState } from "react";
import LandingPage from "Components/LandingPage";
import { SelectionMenu } from "Components/SelectionMenu";
import "src/styles/App.css";

const App = () => {
  const landingPage = (
    <LandingPage updateScene={() => updateScene(selectionMenu)}></LandingPage>
  );
  const selectionMenu = <SelectionMenu></SelectionMenu>;
  const [currentScene, updateScene] = useState(landingPage);

  return (
    <div className="h-full w-full flex justify-center items-center text-black">
        {currentScene}
    </div>
  );
};

export default App;
