import { useState, createContext, useEffect, useContext, useRef } from "react";
import EditField from "Components/edit-page/EditField";
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
   * States of associated fields that can be edited.
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

  /**
   * Contains an object with the name of an editing field as a key and 
   * an associated component as a value.
   */
  const editFieldComponentsMap = useRef(null);
  
  if (editFieldComponentsMap.current === null) {
    editFieldComponentsMap.current = {
      Name: (
        <EditField
          title={"Name"}
          field={<Input state={name} updateState={updateName}></Input>}
        ></EditField>
      ),
      Title: (
        <EditField
          title={"Title"}
          field={<Input state={title} updateState={updateTitle}></Input>}
        ></EditField>
      ),
      Skills: (
        <EditField
          title={"Skills"}
          field={<List state={skills} updateState={updateSkills}></List>}
        ></EditField>
      ),
      Experience: (
        <EditField
          title={"Experience"}
          field={
            <Table state={experience} updateState={updateExperience}></Table>
          }
        ></EditField>
      ),
      Education: (
        <EditField
          title={"Education"}
          field={
            <Table state={education} updateState={updateEducation}></Table>
          }
        ></EditField>
      ),
      Awards: (
        <EditField
          title={"Awards"}
          field={<List state={awards} updateState={updateAwards}></List>}
        ></EditField>
      ),
    };

    if (templateName === "Simple") {
      Object.assign(editFieldComponentsMap.current, {
        Projects: (
          <EditField
            title={"Projects"}
            field={<List state={projects} updateState={updateProjects}></List>}
          ></EditField>
        ),
        Languages: (
          <EditField
            title={"Languages"}
            field={
              <List state={languages} updateState={updateLanguages}></List>
            }
          ></EditField>
        ),
      });
    }
  }

  /**
   * An array of all field-editing components.
   */
  const editFieldComponentsList = useRef(Object.values(editFieldComponentsMap.current));
  /**
   * An object that maps a name of a field-editing component to a the index of that component in the array.
   */
  const editFieldComponentOrderMap = useRef(null);
  
  if (editFieldComponentOrderMap.current === null) {
    editFieldComponentOrderMap.current = {};
    const editFieldNames = Object.keys(editFieldComponentsMap.current);
    for (let i = 0; i < editFieldNames.length; i += 1) {
      editFieldComponentOrderMap.current[editFieldNames[i]] = i;
    }
  }

  /**
   * Tracks the index of a currently displayed component in the array.
   */
  const [currentOrder, updateCurrentOrder] = useState(0);
  /**
   * Tracks the currently displayed field-editing component.
   */
  const [currentEditField, selectEditField] = useState(editFieldComponentsMap.current["Name"]);

  /**
   * Functions for navigating between field-editing components.
   */

  const selectPrevious = () => {
    if (currentOrder > 0) {
      updateCurrentOrder(currentOrder - 1);
    } else {
      updateCurrentOrder(editFieldComponentsList.current.length - 1);
    }
  };

  const selectNext = () => {
    if (currentOrder < editFieldComponentsList.current.length - 1) {
      updateCurrentOrder(currentOrder + 1);
    } else {
      updateCurrentOrder(0);
    }
  };

  /**
   * Updates the current field-editing component if an index has been changed.
   */
  useEffect(() => {
    if (currentEditField !== editFieldComponentsList.current[currentOrder]) {
      selectEditField(editFieldComponentsList.current[currentOrder]);
    }
  }, [currentOrder]);

  /**
   * Updates the current index if a field-editing component has been changed.
   */
  useEffect(() => {
    if (currentEditField !== editFieldComponentsList.current[currentOrder]) {
      updateCurrentOrder(editFieldComponentOrderMap.current[currentEditField.props.title]);
    }
  }, [currentEditField]);

  return (
    <div className="flex flex-col">
      <NavigationContext.Provider value={[selectPrevious, selectNext]}>
        {currentEditField}
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
