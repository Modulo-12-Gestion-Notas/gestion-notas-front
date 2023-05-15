import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '../Modal/ModalContent';
import "./GroupButton.css"

export default function GroupButton(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)} className='groupButton'>
        Grupo {props.numeroGrupo}
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}