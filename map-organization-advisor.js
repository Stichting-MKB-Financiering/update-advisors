export function mapOrganizationAdvisor(organizationAdvisor) {
  return {
    name: organizationAdvisor.tblPersonName,
    id: organizationAdvisor.tblPersonID,
  };
}
