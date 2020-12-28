import { AffiliationCollege } from './affiliation-college.model';
import { LetterReceiver } from './letter-receiver.model';
import { PostalAddress } from './postal-address.model';
export class Letter {
  id: number;
  wardNo: number;

  print: boolean;
  // lastBillEdit: boolean;
  addNewBill: boolean;
  photoBillChange: boolean;
  photoOptionChange: boolean;
  photoLicenceChange: boolean;

  regNo: string;
  status: string;
  address: string;
  address1: string;
  address2: string;
  address3: string;

  dob: string;
  email: string;
  expDate: string;
  issueDate: string;
  mobileNo: string;
  name: string;
  photoBill: string;
  photoLicence: string;
  photoOption: string;
  collegeAddress: string;
  collegeName: string;
  university: string;

  postalAddress: PostalAddress;
  letterReceiver: LetterReceiver;
  affiliationCollege: AffiliationCollege;

  requestList: [];
}
