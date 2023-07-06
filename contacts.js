const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = contacts.find((el) => el.id === contactId);

    return contact || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
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

module.exports = { listContacts, getContactById, removeContact, addContact };
