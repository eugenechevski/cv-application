import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useCallback, useRef } from "react";
import LinkedNode from "src/indexed-linked-list/LinkedNode";

/**
 * TODO:
 *  Input validation
 *  Date picker
 */

const Table = (props: any) => {
  /**
   * Props
   */
  const state: IndexedLinkedList<Row> = props.state;
  const updateState: (newState: IndexedLinkedList<Row>) => void =
    props.updateState;
  const title: string = props.title;

  /**
   * The prototype of a row is required for creating new instances.
   */
  const rowPrototype = useRef(null);
  if (rowPrototype.current === null) {
    rowPrototype.current = state.getHead().getValue().createNewInstance();
  }

  /**
   * States
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);
  const updateAllStates = () => {
    updateState(state);
    forceUpdate();
  };
  const [selectedTarget, selectTarget] = useState({
    selectedRow: null,
    selectedField: "",
  });
  const [isInputOn, setInputMode] = useState(false);
  const [currentInput, setNewInput] = useState("");

  /**
   * Functions for operating on the state
   */

  const acceptInput = () => {
    (selectedTarget.selectedRow as LinkedNode<Row>)
      .getValue()
      .editField(
        selectedTarget.selectedField.slice(
          0,
          selectedTarget.selectedField.indexOf("-")
        ),
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
      LinkedNode(rowPrototype.current.createNewInstance())
    );
    updateAllStates();
  };

  const removeRow = () => {
    state.removeNode((selectedTarget.selectedRow as LinkedNode<Row>).getId());
    updateAllStates();
  };

  const moveRowUp = () => {
    state.swapNodes(
      (selectedTarget.selectedRow as LinkedNode<Row>).getPrevious(),
      selectedTarget.selectedRow as LinkedNode<Row>
    );
    updateAllStates();
  };

  const moveRowDown = () => {
    state.swapNodes(
      selectedTarget.selectedRow as LinkedNode<Row>,
      (selectedTarget.selectedRow as LinkedNode<Row>).getNext()
    );
    updateAllStates();
  };

  return (
    <div className="flex flex-col h-full gap">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">{title}</h1>
      <div className="overflow-scroll h-4/6 w-full">
        {/* Table */}
        <table className="table text-sm border border-neutral h-full w-full">
          <thead>
            <tr>
              <th></th>
              {[
                state
                  .getHead()
                  ?.getValue()
                  .getAllFields()
                  .map((field: string) => <th key={uniqid()}>{field}</th>),
              ]}
            </tr>
          </thead>
          <tbody>
            {
              ([...state] as {i: number, node: LinkedNode<Row>}[]).map(entry => (
                <tr
                    id={entry.node.getId()}
                    key={uniqid()}
                    className={
                      (entry.node === selectedTarget.selectedRow
                        ? "border border-secondary"
                        : "") + " cursor-pointer"
                    }
                  >
                    <th className="border-r border-r-neutral">{entry.i + 1}</th>
                    {[
                      entry.node
                        .getValue()
                        .getAllFields()
                        .map((field: string) => (
                          <td
                            className={
                              (field + "-" + entry.node.getId() === selectedTarget.selectedField
                                ? "bg-accent"
                                : "") +
                              " whitespace-normal cursor-pointer border-l border-l-neutral"
                            }
                            id={field + "-" + entry.node.getId()}
                            key={uniqid()}
                            onClick={selectTarget.bind(null, {
                              selectedField: field + "-" + entry.node.getId(),
                              selectedRow: entry.node,
                            })}
                          >
                            {entry.node.getValue().getFieldValue(field)}
                          </td>
                        )),
                    ]}
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center items-center border-t border-neutral p-2 h-1/6">
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
          <button className="btn btn-circle" onClick={addRow}>
            <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
          </button>
        )}
        {/* Modification buttons */}
        { selectedTarget.selectedRow !== null && !isInputOn && state.getLength() > 0 ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Table;
