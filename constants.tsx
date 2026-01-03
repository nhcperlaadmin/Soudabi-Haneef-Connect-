
import React from 'react';
import { Scheme, WardEvent, NewsUpdate, ContactInfo } from './types';

export const WARD_MEMBER: ContactInfo = {
  name: "Shri. Rajesh Kumar",
  role: "Ward Member - Ward 17",
  phone: "+91 98470 12345",
  whatsapp: "+91 98470 12345",
  email: "member.ward17@enmakaje.in"
};

export const SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'Ayyankali Urban Employment Guarantee Scheme',
    category: 'Social Welfare',
    description: 'Guarantees 100 days of work to urban households.',
    eligibility: 'Adult members of any household residing in the ward.'
  },
  {
    id: '2',
    title: 'LIFE Mission Phase III',
    category: 'Housing',
    description: 'Providing safe and secure housing for landless homeless families.',
    eligibility: 'BPL families without land or house.'
  },
  {
    id: '3',
    title: 'Subhiksha Keralam - Agriculture Support',
    category: 'Agriculture',
    description: 'Subsidies for kitchen gardening and small scale farming.',
    eligibility: 'All residents with at least 1 cent of land.'
  },
  {
    id: '4',
    title: 'Pravasi Welfare Pension',
    category: 'Social Welfare',
    description: 'Pension scheme for returning expats who worked abroad for 2+ years.',
    eligibility: 'Age 60+, must have been a member of Pravasi Welfare Board.'
  }
];

export const EVENTS: WardEvent[] = [
  {
    id: '1',
    title: 'Bengapadavu Public Well Inauguration',
    date: '2024-05-20',
    time: '10:30 AM',
    location: 'Near Bengapadavu School',
    type: 'Inauguration',
    description: 'Inauguration of the newly renovated public drinking water well.'
  },
  {
    id: '2',
    title: 'Ward Sabha (General Body)',
    date: '2024-05-25',
    time: '03:00 PM',
    location: 'Anganwadi Center 42',
    type: 'Meeting',
    description: 'Discussion on annual budget allocation and public work priority list.'
  }
];

export const NEWS: NewsUpdate[] = [
  {
    id: '1',
    title: 'New Street Lights Installed',
    date: '2024-05-15',
    content: 'Successfully installed 15 new LED street lights in the Bengapadavu main road stretch.',
    image: 'https://picsum.photos/seed/lights/800/400'
  },
  {
    id: '2',
    title: 'Monsoon Preparedness Meeting Held',
    date: '2024-05-10',
    content: 'The disaster management committee met to discuss cleaning of drainage canals before the monsoon.',
    image: 'https://picsum.photos/seed/rain/800/400'
  }
];
