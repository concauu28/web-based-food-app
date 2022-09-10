import React, { Fragment } from "react";
import * as ReactDOM from "react-dom";
import "./Modal.css";
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};
const portalel = document.getElementById("overlays");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClick} />, portalel)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalel
      )}
    </Fragment>
  );
}

export default Modal;
