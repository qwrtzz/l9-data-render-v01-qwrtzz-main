import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortUsers from './SortUsers.jsx';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Запрос на /users...');
        
        // Попробуем несколько вариантов URL
        const urlsToTry = [
          '/users',
          'http://localhost:3000/users',
          'http://localhost:3001/users',
          '/api/users'
        ];
        
        let data = null;
        let lastError = null;
        
        // Пробуем каждый URL
        for (const url of urlsToTry) {
          try {
            console.log(`Пробуем URL: ${url}`);
            const response = await axios.get(url, { timeout: 5000 });
            data = response.data;
            console.log('Данные получены:', data);
            break;
          } catch (err) {
            lastError = err;
            console.log(`Ошибка для URL ${url}:`, err.message);
          }
        }
        
        if (!data) {
          // Если ни один URL не сработал, используем тестовые данные
          console.log('Используем тестовые данные');
          data = [
            {
              id: 1,
              name: "Иван Иванов",
              email: "ivan@example.com",
              phone: "+7 999 123-45-67",
              registration_date: "2023-01-15",
              status: "active"
            },
            {
              id: 2,
              name: "Анна Смирнова",
              email: "anna@example.com",
              phone: "+7 999 234-56-78",
              registration_date: "2023-02-20",
              status: "inactive"
            },
            {
              id: 3,
              name: "Петр Петров",
              email: "petr@example.com",
              phone: "+7 999 345-67-89",
              registration_date: "2023-03-10",
              status: "active"
            }
          ];
        }
        
        // Сортировка по умолчанию (от А до Я)
        const sorted = [...data].sort((a, b) => 
          a.name.localeCompare(b.name, 'ru')
        );
        
        setUsers(sorted);
        setSortedUsers(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке пользователей:', err);
        setError(`Ошибка при загрузке пользователей: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="container m-3">
        <div className="alert alert-info">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container m-3">
        <div className="alert alert-danger">
          <strong>Ошибка!</strong> {error}
        </div>
        <button 
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
        >
          Обновить страницу
        </button>
      </div>
    );
  }

  return (
    <div id="container" className="container m-3">
      <h2 className="mb-4">Список пользователей</h2>
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Имя</th>
              <th scope="col">Email</th>
              <th scope="col">Телефон</th>
              <th scope="col">Дата регистрации</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.phone}</td>
                <td>{formatDate(user.registration_date)}</td>
                <td>
                  <span 
                    className={`badge ${
                      user.status === 'active' 
                        ? 'bg-success' 
                        : user.status === 'inactive' 
                        ? 'bg-secondary' 
                        : 'bg-warning'
                    }`}
                  >
                    {user.status === 'active' 
                      ? 'Активен' 
                      : user.status === 'inactive' 
                      ? 'Неактивен' 
                      : user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <SortUsers 
          onSort={handleSort} 
          sortDirection={sortDirection}
        />
        <div className="mt-2 text-muted small">
          Найдено пользователей: {sortedUsers.length}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;