import { useState, createContext, useRef } from "react";
import LandingPage from "Components/LandingPage";
import SelectionMenu from "Components/SelectionMenu";
import EditPage from "Components/EditPage";
import "src/styles/App.css";

const TemplateNameContext = createContext(['',  (any) => {}]);

const App = () => {
  const [templateName, updateTemplateName] = useState('Simple');

  const editPage = useRef(<EditPage></EditPage>);
  const landingPage = useRef((
    <LandingPage updateScene={() => updateScene(selectionMenu.current)}></LandingPage>
  ));
  const selectionMenu = useRef((
    <SelectionMenu updateScene={() => updateScene(editPage.current)}></SelectionMenu>
  ));
  const [currentScene, updateScene] = useState(landingPage.current);

  return (
    <TemplateNameContext.Provider value={[templateName, updateTemplateName]}>
      <div className="h-full w-full flex justify-center items-center" data-theme="dark">
        {currentScene}
      </div>
    </TemplateNameContext.Provider>
  );
};

export { App, TemplateNameContext };
