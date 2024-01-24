import { ModalName } from "../../../../utils/context/modal/types/modal.types";
import CarModalModal from "../../../modal/car-modal";

export const renderModal = (name: ModalName | null, props: any) => {
    switch (name) {
        case 'CAR_MODEL':
            return <CarModalModal {...props} />;
        default:
            return null;
    }
}