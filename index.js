import fetch from "node-fetch";

const profgroupID = "676";
const SES_taalid = 146;

async function fetchOrganizations() {
  const response = await fetch(
    "https://live-core.pe-online.org/public/PEapi_PointsOfInterest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profgroupID,
        SES_taalid,
        SES_defaulttaalid: 1,
        SES_rol: "",
        SES_personid: null,
        SES_bergrpid: null,
        SES_orgid: null,
        SES_extorgid: null,
        SES_Subrollen: "",
      }),
    }
  );

  const data = await response.json();

  const organizations = data.ds.data0;

  return organizations;
}

async function fetchOrganizationDetails(id) {
  const response = await fetch(
    "https://live-core.pe-online.org/public/PEapi_PointsOfInterest_Info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poiIDs: [id],
        profgroupID,
        SES_taalid,
        SES_defaulttaalid: 1,
        SES_rol: "",
        SES_personid: null,
        SES_bergrpid: null,
        SES_orgid: null,
        SES_extorgid: null,
        SES_Subrollen: "",
      }),
    }
  );

  const data = await response.json();

  const details = data.ds.data0[0];

  return details;
}

async function fetchAdvisors(id) {
  const response = await fetch(
    "https://live-core.pe-online.org/public/PEapi_PointsOfInterest_Profs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poiID: id,
        profgroupID,
        SES_taalid,
        SES_defaulttaalid: 1,
        SES_rol: "",
        SES_personid: null,
        SES_bergrpid: null,
        SES_orgid: null,
        SES_extorgid: null,
        SES_Subrollen: "",
      }),
    }
  );

  const data = await response.json();

  const advisors = data.ds.data0;

  return advisors;
}

async function fetchAllData() {
  let organizations = await fetchOrganizations();

  let testing = false;
  if (testing) {
    // take first 5 organizations for testing
    organizations = organizations.slice(0, 5);
  }

  // iterate over organizations and fetch all the advisor data and add it to the organization object
  for (const organization of organizations) {
    console.info(`Fetching data for ${organization.tblPointOfInterestName}`);
    const organizationDetails = await fetchOrganizationDetails(
      organization.tblPointOfInterestID
    );
    organization.details = organizationDetails;
    console.info(
      `Done fetching details: ${organization.details.tblPointOfInterestWebsite}`
    );
    const advisors = await fetchAdvisors(organization.tblPointOfInterestID);
    organization.advisors = advisors;
    console.info(`Done fetching advisors: ${organization.advisors.length}`);
    console.info(
      `Done fetching data for ${organization.tblPointOfInterestName}`
    );
  }

  return organizations;
}

fetchAllData()
  .then((data) => {
    const json = JSON.stringify(data, null, 2);
    const fs = require("fs");
    fs.writeFileSync("organizations.json", json);
  })
  .catch((error) => {
    console.error(error);
  });
