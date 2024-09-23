
export interface gameProps {
  title: string;
  link: string;
  icon: React.ReactNode;
  imgSrc: string;
}
export const games = [
  {
    title: 'Instant Cashout',
    link: '/glo-instant-cashout',

    imgSrc: '/images/gloImages/GloInstantCashoutt.png',
  },
  {
    title: 'Salary 4 Life',
    link: '/glo-salary-for-life',
    imgSrc: '/images/gloImages/GloSalary4Life.png',
  },
  {
    title: 'Fastest Fingers',
    link: '/glo-fastest-finger',
    imgSrc: '/images/gloImages/gloFastfingers.png',
  },
];
