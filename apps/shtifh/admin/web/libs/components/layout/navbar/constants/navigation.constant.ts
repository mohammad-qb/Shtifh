import {
  FaHome,
  FaCity,
  FaUsers,
  FaCar,
  FaUserTie,
  FaShoppingBag,
} from 'react-icons/fa';
import { MdCleaningServices } from 'react-icons/md';

export const navigation = [
  {
    id: 1,
    label: 'הראשית',
    icon: FaHome,
    href: '/home',
  },
  {
    id: 2,
    label: 'ערים',
    icon: FaCity,
    href: '/cities',
  },
  {
    id: 3,
    label: 'לקוח',
    icon: FaUsers,
    href: '/customers',
  },
  {
    id: 4,
    label: 'דגמי מכוניות',
    icon: FaCar,
    href: '/car-models',
  },
  {
    id: 5,
    label: 'עובדים',
    icon: FaUserTie,
    href: '/employees',
  },
  {
    id: 6,
    label: 'שירותים',
    icon: MdCleaningServices,
    href: '/services',
  },
  {
    id: 7,
    label: 'הזמנות',
    icon: FaShoppingBag,
    href: '/orders',
  },
];
