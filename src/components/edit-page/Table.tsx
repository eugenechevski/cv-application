import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useCallback, useRef } from "react";
import LinkedNode from "src/indexed-linked-list/LinkedNode";

/**
 * TODO:
 *  Input validation
 *  Closing input when switching between components
 *
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
  const [selectedTarget, setSelectedTarget] = useState({
    selectedRow: state.getHead(),
    selectedField: "",
  });
  const [isInputOn, setInputMode] = useState(false);
  const [currInput, setNewInput] = useState("");
  const [isValidInput, setValidity] = useState(true);

  /**
   * Functions for operating on the state
   */
  const rejectInput = () => {
    setNewInput("");
    setInputMode(false);
  };

  const acceptInput = () => {
    if (!isValidInput) {
      return;
    }

    (selectedTarget.selectedRow as LinkedNode<Row>)
      .getValue()
      .editField(
        selectedTarget.selectedField.slice(
          0,
          selectedTarget.selectedField.indexOf("-")
        ),
        currInput
      );
    rejectInput();
    updateAllStates();
  };

  const addRow = () => {
    state.appendNode(LinkedNode(rowPrototype.current.createNewInstance()));
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

  const handleOpenEditInput = () => {
    setInputMode(true);

    const row = (selectedTarget.selectedRow as LinkedNode<Row>).getValue();
    var field = selectedTarget.selectedField;
    field = field.slice(0, field.indexOf("-"));
    setNewInput(row.getFieldValue(field));
  };

  const handleSelectField = (newTarget: {
    selectedField: string;
    selectedRow: LinkedNode<Row>;
  }) => {
    setInputMode(false);
    setSelectedTarget(newTarget);
  };

  const validateText = (
    field: string,
    target: HTMLInputElement,
    newInput: string,
    minChars?: number,
    maxChars?: number
  ): void => {
    const fieldFormatted = field
      .split(/(?<=[a-z])\.?(?=[A-Z])/)
      .map((s: string) => s.toLowerCase())
      .join(" ");

    if (minChars !== undefined && newInput.length === minChars) {
      setValidity(false);
      setNewInput(newInput);
      target.setCustomValidity(
        `The length of a ${fieldFormatted} cannot be less than ${minChars + 1}.`
      );
    } else if (maxChars !== undefined && newInput.length > maxChars) {
      setValidity(false);
      target.setCustomValidity(
        `The length of a ${fieldFormatted} cannot be greater than ${maxChars}.`
      );
    } else {
      setValidity(true);
      setNewInput(newInput);
    }
  };

  const getDates = (field: string, inputDate: string): [dateFrom: Date, dateTo: Date] => {
    const dateFromData = field === 'dateFrom' ? inputDate : selectedTarget.selectedRow.getValue().getFieldValue('dateFrom');
    const dateToData = field === 'dateTo' ? inputDate : selectedTarget.selectedRow.getValue().getFieldValue('dateTo');
  
    const [yearFrom, monthFrom, dayFrom] = dateFromData
      .split("-")
      .map((t: string) => Number(t));
    const dateFrom = new Date();
    dateFrom.setFullYear(yearFrom, monthFrom - 1, dayFrom);
  
    const [yearTo, monthTo, dayTo] = dateToData
      .split("-")
      .map((t: string) => Number(t));
    const dateTo = new Date();
    dateTo.setFullYear(yearTo, monthTo - 1, dayTo);

    return [dateFrom, dateTo];
  }

  // TODO
  const validateDate = (field: string, inputDate: string, target: HTMLInputElement): void => {
    if (field === 'dateFrom' && inputDate === '') {
      setValidity(false);
      target.setCustomValidity('The starting date must specified.');
      return;
    }

    const [dateFrom, dateTo] = getDates(field, inputDate);

    if (dateFrom > dateTo) {
      setValidity(false);
      target.setCustomValidity(
        "The starting date cannot be after the ending date."
      );
    } else {
      setValidity(true);
    }
    setNewInput(inputDate);
  };

  const handleNewInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newInput = target.value;
    let field = selectedTarget.selectedField;
    field = field.slice(0, field.indexOf("-"));

    if (
      field === "companyName" ||
      field === "jobTitle" ||
      field === "location" ||
      field === "schoolName" ||
      field === "degree"
    ) {
      validateText(field, target, newInput, 0, 30);
    } else if (field === "dateFrom" || field === "dateTo") {
      validateDate(field, newInput, target);
    } else if (field === "description") {
      validateText(field, target, newInput, 0, 100);
    }
  };

  return (
    <div className="flex flex-col h-full gap" key={uniqid()}>
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">
        {title}
      </h1>
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
            {([...state] as { i: number; node: LinkedNode<Row> }[]).map(
              (entry) => (
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
                            (field + "-" + entry.node.getId() ===
                            selectedTarget.selectedField
                              ? "bg-accent"
                              : "") +
                            " whitespace-normal cursor-pointer border-l border-l-neutral"
                          }
                          id={field + "-" + entry.node.getId()}
                          key={uniqid()}
                          onClick={() =>
                            handleSelectField({
                              selectedField: field + "-" + entry.node.getId(),
                              selectedRow: entry.node,
                            })
                          }
                        >
                          {entry.node.getValue().getFieldValue(field)}
                        </td>
                      )),
                  ]}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center items-center border-t border-neutral p-2 h-1/6">
        {/* Input container */}
        {isInputOn ? (
          <div className="flex justify-center gap-2">
            <input
              max={(() => {
                let today = new Date();
                return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
              })()}
              value={currInput}
              type={
                selectedTarget.selectedField.startsWith("date")
                  ? "date"
                  : "text"
              }
              placeholder="Type here"
              className={
                "input input-bordered w-full max-w-xs" +
                (!isValidInput ? " input-error" : " input-primary")
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
        ) : (
          <button className="btn btn-circle" onClick={addRow}>
            <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
          </button>
        )}
        {/* Modification buttons */}
        {selectedTarget.selectedRow !== null &&
        !isInputOn &&
        state.getLength() > 0 ? (
          <div className="flex gap-2">
            <button className="btn btn-circle" onClick={removeRow}>
              <FontAwesomeIcon
                icon={solid("x")}
                className="text-xs"
              ></FontAwesomeIcon>
            </button>
            <button
              className="btn btn-circle"
              onClick={() => handleOpenEditInput()}
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
