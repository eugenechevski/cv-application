import { useState } from "react";
import EditEntry from "Components/edit-page/EditEntry";

const EditPage = (props: any) => {
  const entries = {
    Name: <EditEntry></EditEntry>,
    Title: <EditEntry></EditEntry>,
    Skills: <EditEntry></EditEntry>,
    Experience: <EditEntry></EditEntry>,
    Education: <EditEntry></EditEntry>,
    Awards: <EditEntry></EditEntry>,
    Projects: <EditEntry></EditEntry>,
    Languages: <EditEntry></EditEntry>,
  };

  const selectPrevious = () => {
    // TODO
  };

  const selectNext = () => {
    // TODO
  };

  const [currentEntry, selectEntry] = useState(entries["Name"]);

  return (
    <div className="pagination">
      <div className="btn-group">
        <button className="btn btn-active">Name</button>
        <button className="btn">Title</button>
        <button className="btn">Skills</button>
        <button className="btn">Experience</button>
        <button className="btn">Education</button>
        <button className="btn">Awards</button>
        <button className="btn">Projects</button>
        <button className="btn">Languages</button>
      </div>
    </div>
  );
};

export default EditPage;
