const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  try {
    const data = await fs.readFile(contactsPath);

    // const txt = readResult.toString();
    const contacts = JSON.parse(data);

    return contacts;

    // const dir = "db";
    // const listDirContent = await fs.readdir(dir);
    // const dirStat = await fs.lstat(dir);
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);

    const contact = contacts.find((el) => el.id === contactId);

    return contact || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту
  try {
    const contactsPath = path.join("db", "contacts.json");

    const contacts = JSON.parse(data);

    const index = contacts.findIndex((el) => el.id === contactId);

    if (index !== -1) {
      const [removedContact] = contacts.splice(index, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);

    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
