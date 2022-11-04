import LinkedNode from "./LinkedNode";

export default function IndexedLinkedList<T>(items?: T[]): IndexedLinkedList<T> {
    var thisIndex: { [nodeId: string]: LinkedNode<T> } = {};
    var thisHead: LinkedNode<T> | undefined;
    var thisTail: LinkedNode<T> | undefined;
    var length = 0;
    
    initLinkedList();

    function getTail(): LinkedNode<T> | undefined {
        return thisTail;
    }

    function setTail(newTail: LinkedNode<T>): void {
        thisTail = newTail;
    }

    function getHead(): LinkedNode<T> | undefined {
        return thisHead;
    }

    function setHead(newHead: LinkedNode<T>): void {
        thisHead = newHead;
    }

    function getNode(nodeId: string): LinkedNode<T> | undefined {
        return thisIndex[nodeId];
    }

    function getLength(): number {
        return length;
    }

    /**
     * Inserts a node at the beginning of the list
     * @param newNode - node to inserted
     */
    function insertNode(newNode: LinkedNode<T>): void {
        thisHead?.setPrevious(newNode);
        newNode.setNext(thisHead);
        newNode.setPrevious(undefined);
        setHead(newNode);

        if (thisTail === undefined) {
            setTail(thisHead);
        }

        length++;
    }

    /**
     * Appends a node to the end of the list
     * @param newNode - node to be appended
     */
    function appendNode(newNode: LinkedNode<T>): void {
        thisIndex[newNode.getId()] = newNode;
        
        if (thisTail !== undefined) {
            thisTail.setNext(newNode);
            newNode.setPrevious(thisTail);
            setTail(newNode);
        } else {
            setHead(newNode);
            setTail(newNode);
        }

        length++;
    }

    /**
     * Removes a node from the list.
     * @param nodeId - an optional argument that provides the id of a node
     * @param node - an optional argument that provides the node itself
     * @returns node that was removed
     */
    function removeNode(nodeId: string): LinkedNode<T> | undefined {
        let nodeToBeDeleted = thisIndex[nodeId];

        if (nodeToBeDeleted !== undefined) {
            if (nodeToBeDeleted === thisHead) {
                setHead(nodeToBeDeleted.getNext());
            }

            if (nodeToBeDeleted === thisTail) {
                setTail(nodeToBeDeleted.getPrevious());
            }

            // Change pointers
            nodeToBeDeleted.getPrevious()?.setNext(nodeToBeDeleted.getNext());
            nodeToBeDeleted.getNext()?.setPrevious(nodeToBeDeleted.getPrevious());
            
            delete thisIndex[nodeId];

            length--;
        }

        return nodeToBeDeleted;
    }

    /**
     * Changes the pointers of two nodes so that it appears they were swapped.
     * @returns boolean indicating whether two nodes were swapped
     */
    function swapNodes(node1: LinkedNode<T>, node2: LinkedNode<T>): boolean {
        var isSwapped = false;

        if (node1 && node2 && node1 !== node2) {
            if (node1 === thisHead) {
                setHead(node2);
            } else if (node2 === thisHead) {
                setHead(node1);
            } 
            
            if (node1 === thisTail) {
                setTail(node2);
            } else if (node2 === thisTail) {
                setTail(node1);
            }

            // Copy the pointers of the first node
            let node1Next = node1.getNext();
            let node1Prev = node1.getPrevious();

            if (node1.getNext() === node2) {
                node1.setNext(node2.getNext());
                node1.getNext()?.setPrevious(node1);
                node1.setPrevious(node2);
                node2.setNext(node1);
                node2.setPrevious(node1Prev);
                node2.getPrevious()?.setNext(node2);
            } else if (node1.getPrevious() === node2) {
                node1.setNext(node2);
                node1.setPrevious(node2.getPrevious());
                node1.getPrevious()?.setNext(node1);
                node2.setPrevious(node1);
                node2.setNext(node1Next);
                node2.getNext()?.setPrevious(node2);
            } else {
                node1.setNext(node2.getNext());
                node1.getNext()?.setPrevious(node1);
                node1.setPrevious(node2.getPrevious());
                node1.getPrevious()?.setNext(node1);
                node2.setNext(node1Next);
                node2.getNext()?.setPrevious(node2);
                node2.setPrevious(node1Prev);
                node2.getPrevious()?.setNext(node2);
            }

            isSwapped = true;
        }

        return isSwapped;
    }

    function popLeft(): LinkedNode<T> | undefined {
        return removeNode(thisHead?.getId());
    }

    function pop(): LinkedNode<T> | undefined {
        return removeNode(thisTail?.getId());
    }

    function* generateIteration(): Generator<LinkedNode<T>> {
        let current = thisHead;

        while (current) {
            yield current;
            current = current.getNext();
        }
    }

    function initLinkedList(): void {
        if (items !== undefined) {
            let dummy = LinkedNode();
            let prev = dummy;
            let current = null;
            
            for (let i = 0; i < items.length; i++) {
                current = LinkedNode(items[i], prev);
                thisIndex[current.getId()] = current;
                (prev as LinkedNode<T>).setNext(current);
                prev = current;
                length++;
            }
    
            setHead(dummy.getNext() as LinkedNode<T>);
            thisHead.setPrevious(undefined);
            setTail(current as LinkedNode<T>);
        }
    }

    return {
        getTail,
        setTail,
        getHead,
        setHead,
        getNode,
        getLength,
        appendNode,
        insertNode,
        removeNode,
        swapNodes,
        popLeft,
        pop,
        [Symbol.iterator]: generateIteration,
    }
}