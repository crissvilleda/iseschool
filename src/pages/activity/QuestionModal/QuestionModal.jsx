import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./questionModal.css";
import QuestionForm from "./QuestionForm";

export default function QuestionModal({ isVisible, setVisible, onSubmit }) {
  return (
    <>
      <Modal
        classNames={{ modal: "questionModal" }}
        center
        open={isVisible}
        onClose={() => setVisible(false)}
        closeOnOverlayClick={false}
        focusTrapped={false}
        styles={{ modalContainer: { overflowY: "hidden", maxHeight: "100vh" } }}
      >
        <QuestionForm onSubmit={onSubmit} onCancel={() => setVisible(false)} />
        <br />
      </Modal>
    </>
  );
}
