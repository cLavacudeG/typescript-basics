type ContactName2 = string;
type ContactStatus2 = "active" | "inactive" | "new"; // Alternatives to enum
type ContactBirthDate = Date | number | string; // OR types

interface Contact2 {
  id: number;
  name: ContactName;
  birthDate?: ContactBirthDate;
  status?: ContactStatus2;
}

interface Address2 {
  line1: string;
  line2: string;
  province: string;
  region: string;
  postalCode: string;
}

type AddressableContact = Contact & Address2; // Combined types

function getBirthDate(contact: Contact2) {
  if (typeof contact.birthDate === "number") {
    return new Date(contact.birthDate);
  } else if (typeof contact.birthDate === "string") {
    return Date.parse(contact.birthDate);
  } else {
    return contact.birthDate;
  }
}

let primaryContact2: Contact2 = {
  id: 12345,
  name: "Jamie Johnson",
  status: "active",
};

// Keyof operator

type ContactFields = keyof Contact2;

const field: ContactFields = "status";

function getValue<T>(source: T, propertyName: keyof T) {
  return source[propertyName];
}

function getValueRestricted<T, U extends keyof T>(source: T, propertyName: U) {
  return source[propertyName];
}

const value = getValue(primaryContact, "status");

const value2 = getValue({ min: 2, max: 10 }, "max");

// Typeof operator
function toContact(nameOrContact: string | Contact2): Contact2 {
  if (typeof nameOrContact === "object") {
    return {
      id: nameOrContact.id,
      name: nameOrContact.name,
      status: nameOrContact.status,
    };
  } else {
    return {
      id: 0,
      name: nameOrContact,
      status: "active",
    };
  }
}

// Indexes access types

type nameFromContact = Contact2["name"];

interface ContactEvent {
  contactId: Contact2["id"];
}

interface ContactDeletedEvent extends ContactEvent { }

interface ContactStatusChangedEvent extends ContactEvent {
  oldStatus: Contact2["status"];
  newStatus: Contact2["status"];
}

interface ContactEvents {
  deleted: ContactDeletedEvent;
  statusChanged: ContactStatusChangedEvent;
  // ... and so on
}

function handleEvent<T extends keyof ContactEvents>(
  eventName: T,
  handler: (evt: ContactEvents[T]) => void,
) {
  if (eventName === "statusChanged") {
    handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" });
  }
}

handleEvent("statusChanged", (evt) => evt);

// Records: Creating dynamic but limited types
// Record: <properties, types>

let x: Record<string, string | number | boolean | Function> = {
  name: "Wruce Bayne",
};
x.number = 1234;
x.active = true;
x.log = () => console.log("awesome!");

// interface Query {
//   sort?: "asc" | "desc";
//   matches(val: any): boolean;
// }
//
// Generic Query

interface Query<TypeProperty> {
  sort?: "asc" | "desc";
  matches(val: TypeProperty): boolean;
}

// Partial creates a new type with all optional properties
// Omit ignores a propertie of the type
// type ContactQuery = Omit<Partial<Record<keyof Contact, Query>>, "birthday">;

// Pick choose only some of the parameters
// type ContactQuery = Partial<Pick<Record<keyof Contact, Query>, "id" | "name">>;

// Required
// type RequiredContactQuery = Required<ContactQuery>;

// Mapped type definition
type ContactQuery = {
  [TypeProperty in keyof Contact]?: Query<Contact[TypeProperty]>;
};

function searchContacts(contacts: Contact[], query: ContactQuery) {
  return contacts.filter((contact) => {
    for (const property of Object.keys(contact) as (keyof Contact)[]) {
      // get the query object for this property
      const propertyQuery = query[property] as Query<Contact[keyof Contact]>;
      // check to see if it matches
      if (propertyQuery && propertyQuery.matches(contact[property])) {
        return true;
      }
    }

    return false;
  });
}

const filteredContacts = searchContacts(
  [
    /* contacts */
  ],
  {
    id: { matches: (id) => id === 123 },
    name: { matches: (name) => name === "Carol Weaver" },
  },
);
