import { useState } from "react";
import EditEntry from "Components/edit-page/EditEntry";
import Input from "./edit-page/Input";
import List from "./edit-page/List";
import Table from "./edit-page/Table";

const EditPage = (props: any) => {
  const { templateName } = props;

  const [name, updateName] = useState('John Doe');
  const [title, updateTitle] = useState('Lorem ipsum dolor sit amet');
  const [skills, updateSkills] = useState(new Set(['Skill 1', 'Skill 2', 'Skill 3']));
  const [experience, updateExperience] = useState({
    0: {
      companyName: 'ABC Company',
      jobTitle: 'Manager',
      timeFrom: Date.now(),
      timeTo: Date.now(),
      location: 'NY City',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
      interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
      lacinia felis eu finibus.`,
    },
  });
  const [education, updateEducation] = useState({
    0: {
      schoolName: 'Harvard',
      degree: 'Bachelor\'s',
      timeFrom: Date.now(),
      timeTo: Date.now(),
      location: 'Boston',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
      interdum nisi. Sed in consequat mi. Sed in consequat mi, sed pulvinar
      lacinia felis eu finibus.`,
    },
  });
  const [awards, updateAwards] = useState(new Set(['Award 1', 'Award 2', 'Award 3']));
  const [projects, updateProjects] = useState(new Set(['Project 1', 'Project 2', 'Project 3']));
  const [languages, updateLanguages] = useState(new Set(['Language 1', 'Language 2', 'Language 3']));

  const entryComponents = {
    Name: <EditEntry title={'Name'} field={<Input state={name} updateState={updateName}></Input>}></EditEntry>,
    Title: <EditEntry title={'Title'} field={<Input state={title} updateState={updateTitle}></Input>}></EditEntry>,
    Skills: <EditEntry title={'Skills'} field={<List state={skills} updateState={updateSkills}></List>}></EditEntry>,
    Experience: <EditEntry title={'Experience'} field={<Table state={experience} updateState={updateExperience}></Table>}></EditEntry>,
    Education: <EditEntry title={'Education'} field={<Table state={education} updateState={updateEducation}></Table>}></EditEntry>,
    Awards: <EditEntry title={'Awards'} field={<List state={awards} updateState={updateAwards}></List>}></EditEntry>,
    Projects: <EditEntry title={'Projects'} field={<List state={projects} updateState={updateProjects}></List>}></EditEntry>,
    Languages: <EditEntry title={'Languages'} field={<List state={languages} updateState={updateLanguages}></List>}></EditEntry>,
  };

  const selectPrevious = () => {
    // TODO
  };

  const selectNext = () => {
    // TODO
  };

  const [currentEntry, selectEntry] = useState(entryComponents["Name"]);

  return (
    <div className="flex flex-col">
      {currentEntry}
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
          {templateName === 'Simple' ? (
            <>
              <button className="btn">Projects</button>
              <button className="btn">Languages</button>
            </>
          ): (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
