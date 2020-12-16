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
  photoBill: string;
  photoBillChange: boolean;
  dob: string;
  email: string;
  mobileNo: string;
  affiliationCollege: AffiliationCollege;
  letterReceiver: LetterReceicer;
  requestList: any[];
  collegeAddress: any;
  // letterReceiverList: any[];
}
