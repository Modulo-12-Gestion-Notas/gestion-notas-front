import "./Modal.css"

export default function ModalContent({ onClose }) {
    return (
        <div className="modal">
            <div>Hola soy una ventana
            </div>
            
            <div className="closeContainer">
                <button onClick={onClose} className="closeButton">X</button>
            </div>

        </div>
    );
}