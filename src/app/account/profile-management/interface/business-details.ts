export interface BusinessDetails {
    accountNumber:string,
    taxID:string,
    owner:string,
    companyName:string,
    emailAddress:string,
    phoneNumber:string,
    additionalContact:string,
    additionalContactPhone:string,
    businessAddress:string,
    maillingAddress:string,
    hwaContactInfo:HWAContactInfo,
    userInfo:UserInFo
  }
  export interface UserInFo{
    userName:string,
    passWord:string
  }
  export interface HWAContactInfo{
    territoryManager:string,
    contactPhone:string,
    email:string
  }