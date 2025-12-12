import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortUsers from './SortUsers.jsx';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Загружаем данные из фикстур напрямую (без запроса на сервер)
  useEffect(() => {
    // Данные из users.js
    const usersData = [
      {
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan.ivanov@example.com',
        phone: '+7 (999) 123-45-67',
        registration_date: '2023-01-15T10:00:00Z',
        status: 'active',
      },
      {
        id: 2,
        name: 'Мария Петрова',
        email: 'maria.petrova@example.com',
        phone: '+7 (999) 234-56-78',
        registration_date: '2023-02-20T12:30:00Z',
        status: 'inactive',
      },
      {
        id: 3,
        name: 'Сергей Сергеев',
        email: 'sergey.sergeev@example.com',
        phone: '+7 (999) 345-67-89',
        registration_date: '2023-03-10T09:15:00Z',
        status: 'active',
      },
      {
        id: 4,
        name: 'Анна Смирнова',
        email: 'anna.smirnova@example.com',
        phone: '+7 (999) 456-78-90',
        registration_date: '2023-04-05T14:45:00Z',
        status: 'banned',
      },
      {
        id: 5,
        name: 'Дмитрий Кузнецов',
        email: 'dmitry.kuznetsov@example.com',
        phone: '+7 (999) 567-89-01',
        registration_date: '2023-05-25T08:00:00Z',
        status: 'active',
      },
    ];

    // Сортируем по имени от А до Я (начальная сортировка)
    const sorted = [...usersData].sort((a, b) => 
      a.name.localeCompare(b.name, 'ru')
    );
    
    setUsers(sorted);
    setSortedUsers(sorted);
  }, []);

  // Функция сортировки
  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    
    const sorted = [...users].sort((a, b) => {
      if (newDirection === 'asc') {
        return a.name.localeCompare(b.name, 'ru');
      } else {
        return b.name.localeCompare(a.name, 'ru');
      }
    });
    
    setSortedUsers(sorted);
    setSortDirection(newDirection);
  };

  // Не показываем загрузку, сразу рендерим таблицу
  return (
    <div id="container" className="container m-3">
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>email</td>
            <td>phone</td>
            <td>registration_date</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.registration_date}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SortUsers onSort={handleSort} />
    </div>
  );
};

export default UsersTable;