import ReactDom from "react-dom";
import "./modal.scss";

const Modal = ({ children, isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        {children}
      </div>
    </div>, document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
