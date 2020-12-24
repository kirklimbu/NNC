import { AffiliationCollege } from './affiliation-college.model';
import { LetterReceiver } from './letter-receiver.model';
export class LetterVerify {
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
  letterReceiver: LetterReceiver;
  requestList: any[];
  collegeAddress: any;
  // letterReceiverList: any[];
}
