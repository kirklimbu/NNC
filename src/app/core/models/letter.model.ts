import { AffiliationCollege } from './affiliation-college.model';
import { LetterReceicer } from './letter-receicer.model';
export class Letter {
  id: number;
  regNo: number;
  name: string;
  address: string;
  wardNo: number;
  collegeName: string;
  program: string;
  affiliate: string;
  photoLicence: string;
  photoLicenceChange: boolean;
  dob: string;
  issueDate: string;
  expDate: string;
  email: string;
  mobileNo: string;
  collegeAddress: string;

  photoBill: string;
  photoBillChange: boolean;
  status1: string;
  print1: boolean;
  letterReceiverId1: number;


  print2: boolean;

  address1: string;
  address2: string;
  address3: string;

  photoOption: string;
  lastBillEdit: boolean;

  affiliationCollege: AffiliationCollege;
  letterReceiver: LetterReceicer;

  postalAddress: LetterReceicer;
}
