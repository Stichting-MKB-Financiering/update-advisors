import { mapOrganizationAdvisor } from "./map-organization-advisor";
import { mapOrganizationDetails } from "./map-organization-details";

export function mapOrganizationToMarker(organization) {
  return {
    id: organization.tblPointOfInterestID,
    name: organization.tblPointOfInterestName,
    lat: organization.tblPointOfInterestCoordinateRetrievedLat,
    lng: organization.tblPointOfInterestCoordinateRetrievedLong,
    details: mapOrganizationDetails(organization.details),
    advisors: organization.advisors.map(mapOrganizationAdvisor),
  };
}
