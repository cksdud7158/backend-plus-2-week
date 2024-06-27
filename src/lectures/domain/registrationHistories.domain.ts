type LectureType = {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  lectureDate: string;
  createdAt: number;
};

type RegistrationHistoryType = {
  id: number;

  userId: number;

  status: boolean;

  createdAt: number;
  lecture?: LectureType;
};

export class RegistrationHistoriesDomain {
  constructor(private readonly _lectures: RegistrationHistoryType[]) {}

  get lectures(): RegistrationHistoryType[] {
    return this._lectures;
  }

  get length(): number {
    return this._lectures.length;
  }

  isRegistered(): boolean {
    return !!this._lectures.length;
  }
}
