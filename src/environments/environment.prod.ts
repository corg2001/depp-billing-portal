import * as moment from 'moment';
const env: string = 'qa3';
const baseUrl: string = `https://billing-api.directenergyprotects.com/`;
const custumerPortalUrl: string = `https://depp-portal-${env}.digitaltest.directenergy.net/`;
export const environment = {
  aspirePhase4releaseDate: '10-21-2021',
  production: true,
  analytics: {
    google: {
      brand: {
        hwa: 'GTM-TS63H5R'
      }
    }
  },
  core: {
    brandId: 'DEPP',
    brandFriendlyName: 'DEPP',
    copyrightNotice: `&copy; ${moment().format('YYYY')} HOME WARRANTY OF AMERICA. Inc. Home Warranty Information:`,
    pageTitle: 'DEPP -Direct Energy Protection Plans',
    customerServiceNumber: '1-888-492-7359',
    email: 'Contractorrelations@mailinator.com',
    achEmail: 'VendorMaster@mailinator.com',
    noHistoryMessage: 'There are no payments for the selected timeframe.'
  },
  auth: {
    forgotPassword: {
      userNotFound: 'Apologies, we can’t find a username under that email address. Please check the email address used to create online account. ' +
      'For further assistance, You can call (855) 334-3577',
      success: 'We have sent you a password reset link to the email address on file.  If it does not arrive in the next 10 minutes - please check your spam folder. ' +
        'For further assistance, You can call (855) 334-3577'
    },
    loginError: 'We apologize you are having difficulty logging into our portal.  Please try again or select "Forgot Password" to reset.  For further assistance, you can email us at <a href="mailto:acctmgr@hwahomewarranty.com.com">acctmgr@hwahomewarranty.com.com</a>, or call (888) 492-7359 option 4 to direct over to our department.',
    lockedError: 'Your account is locked after multiple attempts. Please select “Forgot Password” to reset your password and unlock your account. For further assistance, email us at <a href="mailto:acctmgr@hwahomewarranty.com.com">acctmgr@hwahomewarranty.com.com</a>, or call (888) 492-7359 option 4.'
  },
  forms: {
    ach_form_path: '../assets/forms/centrica_vendor_Information_form.pdf'
  },
  siblingPortals: {
    customer: `${custumerPortalUrl}`,
  },
  legalTerms: {
    termsOfUse: 'https://www.directenergyprotects.com/terms-of-use',
    privacyPolicy: 'https://www.directenergyprotects.com/privacy-policy'
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
