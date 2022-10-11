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
        <button className="btn btn-xs">1</button>
        <button className="btn btn-xs btn-active">2</button>
        <button className="btn btn-xs">3</button>
        <button className="btn btn-xs">4</button>
      </div>
      <div className="btn-group">
        <button className="btn btn-sm">1</button>
        <button className="btn btn-sm btn-active">2</button>
        <button className="btn btn-sm">3</button>
        <button className="btn btn-sm">4</button>
      </div>
      <div className="btn-group">
        <button className="btn btn-md">1</button>
        <button className="btn btn-md btn-active">2</button>
        <button className="btn btn-md">3</button>
        <button className="btn btn-md">4</button>
      </div>
      <div className="btn-group">
        <button className="btn btn-lg">1</button>
        <button className="btn btn-lg btn-active">2</button>
        <button className="btn btn-lg">3</button>
        <button className="btn btn-lg">4</button>
      </div>
    </div>
  );
};

export default EditPage;
