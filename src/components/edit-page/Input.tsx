const Input = (props: any) => {
    const { state, updateState } = props;

    return (
        <input type="text" name="" id="" value={state} onChange={(e: any) => updateState(e.target.value)}/>
    );
};

export default Input;