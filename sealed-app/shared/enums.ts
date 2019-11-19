
export enum RegistrationType {
    Client = "Personal",
    Lawyer = "Third Party"
}


export enum Gender {
  MALE = "Male",
  FEMALE = "Female"
}

export enum MARITAL_STATUS {
  SINGLE = "Single",
  MARRIED = "Married",
  DIVORCED = "Divorced",
}
export enum CompanyType {
    BUSINESS_NAME = "BUSINESS NAME",
    LIMITED_BY_SHARES = "LIMITED BY SHARES",
    LIMITED_BY_GURANTEE = "LIMITED BY GURANTEE",
    UNLIMITED = "UNLIMITED",
}

export enum IDType {
  NATIONAL_ID = "National ID",
  DRIVERS_LICENSE = "Driver's License",
  PASSPORT = "International Passport",
}

export enum CacRequestStatus {
  REQUESTED = 0,
  NAME_APPROVAL,
  FILING_PROCESS,
  QUERY,
  COMPLETED,
  DISPATCHED
}

export enum WillRequestStatus {
  REQUESTED = 0,
  VIDEO_UPLOAD,
  DISPATCHED
}

export enum GiftType {
  CASH = "CASH",
  ASSET = "ASSET",
  VEHICLE ="VEHICLE",
  OTHERS = "OTHERS"
}
export enum BeneficiaryType {
  PERSON  = "PERSON",
  CHARITY = "CHARITY",
}

export enum Relationship {
  WIFE = "Wife",
  SON = "Son",
  DAUGHTER = "Daughter",
  BROTHER = "Brother",
  SISTER = "Sister",
  MOTHER = "Mother",
  FATHER = "Father",
  STEP_SON = "Step-Son",
  STEP_DAUGTHER = "Step-Daughter",
  FAMILY_MEMBER = "Family-Member",
  FRIEND = "Friend",
  Others = "Others"

}

