import Setting from 'views/Setting';
import Statistics from 'views/Statistics';
import Detail from 'views/Detail';
import RecordItem from 'views/RecordItem';

const route = [
  {path: '/detail', exact: true, component:Detail},
  {path: '/detail/record/:id', exact: true,component:RecordItem},
  {path: '/statistics', exact: true,component:Statistics},
  {path: '/setting', exact: true,component:Setting},
  {path: '/', exact: true,component:Detail},

];

export default route;