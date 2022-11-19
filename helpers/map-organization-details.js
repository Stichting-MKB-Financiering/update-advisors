export function mapOrganizationDetails(organization) {
  // map the organization details to a new object with meaningful properties
  /**
     * {
        "tblPointOfInterestID": 6358,
        "tblPointOfInterestName": "Credion Almelo",
        "tblPointOfInterestStreet": "Brugstraat",
        "tblPointOfInterestNumber": 9,
        "tblPointOfInterestNumberAddition": "13",
        "tblPointOfInterestPostalCode": "7607XJ",
        "tblPointOfInterestCity": "Almelo",
        "country": "Nederland",
        "tblPointOfInterestTelephone": "0546 24 11 25",
        "tblPointOfInterestWebsite": "http://www.credion.nl/almelo",
        "tblPointOfInterestEmail": "almelo@credion.nl"
      }
     */

  return {
    id: organization.tblPointOfInterestID,
    name: organization.tblPointOfInterestName,
    street: organization.tblPointOfInterestStreet,
    number: organization.tblPointOfInterestNumber,
    numberAddition: organization.tblPointOfInterestNumberAddition,
    postalCode: organization.tblPointOfInterestPostalCode,
    city: organization.tblPointOfInterestCity,
    country: organization.country,
    telephone: organization.tblPointOfInterestTelephone,
    website: organization.tblPointOfInterestWebsite,
    email: organization.tblPointOfInterestEmail,
  };
}
