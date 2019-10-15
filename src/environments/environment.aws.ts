// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const env: string = 'qa7';
const baseUrl: string = `https://hwa-realtor-api-${env}.nahdigitalitdev.cloud.centricaplc.com/`;
const custumerPortalUrl: string = `https://hwa-customer-${env}.nahdigitalitdev.cloud.centricaplc.com`;
const realtorPortalUrl: string = `https://hwa-realtor-${env}.nahdigitalitdev.cloud.centricaplc.com/`;
export const environment = {
  production: false,
  name: 'aws',
  core: {
    brandId: 'HWA',
    brandFriendlyName: 'HWA',
    copyrightNotice: '&copy; 2017 HOME WARRANTY OF AMERICA. Inc. Home Warranty Information:',
    pageTitle: 'HWA - Home Warranty of America',
    customerServiceNumber: '1-888-888-8888',
    email: 'Contractorrelations@mailinator.com',
    achEmail: 'VendorMaster@mailinator.com',
  },
  siblingPortals: {
    customer: `${custumerPortalUrl}`,
    realtor: `${realtorPortalUrl}`
  },
  // auth service
  loginUrl: `${baseUrl}authentication/passport/login`,
  requestPasswordUrl: `${baseUrl}authentication/passport/forgot-password`,
  resetPasswordUrl: `${baseUrl}authentication/passport/reset-password`,
  termsAndConditionsUrl: `${baseUrl}services/legal-terms/terms-of-use`,
  privacyPolicyUrl: `${baseUrl}services/legal-terms/privacy-policy`,

  // EnrollService
  enrollUrl: `${baseUrl}lead-generation`,

  // PartyService
  partyDetailsUrl: `${baseUrl}services/party`,
  // ClaimService
  claimsUrl: `${baseUrl}services/vendor/purchase-orders`,
  authInoviceUrl: `${baseUrl}services/vendor/geturl`,

  // ProfileService
  achDocsUrl: `${baseUrl}services/vendor/ach-info`,

  // AgreedRatesService
  agreedRatesUrl: `${baseUrl}services/vendor/agreed-rate`,

  // ServiceAreasService
  serviceAreasUrl: `${baseUrl}services/vendor/service-areas`,

  // PaymentServoce
  payementHistoryUrl: `${baseUrl}services/vendor/payments-history`,
  // InvoiceService
  invoicesUrl: `${baseUrl}services/vendor/invoices`,

  // uploadService
  uploadUrl: `${baseUrl}services/vendor/document-upload`,

  // CalenderService 
  calenderUrl: `${baseUrl}services/vendor/work-calendar`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
