import Setting from 'views/Setting';
import Statistics from 'views/Statistics';
import Detail from 'views/Detail';
import RecordsItem from 'views/RecordsItem';

const route = [
  {path: '/detail', exact: true, component:Detail},
  {path: '/detail/record/:id', exact: true,component:RecordsItem},
  {path: '/statistics', exact: true,component:Statistics},
  {path: '/setting', exact: true,component:Setting},

];

export default route;