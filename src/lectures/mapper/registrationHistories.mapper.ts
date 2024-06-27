import { RegistrationHistoriesDomain } from "../domain/registrationHistories.domain";
import { RegistrationHistory } from "../entity/registrationHistory.entity";

export class RegistrationHistoriesMapper {
  static toDomain(
    registrationHistories: RegistrationHistory[],
  ): RegistrationHistoriesDomain {
    return new RegistrationHistoriesDomain(
      registrationHistories?.map((registrationHistory) => ({
        id: registrationHistory.id,
        userId: registrationHistory.userId,
        createdAt: registrationHistory.createdAt.getTime(),
        status: registrationHistory.status,
        lecture: {
          id: registrationHistory.lectureSchedule?.lecture.id,
          title: registrationHistory.lectureSchedule?.lecture.title,
          description: registrationHistory.lectureSchedule?.lecture.description,
          instructorName:
            registrationHistory.lectureSchedule?.lecture.instructorName,
          lectureDate: registrationHistory.lectureSchedule.lectureDate,
          createdAt:
            registrationHistory.lectureSchedule?.lecture.createdAt.getTime(),
        },
      })),
    );
  }
}
