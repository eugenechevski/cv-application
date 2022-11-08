import uniqid from "uniqid";

const Table = (props: any) => {
  const state: IndexedLinkedList<Row> = props.state;
  const updateState: (newState: IndexedLinkedList<Row>) => void =
    props.updateState;

  const nodes = [...state];
  const rowElements = [];
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i] as LinkedNode<Row>;
    rowElements.push(
      <tr key={uniqid()}>
        <th>{i + 1}</th>
        {[
          node
            .getValue()
            .getAllFields()
            .map((field: string) => 
              <td className="whitespace-normal break-all" key={uniqid()}>{node.getValue().getFieldValue(field)}</td>
            ),
        ]}
      </tr>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
        <tbody>
          {rowElements}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
