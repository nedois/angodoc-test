import {
  FiUsers as UsersIcon,
  FiPieChart as PieChartIcon,
  FiFileText as DocumentsIcon,
  FiPocket as FindersIcon,
} from 'react-icons/fi';
import { FaFingerprint as FingerprintIcon } from 'react-icons/fa';
import { MdBusiness as AgenciesIcon } from 'react-icons/md';

import { Section } from 'src/components/molecules/panels/VerticalNavigationPanel';
import { PERMISSIONS } from 'src/constants';

const sections: Section[] = [
  {
    subheader: 'Recursos',
    items: [
      {
        permission: PERMISSIONS.INDEX_AGENCIES,
        title: 'Visão geral',
        icon: PieChartIcon,
        href: '/painel-de-controle/recursos',
      },
      {
        permission: PERMISSIONS.INDEX_AGENCIES,
        title: 'Documentos',
        icon: DocumentsIcon,
        href: '/painel-de-controle/recursos/documentos',
      },
      {
        permission: PERMISSIONS.INDEX_AGENCIES,
        title: 'Encontradores',
        icon: FindersIcon,
        href: '/painel-de-controle/recursos/encontradores',
      },
      {
        permission: PERMISSIONS.INDEX_AGENCIES,
        title: 'Agências',
        icon: AgenciesIcon,
        href: '/painel-de-controle/recursos/agencias',
      },
    ],
  },
  {
    subheader: 'Gestão do sistema',
    permission: PERMISSIONS.MANAGE_PLATFORM,
    items: [
      {
        permission: PERMISSIONS.MANAGE_USERS,
        title: 'Usúarios',
        icon: UsersIcon,
        href: '/painel-de-controle/plataforma/usuarios',
      },
      {
        permission: PERMISSIONS.CREATE_ROLES,
        title: 'Papéis',
        icon: FingerprintIcon,
        href: '/painel-de-controle/plataforma/papeis',
      },
    ],
  },
];

export default sections;
