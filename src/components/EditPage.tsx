import uniqid from "uniqid";
import { useState, createContext, useEffect, useContext, useRef } from "react";
import EditField from "Components/edit-page/EditField";
import IndexedLinkedList from "DataAPI/IndexedLinkedList";
import Row from "DataAPI/Row";
import Input from "Components/edit-page/Input";
import List from "Components/edit-page/List";
import Table from "Components/edit-page/Table";
import { TemplateNameContext } from "src/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import exportResume from "Helpers/exportResume";
import convertData from "Helpers/convertData";

const NavigationContext = createContext([() => {}, () => {}]);

const EditPage = () => {
  /**
   * Name of a resume's template
   */
  const [templateName] = useContext(TemplateNameContext);

  /**
   * States of associated fields that can be edited.
   */

  const [name, updateName] = useState({ current: "John Doe" });
  const [title, updateTitle] = useState({
    current: "Lorem ipsum dolor sit amet",
  });
  const [skills, updateSkills] = useState(
    IndexedLinkedList(["Skill 1", "Skill 2", "Skill 3"])
  );
  const [street, updateStreet] = useState({ current: "123 Your Street" });
  const [city, updateCity] = useState({ current: "Your City" });
  const [zip, updateZip] = useState({ current: "MA 12345" });
  const [phone, updatePhone] = useState({ current: "(123) 456-7890" });
  const [email, updateEmail] = useState({ current: "no_reply@example.com" });

  const [experience, updateExperience] = useState(
    IndexedLinkedList([
      Row({
        companyName: "ABC Company",
        jobTitle: "Manager",
        dateFrom: "2014-12-22",
        dateTo: "2015-11-23",
        location: "NY City",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi. Sed inconsequatmi.`,
      }),
    ])
  );
  const [education, updateEducation] = useState(
    IndexedLinkedList([
      Row({
        schoolName: "Harvard",
        degree: "Bachelor's",
        dateFrom: "2006-06-11",
        dateTo: "2010-06-12",
        location: "Boston",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi. Sed inconsequatmi.`,
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

  const getAllData: () => RawData = () => {
    return {
      name,
      title,
      skills,
      awards,
      street,
      city,
      zip,
      phone,
      email,
      experience,
      education,
      projects,
      languages,
    };
  };

  /**
   * Contains an object with the name of an editing field as a key and
   * an associated component as a value.
   */
  const componentsMap = useRef(null);

  if (componentsMap.current === null) {
    componentsMap.current = {
      Name: (
        <EditField
          field={
            <Input data={name} updateData={updateName} title={"Name"}></Input>
          }
        ></EditField>
      ),
      Title: (
        <EditField
          field={
            <Input
              data={title}
              updateData={updateTitle}
              title={"Title"}
            ></Input>
          }
        ></EditField>
      ),
      Street: (
        <EditField
          field={
            <Input
              data={street}
              updateData={updateStreet}
              title={"Street"}
            ></Input>
          }
        ></EditField>
      ),
      City: (
        <EditField
          field={
            <Input data={city} updateData={updateCity} title={"City"}></Input>
          }
        ></EditField>
      ),
      Zip: (
        <EditField
          field={
            <Input data={zip} updateData={updateZip} title={"Zip"}></Input>
          }
        ></EditField>
      ),
      Phone: (
        <EditField
          field={
            <Input
              data={phone}
              updateData={updatePhone}
              title={"Phone"}
            ></Input>
          }
        ></EditField>
      ),
      Email: (
        <EditField
          field={
            <Input
              data={email}
              updateData={updateEmail}
              title={"Email"}
            ></Input>
          }
        ></EditField>
      ),
      Skills: (
        <EditField
          field={
            <List
              data={skills}
              updateData={updateSkills}
              title={"Skills"}
            ></List>
          }
        ></EditField>
      ),
      Experience: (
        <EditField
          field={
            <Table
              data={experience}
              updateData={updateExperience}
              title={"Experience"}
            ></Table>
          }
        ></EditField>
      ),
      Education: (
        <EditField
          field={
            <Table
              data={education}
              updateData={updateEducation}
              title={"Education"}
            ></Table>
          }
        ></EditField>
      ),
      Awards: (
        <EditField
          field={
            <List
              data={awards}
              updateData={updateAwards}
              title={"Awards"}
            ></List>
          }
        ></EditField>
      ),
    };

    if (templateName === "Simple") {
      componentsMap.current = Object.assign(componentsMap.current, {
        Projects: (
          <EditField
            field={
              <List
                data={projects}
                updateData={updateProjects}
                title={"Projects"}
              ></List>
            }
          ></EditField>
        ),
        Languages: (
          <EditField
            field={
              <List
                data={languages}
                updateData={updateLanguages}
                title={"Languages"}
              ></List>
            }
          ></EditField>
        ),
      });
    }
  }

  /**
   * An array of the names of the edit-field components.
   */
  const componentsNames = useRef(Object.keys(componentsMap.current));

  /**
   * An array of the field-editing components.
   */
  const componentsList = useRef(Object.values(componentsMap.current));

  /**
   * An object that maps a name of a field-editing component to a the index of that component in the array.
   */
  const nameToIndexMap = useRef(null);

  if (nameToIndexMap.current === null) {
    nameToIndexMap.current = {};
    for (let i = 0; i < componentsNames.current.length; i += 1) {
      nameToIndexMap.current[componentsNames.current[i]] = i;
    }
  }

  /**
   * Tracks the index of a currently displayed component in the array.
   */
  const [currentOrder, updateCurrentOrder] = useState(0);

  /**
   * Tracks the currently displayed field-editing component.
   */
  const [currentComponent, setCurrentComponent] = useState(
    componentsMap.current["Name"]
  );

  /**
   * Tracks the id of the active button in the DOM
   */
  const [currentNavButton, updateNavButton] = useState("NameNavBtn");

  /**
   * Main navigation center that synchronizes all the state changes of the navigation variables in one render.
   * There are two sources that dispatch the event that causes the synchronization: an arrow or a button.
   */
  function syncNavigationState(nextComponent: JSX.Element): void {
    const componentName: string = nextComponent.props.field.props.title;

    // Update state
    setCurrentComponent(nextComponent);
    updateCurrentOrder(nameToIndexMap.current[componentName]);
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
      nextOrder = componentsList.current.length - 1;
    }

    syncNavigationState(componentsList.current[nextOrder] as JSX.Element);
  };

  const selectNext = () => {
    var nextOrder = 0;
    if (currentOrder < componentsList.current.length - 1) {
      nextOrder = currentOrder + 1;
    } else {
      nextOrder = 0;
    }

    syncNavigationState(componentsList.current[nextOrder] as JSX.Element);
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

    for (let i = 0; i < componentsNames.current.length; i++) {
      let componentName = componentsNames.current[i] as string;
      navigationButtons.current.push(
        <button
          id={`${componentName}NavBtn`}
          key={uniqid()}
          className="btn text-sm"
          onClick={() =>
            syncNavigationState(
              componentsMap.current[componentName] as JSX.Element
            )
          }
        >
          {componentName}
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
    const componentName: string = currentComponent.props.field.props.title;

    document.getElementById(currentNavButton)?.classList.remove("btn-active");
    document
      .getElementById(componentName + "NavBtn")
      ?.classList.add("btn-active");
    updateNavButton(componentName + "NavBtn");
  }, [currentComponent]);

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className="basis-2/3 flex justify-center items-center h-2/3">
        <NavigationContext.Provider value={[selectPrevious, selectNext]}>
          {currentComponent}
        </NavigationContext.Provider>
      </div>
      <div className="basis-1/6 flex flex-col justify-center items-center gap-3 h-1/6">
        <button
          className="btn btn-primary w-2/3 sm:w-1/2 lg:w-1/3"
          onClick={() =>
            exportResume(templateName as string, convertData(getAllData()))
          }
        >
          Export
        </button>
      </div>
      <div className="basis-1/6 flex justify-center items-center h-1/6 w-full">
        <div className="dropdown dropdown-top w-1/2">
          <div className="flex justify-center items-center gap-2">
            <button
              className="btn btn-circle btn-secondary"
              onClick={() => selectPrevious()}
            >
              <FontAwesomeIcon
                className="text-4xl"
                icon={solid("arrow-left")}
              ></FontAwesomeIcon>
            </button>
            <label tabIndex={0} className="btn btn-primary w-full md:w-1/2">
              {currentComponent.props.field.props.title}
            </label>
            <button
              className="btn btn-circle btn-secondary"
              onClick={() => selectNext()}
            >
              <FontAwesomeIcon
                className="text-4xl"
                icon={solid("arrow-right")}
              ></FontAwesomeIcon>
            </button>
          </div>
          <ul tabIndex={0} className="dropdown-content menu rounded-box">
            {navigationButtons.current.map((buttonEl) => (
              <li key={uniqid()}>{buttonEl}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { EditPage, NavigationContext };
