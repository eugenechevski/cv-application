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
    [Symbol.iterator],
}
