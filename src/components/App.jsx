import { Component } from 'react';
import { nanoid } from 'nanoid'; // пакет для генерації ідентифікаторів
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css'; // стилізація

const CONTACTS = 'contacts'; // ключ для localStorage

// початковий масив контактів
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // метод життєвого циклу, який викликається один раз після того, як компонент був змонтований
  componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS); // отримуємо дані з localStorage

    // якщо контакти є, то парсимо і записуємо в стейт
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: initialContacts }); // якщо немає, то записуємо початковий масив
    }
  }

  // Метод життєвого циклу, який викликається після оновлення стейту.
  // _ цей перший аргумент не використовується в коді.
  componentDidUpdate(_, prevState) {
    // якщо контакти змінились, то записуємо їх в localStorage
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        CONTACTS,
        JSON.stringify(this.state.contacts) // перетворюємо масив в JSON
      );
    }
  }

  // метод для зміни значення поля вводу
  onChangeInput = evt => {
    // при зміні вмісту поля вводу, метод отримує name та value і записує їх в стейт
    const { name, value } = evt.currentTarget;

    // встановлюємо новий стан компонента
    this.setState({ [name]: value });
  };

  // додавання нового контакту у список контактів
  addContact = ({ name, number }) => {
    // перевіряємо чи є такий контакт в списку
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      // якщо контакт існує, то показувати повідомлення
      alert(`${name} is alredy in contacts`);
    } else {
      // додавання нового контакту до списку контактів
      this.setState(oldState => {
        const list = [...oldState.contacts]; // копія всіх елементів списку контактів зі старого стану

        // додавання нового об'єкту контакту до масиву list
        list.push({
          id: nanoid(), // генерація унікального ідентифікатора
          name: name,
          number: number,
        });
        return { contacts: list }; // повертаємо новий стан
      });
    }
  };

  // фільтрація списку контактів за введеним користувачем рядком пошуку
  filter = () => {
    const { contacts, filter } = this.state; // деструктуризація стейту

    // новий масив, який містить всі контакти, що містять рядок пошуку
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  // отримання параметру id, який потрібно видалити зі списку контактів
  delContact = id => {
    // отримання поточного списку контактів зі стану компонента
    const { contacts } = this.state;

    // Новий масив, який містить всі контакти, крім того, що має ідентифікатор
    const filtred = contacts.filter(item => item.id !== id);

    // встановлення нового стану компонента
    this.setState({ contacts: filtred });
  };

  render() {
    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>

        {/* передача пропсів в компоненти */}
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>

        {/* фільтр, який зберігається в стані + функція, яка оновлює значення фільтра */}
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />

        {/* функція для видалення контакту + масив контактів, який фільтрується залежно від значення фільтра */}
        <ContactList delContact={this.delContact} contacts={this.filter()} />
      </div>
    );
  }
}
