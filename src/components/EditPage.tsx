import { useState, createContext, useEffect, useContext, useRef } from "react";
import EditEntry from "Components/edit-page/EditEntry";
import Input from "./edit-page/Input";
import List from "./edit-page/List";
import Table from "./edit-page/Table";
import { TemplateNameContext } from "src/App";

const NavigationContext = createContext([() => {}, () => {}]);

const EditPage = () => {
  /**
   * Name of a resume's template
   */
  const [templateName, setTemplateName] = useContext(TemplateNameContext);

  /**
   * Defines state of associated fields that can be edited.
   */
  const [name, updateName] = useState("John Doe");
  const [title, updateTitle] = useState("Lorem ipsum dolor sit amet");
  const [skills, updateSkills] = useState(
    new Set(["Skill 1", "Skill 2", "Skill 3"])
  );
  const [experience, updateExperience] = useState({
    0: {
      companyName: "ABC Company",
      jobTitle: "Manager",
      timeFrom: Date.now(),
      timeTo: Date.now(),
      location: "NY City",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
      interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
      lacinia felis eu finibus.`,
    },
  });
  const [education, updateEducation] = useState({
    0: {
      schoolName: "Harvard",
      degree: "Bachelor's",
      timeFrom: Date.now(),
      timeTo: Date.now(),
      location: "Boston",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
      interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
      lacinia felis eu finibus.`,
    },
  });
  const [awards, updateAwards] = useState(
    new Set(["Award 1", "Award 2", "Award 3"])
  );
  const [projects, updateProjects] = useState(
    new Set(["Project 1", "Project 2", "Project 3"])
  );
  const [languages, updateLanguages] = useState(
    new Set(["Language 1", "Language 2", "Language 3"])
  );

  // TODO
  /**
   * Defines sub-components for editing associated fields.
   */
  const entryComponentsMap = useRef(null);
  
  if (entryComponentsMap.current === null) {
    entryComponentsMap.current = {
      Name: (
        <EditEntry
          title={"Name"}
          field={<Input state={name} updateState={updateName}></Input>}
        ></EditEntry>
      ),
      Title: (
        <EditEntry
          title={"Title"}
          field={<Input state={title} updateState={updateTitle}></Input>}
        ></EditEntry>
      ),
      Skills: (
        <EditEntry
          title={"Skills"}
          field={<List state={skills} updateState={updateSkills}></List>}
        ></EditEntry>
      ),
      Experience: (
        <EditEntry
          title={"Experience"}
          field={
            <Table state={experience} updateState={updateExperience}></Table>
          }
        ></EditEntry>
      ),
      Education: (
        <EditEntry
          title={"Education"}
          field={
            <Table state={education} updateState={updateEducation}></Table>
          }
        ></EditEntry>
      ),
      Awards: (
        <EditEntry
          title={"Awards"}
          field={<List state={awards} updateState={updateAwards}></List>}
        ></EditEntry>
      ),
    };

    if (templateName === "Simple") {
      Object.assign(entryComponentsMap.current, {
        Projects: (
          <EditEntry
            title={"Projects"}
            field={<List state={projects} updateState={updateProjects}></List>}
          ></EditEntry>
        ),
        Languages: (
          <EditEntry
            title={"Languages"}
            field={
              <List state={languages} updateState={updateLanguages}></List>
            }
          ></EditEntry>
        ),
      });
    }
  }

  const entryComponentsList = useRef(Object.values(entryComponentsMap.current));
  const entryComponentOrderMap = useRef(null);
  
  if (entryComponentOrderMap.current === null) {
    entryComponentOrderMap.current = {};
    const entryNames = Object.keys(entryComponentsMap.current);
    for (let i = 0; i < entryNames.length; i += 1) {
      entryComponentOrderMap.current[entryNames[i]] = i;
    }
  }

  /**
   * Defines navigation logic between field-editing components.
   */
  const [currentOrder, updateCurrentOrder] = useState(0);
  const [currentEntry, selectEntry] = useState(entryComponentsMap.current["Name"]);

  const selectPrevious = () => {
    if (currentOrder > 0) {
      updateCurrentOrder(currentOrder - 1);
    } else {
      updateCurrentOrder(entryComponentsList.current.length - 1);
    }
  };

  const selectNext = () => {
    if (currentOrder < entryComponentsList.current.length - 1) {
      updateCurrentOrder(currentOrder + 1);
    } else {
      updateCurrentOrder(0);
    }
  };

  useEffect(() => {
    if (currentEntry !== entryComponentsList.current[currentOrder]) {
      selectEntry(entryComponentsList.current[currentOrder]);
    }
  }, [currentOrder]);

  useEffect(() => {
    if (currentEntry !== entryComponentsList.current[currentOrder]) {
      updateCurrentOrder(entryComponentOrderMap.current[currentEntry.props.title]);
    }
  }, [currentEntry]);

  return (
    <div className="flex flex-col">
      <NavigationContext.Provider value={[selectPrevious, selectNext]}>
        {currentEntry}
      </NavigationContext.Provider>
      <button className="btn btn-primary">Preview</button>
      <button className="btn btn-primary">Export</button>
      <div className="pagination">
        <div className="btn-group">
          <button className="btn btn-active">Name</button>
          <button className="btn">Title</button>
          <button className="btn">Skills</button>
          <button className="btn">Experience</button>
          <button className="btn">Education</button>
          <button className="btn">Awards</button>
          {templateName === "Simple" ? (
            <>
              <button className="btn">Projects</button>
              <button className="btn">Languages</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export { EditPage, NavigationContext };
