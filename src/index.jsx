import ReactDOM from 'react-dom/client';
import UsersTable from './UsersTable.jsx';

const dom = (
  <UsersTable />
);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(dom);
