import uniqueId from "uniqueid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState, useCallback } from "react";

const uniqueidGenerator = uniqueId();

const List = ({ state, updateState }) => {
  /**
   * Functions for manual state changes:
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);

  const removeEntry = (entry: string) => {
    state.delete(entry);
    updateState(state);
    forceUpdate();
  };

  return (
    <ul className="border rounded-lg">
      {[...state.keys()].map((entry) => (
        <li key={uniqueidGenerator()}>
          {entry}
          <button
            className="btn btn-circle"
            onClick={removeEntry.bind(null, entry)}
          >
            <FontAwesomeIcon
              icon={solid("x")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle">
            <FontAwesomeIcon
              icon={solid("pen")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
        </li>
      ))}
      <button className="btn btn-circle">
        <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
      </button>
    </ul>
  );
};

export default List;
