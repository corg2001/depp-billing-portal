// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const env: string = 'prod';
const baseUrl: string = `https://billing-api-stage.directenergyprotects.com/`;
const custumerPortalUrl: string = `https://account.hwahomewarranty.com`;
const customerApisBaseUri = `https://svcsapimt11.nrgenergy.com/CustomerApis/v1/`;
const vendorApisBaseUri = `https://svcsapimt11.nrgenergy.com/VendorApis/v1/`;
const lambdaBaseUrl = 'https://portal-api-stage.nrgprotects.com/';

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
      `Your account is locked after multiple attempts. Please select the 'Forgot your Password?' link below to reset your password and unlock your account. For further assistance, please call (855) 334-3577.`,
    passwordResetRequiredExceptionError: "You haven't logged in sometime now, please reset your password using reset password link.For further assistance, call us at (855) 334-3577."
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
  configcat: {
    key: 'o3_aCPwOlUOJ0ST5qznskQ/XEBEi0LKzUu15ZS4jhrSkw',
    maintenance: 'ENABLE_MAINTENANCE_MODE__DEPP_BILL',
    maintenanceContent: 'UNIFY_MAINTENANCE_CONTENT',
    dynatrace: 'DEPP_BILLING_DYNATRACE_SRC'
  },
  // auth service
  loginUrl: `${baseUrl}authentication/passport/login`,
  requestPasswordUrl: `${lambdaBaseUrl}authentication/forgot-password`,
  resetPasswordUrl: `${lambdaBaseUrl}authentication/reset-password`,
  termsAndConditionsUrl: `${baseUrl}services/legal-terms/terms-of-use`,
  privacyPolicyUrl: `${baseUrl}services/legal-terms/privacy-policy`,

  // EnrollService
  enrollUrl: `${baseUrl}lead-generation`,

  // PartyService
  partyDetailsUrl: `${customerApisBaseUri}GetPartyDetails`,
  // ClaimService
  claimsUrl: `${vendorApisBaseUri}GetVendorPurchaseOrders`,
  authInoviceUrl: `${baseUrl}services/vendor/geturl`,
  submitDiagnosisUrl: `${baseUrl}services/vendor/contractor-form`,

  // ProfileService
  achDocsUrl: `${vendorApisBaseUri}GetVendorACHInfo`,

  // AgreedRatesService
  agreedRatesUrl: `${vendorApisBaseUri}GetVendorAgreedRate`,

  // ServiceAreasService
  serviceAreasUrl: `${vendorApisBaseUri}GetVendorServiceAreasDetails`,

  // PaymentServoce
  payementHistoryUrl: `${vendorApisBaseUri}GetVendorPaymentsHistory`,
  // InvoiceService
  invoicesUrl: `${vendorApisBaseUri}GetVendorInvoices`,

  // uploadService
  uploadUrl: `${vendorApisBaseUri}UploadFile`,

  // CalenderService
  calenderUrl: `${vendorApisBaseUri}GetVendorWorkCalendar`,
  // HelpService
  helpUrl: `${baseUrl}contact-us`,
  cognito: {
    loginURL: 'https://cognito-idp.us-east-1.amazonaws.com/',
    clientId: '57g48jmb8rm3jm7cdmi9cbl6c8',
    authFlow: 'USER_PASSWORD_AUTH'
  },
  subscriptionkeys: {
    customerapis: 'c9e462cbd29c4c2685e3f33507c9b240',
    vendorapis: 'a5268d8496e44401ae2f3aa279f61349',
    unauthenrollmentapis: '1d4de43fbabf439a9b3a12f0c96fbb45'
  },
    dynatrace: 'https://js-cdn.dynatrace.com/jstag/16362cc0dec/bf94493cun/bf6dc7c44e529182_complete.js'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
