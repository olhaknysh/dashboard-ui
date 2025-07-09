export interface TaskOriginator {
  name: string;
}

export interface Task {
  id: number;
  originator: TaskOriginator;
  client: string;
  line: string;
  type: TaskType;
  status: TaskStatus;
  created: Date;
  description: string;
}

export enum TaskStatus {
  NEW = 'New',
  PENDING = 'Pending Review',
  COMPLETED = 'Completed',
}

export enum TaskType {
  UNDERWRITER_REFERRAL = 'Underwriter Referral',
  LOSS_CONTROL_REQUEST = 'Loss Control Request',
  EMAIL = 'Email',
}
