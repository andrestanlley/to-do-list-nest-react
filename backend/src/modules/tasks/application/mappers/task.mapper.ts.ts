import { dateToTZ } from 'src/shared/utils/date-to-tz.utils';
import { ITaskOutput } from '../contracts/task.contract';

export function taskDomainToApplication(task: ITaskOutput): ITaskOutput {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    finished: task.finished,
    limitDate: dateToTZ(task.limitDate),
    board: task.board,
  };
}
