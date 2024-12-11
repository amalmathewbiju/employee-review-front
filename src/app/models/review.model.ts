import { User } from "./user.model";

export interface Review {
    _id?: string;
    subject: User;
    reviewer: User;
    feedback?: string;
    status: 'pending' | 'completed';
    createdAt: Date;
  }
  