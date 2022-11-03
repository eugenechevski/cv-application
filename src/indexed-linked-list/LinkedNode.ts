import uniqid from 'uniqid';

export default function LinkedNode<T>(value?: T, prev?: LinkedNode<T>, next?: LinkedNode<T>): LinkedNode<T> {
    var thisId = uniqid();
    var thisValue = value;
    var thisPrev = prev;
    var thisNext = next;

    function getId(): string {
        return thisId;
    }

    function getValue(): T {
        return thisValue;
    }

    function setValue(newValue: T): void {
        thisValue = newValue;
    }

    function getPrevious(): LinkedNode<T> {
        return thisPrev;
    }

    function setPrevious(newPrevious: LinkedNode<T>): void {
        thisPrev = newPrevious;
    }

    function getNext(): LinkedNode<T> {
        return thisNext;
    }

    function setNext(newNext: LinkedNode<T>): void {
        thisNext = newNext;
    }

    return {
        getId,
        getValue,
        setValue,
        getPrevious,
        setPrevious,
        getNext,
        setNext,
    }
}