// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as moment from 'moment';
const env: string = 'qa7';
const baseUrl: string = `https://unify-hwa-contractor-api-${env}.engine.host/`;
const custumerPortalUrl: string = `https://unify-hwa-portal-${env}.engine.host`;
const realtorPortalUrl: string = `https://unify-hwa-realtor-portal-${env}.engine.host`;
export const environment = {
  production: false,
  analytics: {
    google: {
      brand: {
        hwa: ''
      }
    }
  },
  core: {
    brandId: 'HWA',
    brandFriendlyName: 'HWA',
    copyrightNotice: `&copy; ${ moment().format('YYYY')} HOME WARRANTY OF AMERICA. Inc. Home Warranty Information:`,
    pageTitle: 'HWA - Home Warranty of America',
    customerServiceNumber: '1-888-888-8888',
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
  calenderUrl: `${baseUrl}services/vendor/work-calendar`,
  // HelpService
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
