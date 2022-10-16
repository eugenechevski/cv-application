import { useState, createContext } from "react";
import LandingPage from "Components/LandingPage";
import SelectionMenu from "Components/SelectionMenu";
import EditPage from "Components/EditPage";
import "src/styles/App.css";

const TemplateNameContext = createContext(['',  (templateName: string) => {}]);

const App = () => {
  const [templateName, updateTemplateName] = useState('Simple');

  const editPage = <EditPage templateName={templateName}></EditPage>;
  const landingPage = (
    <LandingPage updateScene={() => updateScene(selectionMenu)}></LandingPage>
  );
  const selectionMenu = (
    <SelectionMenu updateScene={() => updateScene(editPage)}></SelectionMenu>
  );
  const [currentScene, updateScene] = useState(landingPage);

  return (
    <TemplateNameContext.Provider value={[templateName, updateTemplateName]}>
      <div className="h-full w-full flex justify-center items-center" data-theme="dark">
        {currentScene}
      </div>
    </TemplateNameContext.Provider>
  );
};

export { App, TemplateNameContext };
