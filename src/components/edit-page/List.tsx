import LinkedNode from "src/indexed-linked-list/LinkedNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState, useCallback } from "react";

const List = (props: any) => {
  const state: IndexedLinkedList<string> = props.state;
  const updateState: (newState: IndexedLinkedList<string>) => void =
    props.updateState;
  const title: string = props.title;

  /**
   * Functions for manual state changes:
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);

  const [isInputOn, setInputMode] = useState(false);
  const [currentModified, updateModified] = useState(null);
  const [currentInput, updateInput] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState("");

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

  const cancelInput = () => {
    setInputMode(false);
    updateModified(null);
    updateInput("");
  };

  const acceptInput = () => {
    if (currentModified === null) {
      addEntry(currentInput);
    } else {
      editEntry(currentModified);
    }
    
    cancelInput();
  };


  const selectEntry = (entryId: string) => {
    document.getElementById(selectedEntryId)?.classList.remove("bg-secondary");
    document.getElementById(entryId)?.classList.add("bg-secondary");
    setSelectedEntryId(entryId);
  };

  const moveUp = () => {
    const currentNode = state.getNode(selectedEntryId);
    state.swapNodes(currentNode, currentNode.getPrevious());
    updateState(state);
    forceUpdate();
  };

  const moveDown = () => {
    const currentNode = state.getNode(selectedEntryId);
    state.swapNodes(currentNode.getNext(), currentNode);
    updateState(state);
    forceUpdate();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">
        {title}
      </h1>
      <ul className="w-1/2 overflow-scroll">
        {([...state] as { i: number; node: LinkedNode<string> }[]).map(
          (entry) => (
            <li
              key={entry.node.getId()}
              className="cursor-pointer p-3 flex justify-center items-center border-b border-b-primary"
              id={entry.node.getId()}
              onClick={selectEntry.bind(null, entry.node.getId())}
            >
              {entry.node.getValue()}
            </li>
          )
        )}
      </ul>
      {!isInputOn ? (
        <button
          className="btn btn-circle"
          onClick={setInputMode.bind(null, true)}
        >
          <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
        </button>
      ) : (
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={setNewInput}
          />
          <button className="btn btn-circle" onClick={acceptInput}>
            <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={cancelInput}>
            <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
          </button>
        </div>
      )}
      {selectedEntryId !== "" && !isInputOn ? (
        <div className="flex gap-2">
          <button
            className="btn btn-circle"
            onClick={removeEntry.bind(null, selectedEntryId)}
          >
            <FontAwesomeIcon
              icon={solid("x")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
          <button
            className="btn btn-circle"
            onClick={() => {
              updateModified(state.getNode(selectedEntryId));
              setInputMode(true);
            }}
          >
            <FontAwesomeIcon
              icon={solid("pen")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={moveUp}>
            <FontAwesomeIcon
              icon={solid("arrow-up")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={moveDown}>
            <FontAwesomeIcon
              icon={solid("arrow-down")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default List;
