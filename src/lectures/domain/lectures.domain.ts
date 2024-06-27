type LectureType = {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  lectureDate: string[];
  createdAt: number;
};

export class LecturesDomain {
  constructor(private readonly lectures: LectureType[]) {}
}
