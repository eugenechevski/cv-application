import LinkedNode from "DataAPI/LinkedNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useCallback } from "react";

const List = (props: any) => {
  const data: IndexedLinkedList<string> = props.data;
  const updateData: (newData: IndexedLinkedList<string>) => void =
    props.updateData;
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
  const [currModifiedItem, setModifiedItem] = useState(null);
  const [currInput, setInput] = useState("New " + itemType);
  const [selectedItemId, setSelectedItemId] = useState("");

  const updateAllStates = () => {
    updateData(data);
    forceUpdate();
  };

  const addItem = (newItem: string) => {
    if (data.getLength() < 5) {
      data.appendNode(LinkedNode(newItem));
      updateData(data);
    }
  };

  const removeItem = (itemId: string) => {
    data.removeNode(itemId);
    setSelectedItemId("");
    updateAllStates();
  };

  const editItem = (item: LinkedNode<string>) => {
    item.setValue(currInput);
    updateData(data);
  };

  const handleNewInput = (e: Event) => {
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

    setInput(target.value);
  };

  const verifyInput = () => {
    var isValid = isValidInput;
    
    if (isValid && data.hasValue(currInput)) {
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

  const rejectInput = () => {
    setInputMode(false);
    setModifiedItem(null);
    setInput(`New ${itemType}`);
  };

  const acceptInput = () => {
    if (!verifyInput()) {
      return;
    }

    if (currModifiedItem === null) {
      addItem(currInput);
    } else {
      editItem(currModifiedItem);
    }

    rejectInput();
  };

  const handleSelectItem = (itemId: string) => {
    document.getElementById(selectedItemId)?.classList.remove("bg-secondary");
    document.getElementById(itemId)?.classList.add("bg-secondary");
    setSelectedItemId(itemId);
  };

  const moveUp = () => {
    const currentNode = data.getNode(selectedItemId);
    data.swapNodes(currentNode, currentNode.getPrevious());
    updateAllStates();
  };

  const moveDown = () => {
    const currentNode = data.getNode(selectedItemId);
    data.swapNodes(currentNode.getNext(), currentNode);
    updateAllStates();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">
        {title}
      </h1>
      <ul className="w-full overflow-scroll">
        {([...data] as { i: number; node: LinkedNode<string> }[]).map(
          (item) => (
            <li
              key={item.node.getId()}
              className="cursor-pointer p-3 flex justify-center items-center border-b border-b-primary overflow-scroll"
              id={item.node.getId()}
              onClick={() => handleSelectItem(item.node.getId())}
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
            value={currInput}
            type="text"
            placeholder="Type here"
            className={
              "input input-bordered w-full max-w-xs" +
              (!isValidInput ? " input-error" : "")
            }
            onChange={(e: any) => handleNewInput(e)}
          />
          <button className="btn btn-circle" onClick={acceptInput}>
            <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={rejectInput}>
            <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
          </button>
        </div>
      )}
      {selectedItemId !== "" && !isInputOn && data.getLength() > 0 ? (
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
              setModifiedItem(data.getNode(selectedItemId));
              setInputMode(true);
              setInput(data.getNode(selectedItemId).getValue());
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
