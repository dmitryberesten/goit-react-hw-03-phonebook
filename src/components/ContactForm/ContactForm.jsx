import { Component } from 'react'; // пакет для створення класових компонентів
import css from './ContactForm.module.css'; // стилізація
import PropTypes from 'prop-types'; // типізація

// компонент форми для додавання нового контакту
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // метод для очищення полів форми
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  // метод для зміни значення полей вводу
  onChangeInput = evt => {
    const { name, value } = evt.currentTarget; // розпаковка значення name та value з об'єкту події
    this.setState({ [name]: value }); // встановлення значення в стейт
  };

  render() {
    return (
      <>
        <form
          className={css.formstyle}

          // метод для збереження даних форми в стейт
          onSubmit={evt => {
            evt.preventDefault(); // відміна перезавантаження сторінки
            this.props.addContact(this.state); // додавання нового контакту в стейт
            this.resetForm();
          }}
        >
          <label className={css.label}>
            Name
            <br />
            <input
              className={css.input}
              onChange={this.onChangeInput} // метод для зміни значення полів вводу
              value={this.state.name} // встановлення поточного значення поля введення, яке зберігається в стані компоненту
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <br />
          <label htmlFor="">
            Number
            <br />
            <input
              className={css.input}
              onChange={this.onChangeInput} // метод для зміни значення полів вводу
              value={this.state.number} // встановлення поточного значення поля введення, яке зберігається в стані компоненту
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" 
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

// типізація пропсів
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired, // функція
};
