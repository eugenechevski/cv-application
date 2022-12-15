function extractListData(data: IndexedLinkedList<any>): any[] {
    return ([...(data as IndexedLinkedList<string>)] as { i: number, node: LinkedNode<any>}[]).map(item => item.node.getValue());
}

function extractRowData(data: IndexedLinkedList<Row>): any[] {
    const rows = ([...data] as {i: number, node: LinkedNode<Row>}[]).map(row => row.node.getValue());
    const fieldNames = rows[0].getAllFields();
    const extracted = [];
    
    for (let i = 0; i < rows.length; i++) {
        extracted.push({})
        for (let j = 0; j < fieldNames.length; j++) {
            Object.assign(extracted[i] as {}, { [fieldNames[j]]: rows[i].getFieldValue(fieldNames[j]) })
        }
    }

    return extracted;
}

export default function convertData(data: RawData): BasicResume | ExtendedResume {
  let convertedData = {
    name: (data.name as { current: string }).current,
    title: (data.title as { current: string }).current,
    street: (data.street as { current: string }).current,
    city: (data.city as { current: string }).current,
    zip: (data.zip as { current: string }).current,
    phone: (data.phone as { current: string }).current,
    email: (data.email as { current: string }).current,
    skills: extractListData(data.skills as IndexedLinkedList<string>) as string[],
    awards: extractListData(data.awards as IndexedLinkedList<string>) as string[],
    experience: extractRowData(data.experience as IndexedLinkedList<Row>) as Experience[],
    education: extractRowData(data.education as IndexedLinkedList<Row>) as Education[],
  };

  if (data.projects !== undefined) {
    Object.assign(convertedData, { projects: extractListData(data.projects as IndexedLinkedList<string>) })
  }

  if (data.languages !== undefined) {
    Object.assign(convertedData, { languages: extractListData(data.languages as IndexedLinkedList<string>) })
  }

  return convertedData;
}