
export interface Scheme {
  id: string;
  title: string;
  category: 'Education' | 'Agriculture' | 'Housing' | 'Health' | 'Social Welfare';
  description: string;
  eligibility: string;
  lastDate?: string;
}

export interface WardEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Inauguration' | 'Meeting' | 'Cultural' | 'Health Camp';
  description: string;
  invitationUrl?: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
}

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export type TicketStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface TicketUpdate {
  id: string;
  date: string;
  message: string;
  status: TicketStatus;
}

export interface ComplaintTicket {
  id: string;
  residentName: string;
  phoneNumber: string; // Added
  address: string;     // Added
  houseNumber: string;
  category: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updates: TicketUpdate[];
}
