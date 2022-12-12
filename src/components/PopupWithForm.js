
function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, ...props }) {

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
        onClose();

    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>

                <form className={`edit-form edit-form_type_${name}`} name={name} onSubmit={handleSubmit} noValidate>
                    {props.children}
                    <button className="save-button" type="submit">{buttonText}</button>
                </form>
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
            </div>
        </div>

        // <div className="popup popup_type_delete-confirm">
        //     <div className="popup__container">
        //         <h2 className="popup__title">Вы уверены?</h2>
        //         <button className="save-button" type="submit">Да</button>
        //         <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        //     </div>
        // </div>
        //

    )
}

export default PopupWithForm;