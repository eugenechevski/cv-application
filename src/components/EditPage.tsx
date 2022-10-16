import { useState } from "react";
import EditEntry from "Components/edit-page/EditEntry";
import Input from "./edit-page/Input";
import List from "./edit-page/List";
import Table from "./edit-page/Table";

const EditPage = (props: any) => {
  const { templateName } = props;
  const entries = {
    Name: <EditEntry field={<Input></Input>}></EditEntry>,
    Title: <EditEntry field={<Input></Input>}></EditEntry>,
    Skills: <EditEntry field={<List></List>}></EditEntry>,
    Experience: <EditEntry field={<Table></Table>}></EditEntry>,
    Education: <EditEntry field={<Table></Table>}></EditEntry>,
    Awards: <EditEntry field={<List></List>}></EditEntry>,
    Projects: <EditEntry field={<List></List>}></EditEntry>,
    Languages: <EditEntry field={<List></List>}></EditEntry>,
  };

  const selectPrevious = () => {
    // TODO
  };

  const selectNext = () => {
    // TODO
  };

  const [currentEntry, selectEntry] = useState(entries["Name"]);

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
