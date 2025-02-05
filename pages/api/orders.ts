import { NextApiRequest, NextApiResponse } from 'next';

// Simulated order API response
const orders = [
  {
    id: 101,
    customer: 'Alice Johnson',
    total: '$450',
    status: 'Pending',
    productImage: '/orderimages/sofa.png',
  },
  {
    id: 102,
    customer: 'Bob Smith',
    total: '$320',
    status: 'Delivered',
    productImage: '/orderimages/trending1.png',
  },
  {
    id: 103,
    customer: 'Charlie Lee',
    total: '$290',
    status: 'Processing',
    productImage: '/orderimages/latest one.png',
  },
  {
    id: 104,
    customer: 'Diana Prince',
    total: '$510',
    status: 'Delivered',
    productImage: '/orderimages/latest two.png',
  },
  {
    id: 105,
    customer: 'Ethan Hunt',
    total: '$200',
    status: 'Pending',
    productImage: '/orderimages/latest four.png',
  },
  {
    id: 106,
    customer: 'Fiona Gallagher',
    total: '$375',
    status: 'Processing',
    productImage: '/orderimages/trending2.png',
  },
  {
    id: 107,
    customer: 'George Clooney',
    total: '$690',
    status: 'Delivered',
    productImage: '/orderimages/latest two.png',
  },
  {
    id: 108,
    customer: 'Hannah Montana',
    total: '$150',
    status: 'Pending',
    productImage: '/orderimages/trending3.png',
  },
  {
    id: 109,
    customer: 'Ian Somerhalder',
    total: '$480',
    status: 'Processing',
    productImage: '/orderimages/sofa.png',
  },
  {
    id: 110,
    customer: 'Jessica Alba',
    total: '$520',
    status: 'Delivered',
    productImage: '/orderimages/latest five.png',
  },
  {
    id: 111,
    customer: 'Jessica Alba',
    total: '$520',
    status: 'Delivered',
    productImage: '/orderimages/latest three.png',
  },
  {
    id: 112,
    customer: 'Jessica Alba',
    total: '$520',
    status: 'Delivered',
    productImage: '/orderimages/latest six.png',
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(orders);
}
