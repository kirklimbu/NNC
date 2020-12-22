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
  email: string;
  mobileNo: string;
  collegeAddress: string;

  photoBill1: string;
  photoBillChange1: boolean;
  status1: string;
  print1: boolean;
  letterReceiverId1: number;
  letterReceiverName1: string;

  photoBill2: string;
  photoBillChange2: boolean;
  status2: string;
  print2: boolean;
  letterReceiverId2: number;
  letterReceiverName2: string;

  altPhoto: string;

  affiliationCollege: AffiliationCollege;
  letterReceiver: LetterReceicer;
  // test
  letterReceiver2: LetterReceicer;
}
