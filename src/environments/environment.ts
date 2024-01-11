// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const env: string = 'prod';
const baseUrl: string = `https://depp-billing-api-qa1.homeprotection-dev.nrgdigitalawscloud.com/`;
const custumerPortalUrl: string = `https://account.hwahomewarranty.com`;
const realtorPortalUrl: string = `https://realtor.hwahomewarranty.com`;
export const environment = {
  aspirePhase4releaseDate: '10-21-2021',
  production: true,
  analytics: {
    google: {
      brand: {
        hwa: 'GTM-N739Z7C'
      }
    }
  },
  core: {
    maintenance: {
      active: false,
      endDateMonth: '',
      endDateDay: '',
      endDateYear: '',
      title: 'Website under maintenance...',
      email: 'info@hwahomewarranty.com',
      firstSentence: `We are currently updating our site to give you a better experience. Our systems will be back online`,
      secondSentence: 'We apologize for any inconvenience.',
      thirdSentence: 'In the meantime, if you need to reach us, please call 1.888.492.7359 or email us at'
    },
    brandId: 'DEPP',
    brandFriendlyName: 'DEPP',
    copyrightNotice: `&copy; 2022 Direct Energy:`,
    pageTitle: 'Direct Energy Protection Plans - Billing Portal',
    customerServiceNumber: '1-855-334-3577',
    email: 'service@nrgprotects.com',
    achEmail: 'Info@hwahomewarranty.com',
    noHistoryMessage: 'There are no payments for the selected timeframe.',
    idleTimeout: { timeoutSeconds: 870 },
  },
  auth: {
    forgotPassword: {
      userNotFound:
        `Apologies, we cant find a username under that email address. Please check the email address used to create online account. ' +
        'For further assistance, You can call (855) 334-3577`,
      success:
        'We have sent you a password reset link to the email address on file. If it does not arrive in the next 10 minutes - please check your spam folder. ' +
        'For further assistance, You can call (855) 334-3577'
    },
    loginError:
      `We apologize you are having difficulty logging into our portal. Please try again or select the 'Forgot your Password?' link below to reset. For further assistance, please call (855) 334-3577.`,
    lockedError:
      `Your account is locked after multiple attempts. Please select the 'Forgot your Password?' link below to reset your password and unlock your account. For further assistance, please call (855) 334-3577.`
  },
  forms: {
    ach_form_path: '../assets/forms/centrica_vendor_Information_form.pdf'
  },
  siblingPortals: {
    customer: `${custumerPortalUrl}`,
  },
  legalTerms: {
    termsOfUse: 'https://nrgp-customer-elearning-prod.s3.amazonaws.com/NRGP_TEMP_CSTC_CvgSmryTnCs_2022.05.01.pdf',
    privacyPolicy: 'https://nrgp-customer-elearning-prod.s3.amazonaws.com/NRG+Protects+Policy_June+2022_clean.pdf'
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
  helpUrl: `${baseUrl}contact-us`,
  cognito: {
    loginURL: 'https://cognito-idp.us-east-1.amazonaws.com/',
    clientId: '1dqk3e9jtk8euo3574q3oi9k0d',
    authFlow: 'USER_PASSWORD_AUTH',
    // Configcat

  },
  configcat: {
    key: 'o3_aCPwOlUOJ0ST5qznskQ/ulyGF3MlI0u81lFK8oAJxg',
    maintenance: 'ENABLE_MAINTENANCE_MODE__DEPP_BILL'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
