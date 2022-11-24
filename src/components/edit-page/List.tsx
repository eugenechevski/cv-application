import LinkedNode from "src/indexed-linked-list/LinkedNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useCallback } from "react";

/**
 * TODO:
 *  Fix same input element problem
 */

const List = (props: any) => {
  const state: IndexedLinkedList<string> = props.state;
  const updateState: (newState: IndexedLinkedList<string>) => void =
    props.updateState;
  const title: string = props.title;

  const itemType = title === "Skills" ? "skill" : "award";
  const article = itemType === "skill" ? "a" : "an";

  /**
   * Functions for manual state changes:
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);

  const [isValidInput, setValidity] = useState(true);
  const [isInputOn, setInputMode] = useState(false);
  const [currentModified, updateModified] = useState(null);
  const [currentInput, updateInput] = useState("New " + itemType);
  const [selectedItemId, setSelectedItemId] = useState("");

  const updateAllStates = () => {
    updateState(state);
    forceUpdate();
  };

  const addItem = (newItem: string) => {
    state.appendNode(LinkedNode(newItem));
    updateState(state);
  };

  const removeItem = (itemId: string) => {
    state.removeNode(itemId);
    setSelectedItemId("");
    updateAllStates();
  };

  const editItem = (item: LinkedNode<string>) => {
    item.setValue(currentInput);
    updateState(state);
  };

  const setNewInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.value.length === 0) {
      target.setCustomValidity(
        `${article.toUpperCase()} ${itemType} has to have at least one character.`
      );
      setValidity(false);
    } else if (target.value.length > 30) {
      target.setCustomValidity(
        `The length of ${article} ${itemType} must not exceed 30 characters.`
      );
      setValidity(false);
      return;
    } else {
      setValidity(true);
    }

    updateInput(target.value);
  };

  const verifyInput = () => {
    var isValid = isValidInput;
    
    if (isValid && state.hasValue(currentInput)) {
      isValid = false;
      setValidity(false);
      document
        .querySelector("input")
        .setCustomValidity(
          `${article.toUpperCase()} ${itemType} cannot be repeated.`
        );
    }

    return isValid;
  };

  const cancelInput = () => {
    setInputMode(false);
    updateModified(null);
    updateInput(`New ${itemType}`);
  };

  const acceptInput = () => {
    if (!verifyInput()) {
      return;
    }

    if (currentModified === null) {
      addItem(currentInput);
    } else {
      editItem(currentModified);
    }

    cancelInput();
  };

  const selectItem = (itemId: string) => {
    document.getElementById(selectedItemId)?.classList.remove("bg-secondary");
    document.getElementById(itemId)?.classList.add("bg-secondary");
    setSelectedItemId(itemId);
  };

  const moveUp = () => {
    const currentNode = state.getNode(selectedItemId);
    state.swapNodes(currentNode, currentNode.getPrevious());
    updateAllStates();
  };

  const moveDown = () => {
    const currentNode = state.getNode(selectedItemId);
    state.swapNodes(currentNode.getNext(), currentNode);
    updateAllStates();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">
        {title}
      </h1>
      <ul className="w-1/2 overflow-scroll">
        {([...state] as { i: number; node: LinkedNode<string> }[]).map(
          (item) => (
            <li
              key={item.node.getId()}
              className="cursor-pointer p-3 flex justify-center items-center border-b border-b-primary"
              id={item.node.getId()}
              onClick={() => selectItem(item.node.getId())}
            >
              {item.node.getValue()}
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
            value={currentInput}
            type="text"
            placeholder="Type here"
            className={
              "input input-bordered w-full max-w-xs" +
              (!isValidInput ? " input-error" : "")
            }
            onChange={(e: any) => setNewInput(e)}
          />
          <button className="btn btn-circle" onClick={acceptInput}>
            <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={cancelInput}>
            <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
          </button>
        </div>
      )}
      {selectedItemId !== "" && !isInputOn && state.getLength() > 0 ? (
        <div className="flex gap-2">
          <button
            className="btn btn-circle"
            onClick={removeItem.bind(null, selectedItemId)}
          >
            <FontAwesomeIcon
              icon={solid("x")}
              className="text-xs"
            ></FontAwesomeIcon>
          </button>
          <button
            className="btn btn-circle"
            onClick={() => {
              updateModified(state.getNode(selectedItemId));
              setInputMode(true);
              updateInput(state.getNode(selectedItemId).getValue());
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
