import { Task } from '../../services';

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}
