// Interface that merge the columns of another
type ContactName = string; // Type aliases

// Enums

enum ContactStatus {
  Active = "active",
  Inactive = "inactive",
  New = "new",
}

interface Contact extends Address {
  id: number;
  name: ContactName; // Use oef type alias
  birthday?: Date;
  status: ContactStatus;
  method?(): string; // Interface that use methods
}

interface Address {
  street: string;
  city: string;
  state?: string;
  zip?: string;
}

let primaryContact: Contact;

primaryContact = {
  id: 1000,
  name: "Cristian",
  street: "123 Main St",
  city: "Anytown",
  status: ContactStatus.Active,
  method: () => "Hello",
};

// Typing functions
function clone(source: Contact): Contact {
  // return source;
  return Object.apply({}, source);
}

const a: Contact = primaryContact;
const b = clone(primaryContact);

// Meta types - Generic types

function cloneGeneric<T>(source: T): T {
  return Object.assign({}, source);
}

const dateRange = { start: new Date(), end: new Date() };
const dateRangeCopy = cloneGeneric(dateRange);
