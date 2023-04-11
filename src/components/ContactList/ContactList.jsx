import PropTypes from 'prop-types'; // типізація
import css from './ContactList.module.css'; // стилізація

// Компонент зі списком контактів.
// contacts - масив, delContact - функція
export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.list}>

      {/* Проходження по кожному контакту та повернення нового масиву з елементами списку */}
      {contacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span className={css.number}> {contact.number}</span>
            <button
              className={css.button}
              type="button"

              // Виклик функції для видалення контакту
              onClick={() => {
                delContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

// Типізація
ContactList.propTypes = {
  delContact: PropTypes.func.isRequired, // функція
  contacts:PropTypes.array.isRequired // масив
};

// Діма Берестень

