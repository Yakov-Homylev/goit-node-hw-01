const fs = require('fs/promises')
const path = require('path')

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json')

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    console.table(contacts)
    console.log('Список контактов');
    return contacts
  }
  
async function getContactById(id) {
    const contactsList = await fs.readFile(contactsPath, 'utf-8')
    const findContact = JSON.parse(contactsList).find(contact => contact.id === id.toString())
    if (!findContact) {
        console.log(`ID - ${id} не найден`);
        return null
    }
    console.log(findContact, 'Найденный контакт по id');
    return findContact
}

async function removeContact(id) {
    const contactsList = await fs.readFile(contactsPath, 'utf-8')
    const newContactsList = JSON.parse(contactsList).filter(contact => contact.id !== id.toString())
    if (JSON.parse(contactsList).length === newContactsList.length) {
        console.log(`ID - ${id}  не найден`);
        return null
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    const newList = await fs.readFile(contactsPath, 'utf-8')
    const deletedContact = JSON.parse(contactsList).find(contact => contact.id === id.toString())
    console.log(deletedContact, 'Удаленный контакт');
    console.table(newList)
    console.log('Новый список контактов');
    return newList
}
  
async function addContact(name, email, phone) {
    const contactsList = await fs.readFile(contactsPath, 'utf-8')
    const parsedContacts = JSON.parse(contactsList)
    const newContactsList = JSON.stringify([...parsedContacts, {name, email, phone, id: uuidv4()}])
    await fs.writeFile(contactsPath, newContactsList)
    const writedList = await fs.readFile(contactsPath, 'utf-8')
    console.table(writedList);
    console.log('Новый список контактов');
    return writedList
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}