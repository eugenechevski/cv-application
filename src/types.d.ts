declare type LinkedNode<T> = {
    getId: () => string,
    getValue: () => T,
    setValue: (newValue: T) => void,
    getPrevious: () => LinkedNode<T>,
    setPrevious: (newPrevious: LinkedNode<T>) => void,
    getNext: () => LinkedNode<T>,
    setNext: (newNext: LinkedNode<T>) => void,
}

declare type IndexedLinkedList<T> = {
    getTail: () => LinkedNode<T>,
    setTail: (newTail: LinkedNode<T>) => void,
    getHead: () => LinkedNode<T>,
    setHead: (newHead: LinkedNode<T>) => void,
    getNode: (nodeId: string) => LinkedNode<T> | undefined,
    getLength: () => number,
    appendNode: (newNode: LinkedNode<T>) => void,
    insertNode: (newNode: LinkedNode<T>) => void,
    removeNode: (nodeId: string) => LinkedNode<T> | undefined,
    swapNodes: (node1: LinkedNode<T>, node2: LinkedNode<T>) => boolean,
    popLeft: () => LinkedNode<T>,
    pop: () => LinkedNode<T>,
    hasValue: (value: T) => booleTan,
    [Symbol.iterator],
}

declare type Row = {
    getAllFields: () => string[],
    getFieldValue: (fieldName: string) => string | undefined,
    addField: (newField: string, initValue?: string) => boolean,
    removeField: (fieldName: string) => boolean,
    editField: (fieldName: string, newValue?: string) => boolean,
    createNewInstance: () => Row,
}

declare type Experience = {
    companyName: string,
    jobTitle: string,
    dateFrom: string,
    dateTo: string,
    location: string,
    description: string,
}

declare type Education = {
    schoolName: string,
    degree: string,
    dateFrom: string,
    dateTo: string,
    location: string,
    description: string,
}

declare type BasicResume = {
    name: string,
    title: string,
    street: string,
    city: string,
    zip: string,
    phone: string,
    email: string,
    skills: string[],
    awards: string[],
    experience: Experience[],
    education: Education[],
}

declare type ExtendedResume = BasicResume & {
    projects: string[],
    languages: string[],
}

declare type RawData = {[index: string]: { current: string } | IndexedLinkedList<string> | IndexedLinkedList<Row>}
