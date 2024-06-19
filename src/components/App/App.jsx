import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

const LocalKey = 'Contacts';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    let contactsLS = [];

    if (localStorage.getItem(LocalKey)){
      contactsLS = JSON.parse(localStorage.getItem(LocalKey));
    }
    if (contactsLS.length !== 0){
      this.setState({contacts: [...contactsLS]})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(prevState.contacts !== this.state.contacts){
      const contactsJSON = JSON.stringify(this.state.contacts);
      localStorage.setItem(LocalKey, contactsJSON);
    }
  }
  addContact = (contact, number) => {
    let prevContacts = this.state.contacts.map(({ name }) =>
      name.toLocaleLowerCase()
    );
    let bool = prevContacts.includes(contact.toLocaleLowerCase());
    if (bool) {
      alert(`${contact} is already in contacts`);
      return;
    }
    const obj = {
      id: nanoid(),
      name: contact,
      number: number,
    };

    this.setState(prevState => {
      prevState.contacts.push(obj);
      return { contacts: [...prevState.contacts] };
    });
  };
  filter = evt => {
    const filterValue = evt.target.value;
    this.setState({ filter: filterValue.toLocaleLowerCase() });
  };

  delete = id => {
    this.setState(prevState => {
      let x = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: [...x] };
    });
  };

  render() {
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(this.state.filter)
    );
    return (
      <PhoneBookStyled>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.filter} />
        <ContactList contacts={filterContacts} onDelete={this.delete} />
      </PhoneBookStyled>
    );
  }
}
export const App = () => {
  return (
      <PhoneBook />
  );
};

PhoneBook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
}