import IndexedLinkedList from "src/indexed-linked-list/IndexedLinkedList";
import LinkedNode from "src/indexed-linked-list/LinkedNode";

it ('Tests the IndexedLinkedList', () => {
    const emptyList = IndexedLinkedList();
    var newList = IndexedLinkedList([1, 2, 3, 4, 5]);

    // getLength() tests
    expect(emptyList.getLength()).toBe(0);
    expect(newList.getLength()).toBe(5);

    // getHead() tests
    expect(emptyList.getHead()).toBe(undefined);
    expect(newList.getHead().getValue()).toBe(1);

    // getTail() tests
    expect(emptyList.getTail()).toBe(undefined);
    expect(newList.getTail().getValue()).toBe(5);

    // getId() tests
    expect(newList.getTail().getId()).toBeDefined();

    // getNode() tests
    expect(newList.getNode(newList.getTail().getId())).toBe(newList.getTail());

    // appendNode() tests
    newList.appendNode(LinkedNode(6));
    expect(newList.getTail().getValue()).toBe(6);

    // Iteration tests
    const nodes: {i: number, node: LinkedNode<number>}[] = [...newList];
    expect(nodes.length).toBe(6);
    
    for (let i = 0; i < nodes.length; i += 1) {
        expect(nodes[i].node.getValue()).toBe(i + 1);
    }

    // popLeft() tests
    expect(newList.getHead().getValue()).toBe(1);
    expect(newList.popLeft().getValue()).toBe(1);
    expect(newList.getHead().getValue()).toBe(2);

    // pop() tests
    expect(newList.getTail().getValue()).toBe(6);
    expect(newList.pop().getValue()).toBe(6);
    expect(newList.getTail().getValue()).toBe(5);
    expect(newList.getLength()).toBe(4);
    
    // insertNode() tests
    newList.insertNode(LinkedNode(0));
    expect(newList.getHead().getValue()).toBe(0);
    expect(newList.getLength()).toBe(5);

    // swapNodes() tests
    // swap head and tail
    expect(newList.swapNodes(newList.getHead(), newList.getTail())).toBe(true);
    expect(newList.getHead().getValue()).toBe(5);
    expect(newList.getTail().getValue()).toBe(0);

    // swap two adjacent nodes
    newList = IndexedLinkedList();
    let node1 = LinkedNode(0);
    let node2 = LinkedNode(1);
    newList.appendNode(node1);
    newList.appendNode(node2);

    // First swap of two adjacent nodes
    expect(newList.getHead().getValue()).toBe(0);
    expect(newList.getTail().getValue()).toBe(1);
    expect(newList.swapNodes(node1, node2)).toBe(true);
    expect(newList.getHead().getValue()).toBe(1);
    expect(newList.getTail().getValue()).toBe(0);
    expect(node1.getPrevious()).toBe(node2);
    expect(node1.getNext()).toBeUndefined();
    expect(node2.getPrevious()).toBeUndefined();
    expect(node2.getNext()).toBe(node1);
    
    // Second swap of two adjacent nodes
    // at this point node2 is tail and node1 is head
    // node2 <-> node1
    expect(newList.swapNodes(node1, node2)).toBe(true);
    expect(newList.getHead()).toBe(node1);
    expect(newList.getTail()).toBe(node2);
    expect(node1.getPrevious()).toBeUndefined();
    expect(node1.getNext()).toBe(node2);
    expect(node2.getPrevious()).toBe(node1);
    expect(node2.getNext()).toBeUndefined();

});