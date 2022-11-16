import uniqid from "uniqid";
import { useState, createContext, useEffect, useContext, useRef } from "react";
import EditField from "Components/edit-page/EditField";
import IndexedLinkedList from "src/indexed-linked-list/IndexedLinkedList";
import Row from "src/row";
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
    IndexedLinkedList(["Skill 1", "Skill 2", "Skill 3"])
  );

  const [experience, updateExperience] = useState(
    IndexedLinkedList([
      Row({
        companyName: "ABC Company",
        jobTitle: "Manager",
        timeFrom: Date.now().toString(),
        timeTo: Date.now().toString(),
        location: "NY City",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
        interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
        lacinia felis eu finibus.`,
      }),
    ])
  );
  const [education, updateEducation] = useState(
    IndexedLinkedList([
      Row({
        schoolName: "Harvard",
        degree: "Bachelor's",
        timeFrom: Date.now().toString(),
        timeTo: Date.now().toString(),
        location: "Boston",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
      interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
      lacinia felis eu finibus.`,
      }),
    ])
  );
  const [awards, updateAwards] = useState(
    IndexedLinkedList(["Award 1", "Award 2", "Award 3"])
  );
  const [projects, updateProjects] = useState(
    IndexedLinkedList(["Project 1", "Project 2", "Project 3"])
  );
  const [languages, updateLanguages] = useState(
    IndexedLinkedList(["Language 1", "Language 2", "Language 3"])
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
          field={<Input state={name} updateState={updateName} title={"Name"}></Input>}
        ></EditField>
      ),
      Title: (
        <EditField
          field={<Input state={title} updateState={updateTitle} title={"Title"}></Input>}
        ></EditField>
      ),
      Skills: (
        <EditField
          field={<List state={skills} updateState={updateSkills} title={"Skills"}></List>}
        ></EditField>
      ),
      Experience: (
        <EditField
          field={
            <Table state={experience} updateState={updateExperience} title={"Experience"}></Table>
          }
        ></EditField>
      ),
      Education: (
        <EditField
          field={
            <Table state={education} updateState={updateEducation} title={"Education"}></Table>
          }
        ></EditField>
      ),
      Awards: (
        <EditField
          field={<List state={awards} updateState={updateAwards} title={"Awards"}></List>}
        ></EditField>
      ),
    };

    if (templateName === "Simple") {
      Object.assign(editFieldComponentsMap.current, {
        Projects: (
          <EditField
            field={<List state={projects} updateState={updateProjects} title={"Projects"}></List>}
          ></EditField>
        ),
        Languages: (
          <EditField
            field={
              <List state={languages} updateState={updateLanguages} title={"Languages"}></List>
            }
          ></EditField>
        ),
      });
    }
  }

  /**
   * An array of the names of the edit-field components.
   */
  const editFieldNames = useRef(Object.keys(editFieldComponentsMap.current));

  /**
   * An array of the field-editing components.
   */
  const editFieldComponentsList = useRef(
    Object.values(editFieldComponentsMap.current)
  );

  /**
   * An object that maps a name of a field-editing component to a the index of that component in the array.
   */
  const editFieldComponentOrderMap = useRef(null);

  if (editFieldComponentOrderMap.current === null) {
    editFieldComponentOrderMap.current = {};
    for (let i = 0; i < editFieldNames.current.length; i += 1) {
      editFieldComponentOrderMap.current[editFieldNames.current[i]] = i;
    }
  }

  /**
   * Tracks the index of a currently displayed component in the array.
   */
  const [currentOrder, updateCurrentOrder] = useState(0);

  /**
   * Tracks the currently displayed field-editing component.
   */
  const [currentEditField, updateEditField] = useState(
    editFieldComponentsMap.current["Name"]
  );

  /**
   * Tracks the id of the active button in the DOM
   */
  const [currentNavButton, updateNavButton] = useState("NameNavBtn");

  /**
   * Main navigation center that synchronizes all the state changes of the navigation variables in one render.
   * There are two sources that dispatch the event that causes the synchronization: an arrow or a button.
   */
  function syncNavigationState(nextEditFieldComponent: JSX.Element): void {
    const editFieldName: string = nextEditFieldComponent.props.field.props.title;

    // Update state
    updateEditField(nextEditFieldComponent);
    updateCurrentOrder(editFieldComponentOrderMap.current[editFieldName]);
  }

  /**
   * Functions for navigating between field-editing components which are called
   * when the an arrow is clicked.
   */

  const selectPrevious = () => {
    var nextOrder = 0;
    if (currentOrder > 0) {
      nextOrder = currentOrder - 1;
    } else {
      nextOrder = editFieldComponentsList.current.length - 1;
    }

    syncNavigationState(
      editFieldComponentsList.current[nextOrder] as JSX.Element
    );
  };

  const selectNext = () => {
    var nextOrder = 0;
    if (currentOrder < editFieldComponentsList.current.length - 1) {
      nextOrder = currentOrder + 1;
    } else {
      nextOrder = 0;
    }

    syncNavigationState(
      editFieldComponentsList.current[nextOrder] as JSX.Element
    );
  };

  /**
   * Container for navigation buttons' elements
   */
  const navigationButtons = useRef(null);

  /**
   * Initializes the navigation buttons
   */
  if (navigationButtons.current === null) {
    navigationButtons.current = [];

    for (let i = 0; i < editFieldNames.current.length; i++) {
      let editFieldName = editFieldNames.current[i] as string;
      navigationButtons.current.push(
        <button
          id={`${editFieldName}NavBtn`}
          key={uniqid()}
          className="btn"
          onClick={syncNavigationState.bind(
            this,
            editFieldComponentsMap.current[editFieldName] as JSX.Element
          )}
        >
          {editFieldName}
        </button>
      );
    }
  }

  /**
   * Marks the 'Name' button as active once the component was mounted only once.
   */
  useEffect(() => {
    document.getElementById("NameNavBtn")?.classList.add("btn-active");
  }, []);

  /**
   * Updates the navigation button when the navigation state changes.
   */
  useEffect(() => {
    const editFieldName: string = currentEditField.props.field.props.title;

    document.getElementById(currentNavButton)?.classList.remove("btn-active");
    document
      .getElementById(editFieldName + "NavBtn")
      ?.classList.add("btn-active");
    updateNavButton(editFieldName + "NavBtn");
  }, [currentEditField]);

  return (
    <div className="flex flex-col justify-center border border-purple-500 h-full w-1/2">
      <div className="basis-2/3 border border-red-600 flex justify-center items-center h-2/3">
        <NavigationContext.Provider value={[selectPrevious, selectNext]}>
          {currentEditField}
        </NavigationContext.Provider>
      </div>
      <div className="basis-1/6 border border-blue-500 flex flex-col justify-center items-center gap-3 h-1/6"> 
        <button className="btn btn-primary w-1/3">Preview</button>
        <button className="btn btn-primary w-1/3">Export</button>
      </div>
      <div className="basis-1/6 border border-green-500 flex justify-center items-center h-1/6">
        <div className="pagination items-end">
          <div className="btn-group">{navigationButtons.current}</div>
        </div>
      </div>
    </div>
  );
};

export { EditPage, NavigationContext };
