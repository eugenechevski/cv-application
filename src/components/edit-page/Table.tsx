import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useCallback } from "react";
import LinkedNode from "src/indexed-linked-list/LinkedNode";

const Table = (props: any) => {
  /**
   * Props
   */
  const state: IndexedLinkedList<Row> = props.state;
  const updateState: (newState: IndexedLinkedList<Row>) => void =
    props.updateState;

  /**
   * States
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);
  const updateAllStates = () => {
    updateState(state);
    forceUpdate();
  };
  const [selectedRow, selectRow] = useState(null);
  const [selectedField, selectField] = useState("");
  const [isInputOn, setInputMode] = useState(false);
  const [currentInput, setNewInput] = useState("");

  /**
   * Functions for operating on the state
   */

  const setSelectedRow = (node: LinkedNode<Row>) => {
    if (selectedRow !== null) {
      document
        .getElementById((selectedRow as LinkedNode<Row>).getId())
        ?.classList.remove("border", "border-secondary");
    }
    document.getElementById(node.getId())?.classList.add("border", "border-secondary");
    selectRow(node);
  };

  const setSelectedField = (fieldId: string, node: LinkedNode<Row>) => {
    document.getElementById(selectedField)?.classList.remove("bg-accent");
    document.getElementById(fieldId)?.classList.add("bg-accent");
    selectField(fieldId);
    setSelectedRow(node);
  };

  const acceptInput = () => {
    (selectedRow as LinkedNode<Row>)
      .getValue()
      .editField(
        selectedField.slice(0, selectedField.indexOf("-")),
        currentInput
      );
    setNewInput("");
    setInputMode(false);
    updateAllStates();
  };

  const rejectInput = () => {
    setNewInput("");
    setInputMode(false);
  };

  const addRow = () => {
    state.appendNode(
      LinkedNode(state.getHead().getValue().createNewInstance())
    );
    updateAllStates();
  };

  const removeRow = () => {
    state.removeNode((selectedRow as LinkedNode<Row>).getId());
    updateAllStates();
  };

  const moveRowUp = () => {
    state.swapNodes(
      selectedRow as LinkedNode<Row>,
      (selectedRow as LinkedNode<Row>).getNext()
    );
    updateAllStates();
  };

  const moveRowDown = () => {
    state.swapNodes(
      (selectedRow as LinkedNode<Row>).getPrevious(),
      selectedRow
    );
    updateAllStates();
  };

  /**
   * Table construction
   */
  const nodes = [...state];
  const rowElements = [];
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i] as LinkedNode<Row>;
    rowElements.push(
      <tr
        id={node.getId()}
        key={uniqid()}
        onClick={setSelectedRow.bind(null, node)}
        className="cursor-pointer"
      >
        <th className="border-r border-r-neutral">{i + 1}</th>
        {[
          node
            .getValue()
            .getAllFields()
            .map((field: string) => (
              <td
                className="whitespace-normal overflow-scroll cursor-pointer border-l border-l-neutral"
                id={field + "-" + i}
                key={uniqid()}
                onClick={setSelectedField.bind(null, field + "-" + i, node)}
              >
                {node.getValue().getFieldValue(field)}
              </td>
            )),
        ]}
      </tr>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Table */}
      <table className="table text-sm overflow-scroll max-h-[50%] border border-neutral">
        <thead>
          <tr>
            <th></th>
            {[
              state
                .getHead()
                .getValue()
                .getAllFields()
                .map((field: string) => <th key={uniqid()}>{field}</th>),
            ]}
          </tr>
        </thead>
        <tbody>{rowElements}</tbody>
      </table>
      {/* Add a row button */}
      <button className="btn btn-circle" onClick={addRow}>
        <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
      </button>
      {/* Input container */}
      {isInputOn ? (
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e: any) => setNewInput(e.target.value)}
          />
          <button className="btn btn-circle" onClick={acceptInput}>
            <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
          </button>
          <button className="btn btn-circle" onClick={rejectInput}>
            <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* Modification buttons */}
      <div className="flex gap-2">
        <button className="btn btn-circle" onClick={removeRow}>
          <FontAwesomeIcon
            icon={solid("x")}
            className="text-xs"
          ></FontAwesomeIcon>
        </button>
        <button
          className="btn btn-circle"
          onClick={setInputMode.bind(null, true)}
        >
          <FontAwesomeIcon
            icon={solid("pen")}
            className="text-xs"
          ></FontAwesomeIcon>
        </button>
        <button className="btn btn-circle" onClick={moveRowUp}>
          <FontAwesomeIcon
            icon={solid("arrow-up")}
            className="text-xs"
          ></FontAwesomeIcon>
        </button>
        <button className="btn btn-circle" onClick={moveRowDown}>
          <FontAwesomeIcon
            icon={solid("arrow-down")}
            className="text-xs"
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default Table;
