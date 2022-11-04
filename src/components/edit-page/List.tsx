import LinkedNode from "src/indexed-linked-list/LinkedNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState, useCallback } from "react";

const List = (props: any) => {
  const state: IndexedLinkedList<string> = props.state;
  const updateState: (newState: IndexedLinkedList<string>) => void = props.updateState;

  /**
   * Functions for manual state changes:
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);

  const [isInputOn, setInputMode] = useState(false);
  const [currentModified, updateModified] = useState(null);
  const [currentInput, updateInput] = useState('');

  const addEntry = (newEntry: string) => {
    state.appendNode(LinkedNode(newEntry));
    updateState(state);
  };

  const removeEntry = (entryId: string) => {
    state.removeNode(entryId);
    updateState(state);
    forceUpdate();
  };

  const editEntry = (entry: LinkedNode<string>) => {
    entry.setValue(currentInput);
    updateState(state);
  };

  const setNewInput = (event) => {
    updateInput(event.target.value);
  };

  const acceptInput = () => {
    if (isInputOn) {
      addEntry(currentInput);
      setInputMode(false);
    } else if (currentModified !== null) {
      editEntry(currentModified);
      updateModified(null);
    }

    updateInput('');
  };

  const cancelInput = () => {
    updateInput('');
    updateModified('');
    setInputMode(false);
  };

  return (
    <ul className="border rounded-lg">
      {[...state].map((entry: LinkedNode<string>) => (
        <li key={entry.getId()}>
          {entry.getValue()}
          <div>
            <button
              className="btn btn-circle"
              onClick={removeEntry.bind(null, entry.getId())}
            >
              <FontAwesomeIcon
                icon={solid("x")}
                className="text-xs"
              ></FontAwesomeIcon>
            </button>
            {!isInputOn ? (
              <button className="btn btn-circle" onClick={() => updateModified(entry)}>
                <FontAwesomeIcon
                  icon={solid("pen")}
                  className="text-xs"
                ></FontAwesomeIcon>
              </button>
            ): (
              <></>
            )}
          </div>
        </li>
      ))}
      {
        currentModified === null && !isInputOn ? (
            <button className="btn btn-circle" onClick={setInputMode.bind(null, true)}>
                <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
            </button>
        ) : (
          <div>
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={setNewInput}/>
            <button className="btn btn-circle" onClick={acceptInput}>
              <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
            </button>
            <button className="btn btn-circle" onClick={cancelInput}>
              <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
            </button>
          </div>
        )
      }
    </ul>
  );
};

export default List;
