// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: icon('ic_home'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'MyDogs',
    path: '/dashboard/MyDogs',
    icon: icon('ic_paw'),
  },
  {
    title: 'MyMemorials',
    path: '/dashboard/MyMemorials',
    icon: icon('ic_dog'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: icon('ic_bone'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },

  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
