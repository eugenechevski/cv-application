import { CardContainer } from "Components/selection-menu/CardContainer";
import Modal from "Components/selection-menu/Modal";

const SelectionMenu = (props: any) => {
  const { updateScene } = props;

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer updateScene={updateScene}></CardContainer>
      <Modal></Modal>
    </div>
  );
};

export default SelectionMenu;
