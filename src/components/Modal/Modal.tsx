import ReactDom from "react-dom";
import { useRef } from "react";
import "./modal.scss";

const Modal = ({ children, isOpen, onClose }: any) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <div className="overlay" onClick={handleClick}>
      <div className="modal" ref={modalRef}>
        <span className="close-btn" onClick={onClose}>X</span>
        {children}
      </div>
    </div>, document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
