// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as moment from 'moment';
const env: string = 'qa2 ';
const baseUrl: string = `https://hwa-contractor-api-${env}.nahdigitalitdev.cloud.centricaplc.com/`;
const custumerPortalUrl: string = `https://hwa-customer-${env}.nahdigitalitdev.cloud.centricaplc.com`;
const realtorPortalUrl: string = `https://hwa-realtor-${env}.nahdigitalitdev.cloud.centricaplc.com/`;
export const environment = {
  production: false,
  analytics: {
    google: {
      brand: {
        hwa: 'UA-827840-1'
      }
    }
  },
  name: 'aws',
  core: {
    brandId: 'HWA',
    brandFriendlyName: 'HWA',
    opyrightNotice: `&copy; ${ moment().format('YYYY')} HOME WARRANTY OF AMERICA. Inc. Home Warranty Information:`,
    pageTitle: 'HWA - Home Warranty of America',
    customerServiceNumber: '1-888-492-7359',
    email: 'Contractorrelations@mailinator.com',
    achEmail: 'VendorMaster@mailinator.com',
    noHistoryMessage: 'Greetings, we are working to bring your historical invoice & payment information in the following week.'
  },
  forms: {
    ach_form_path: '../assets/forms/centrica_vendor_Information_form.pdf'
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
  partyDetails: `${baseUrl}party/`,

  // PartyService
  partyDetailsUrl: `${baseUrl}services/party`,
  // ClaimService
  claimsUrl: `${baseUrl}services/vendor/purchase-orders`,
  authInoviceUrl: `${baseUrl}services/vendor/geturl`,
  submitDiagnosisUrl: `${baseUrl}services/vendor/contractor-form`,

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
  calenderUrl: `${baseUrl}services/vendor/work-calendar`,
  // helpService
  helpUrl: `${baseUrl}contact-us`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
