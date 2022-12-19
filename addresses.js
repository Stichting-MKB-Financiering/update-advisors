import fs from "fs";

const organizations = JSON.parse(fs.readFileSync("organizations.json"));

const fields = [
  "tblPointOfInterestName",
  "tblPointOfInterestStreet",
  "tblPointOfInterestNumber",
  "tblPointOfInterestNumberAddition",
  "tblPointOfInterestPostalCode",
  "tblPointOfInterestCity",
  "country",
  "tblPointOfInterestTelephone",
  "tblPointOfInterestWebsite",
  "tblPointOfInterestEmail",
];

const addresses = organizations.map((item) => {
  const { details } = item;

  const address = fields
    .map((field) => {
      const value = details[field];
      if (value) {
        return `"${value}"`;
      }
      return value;
    })
    .join(", ");

  return address;
});

const headers = [
  "organisatie",
  "straat",
  "huisnummer",
  "toevoeging",
  "postcode",
  "plaats",
  "land",
  "telefoon",
  "website",
  "email",
]
  .join(", ")
  .replace(/([^,]+)/g, '"$1"');

addresses.unshift(headers);

fs.writeFileSync("addresses.csv", addresses.join("\n"));
