# Vue 3 + TypeScript + Vite + Mongoose + Express

MEVN стек (Mongoose + Express.js + Vue 3 + Node.js)

Store - Pinia

UI - Vue-bootstrap-3

Валидация - Vee-validate + Yup
Валидация backend - express-validator

В настоящий момент проект еще находится в разработке. Со временем будут добавляться новые фичи и будет проводиться рефакторинг

[Ссылка на демо](https://ansnekit.github.io/)


## Особенности

- Composition API
- Использованы типы Typecsript. Создана entity для вакансии
- Сложная логика компонентов вынесена в функции composables для сохранения чистоты кода
- События для фильтрации вакансий обернуты в debounce функцию
- Валидация форм на фронте
- Валидация форм на бекенде
- Navbar подключен через Layout
- Настроен базовый роутинг

## Верстка

Создана валидная, адаптивная, кроссбраузерная, доступная верстка с использованием UI bootstrap-vue-3

## Компоненты Frontend приложения

- TheNavbar. Компонент оборачивает верстку bootstrap копонентов для навбара
- VacancyCard. Карточка вакансии
- ModalVacancyForm. Модальное окно с формой

# Backend

- Типизация проекта на Typescript
- Подключена БД Mongose
- Создана schema и модель Vacancy
- Создан CRUD роутинг для вакансии
- Добавлена валидация express-validator через middleware

### Фильтрация и сортировка вакансий

- При вводе в поиск названия вакансии происходит поиск. Если ничего не найдено, выдаст сообщение
- Выбор сортировки по возрастанию и по убыванию

### Пагинация

- По 3 вакансии на одной странице

---
### Node - 18.12.0

### Vite - 3.1.8

### NPM - 8.19.2
---
## Запуск и сборка проекта

Установка зависимостей

1. `npm i`
2. `cd server`
3. `npm i`

Запуск dev сервера front и backend

1. `npm run dev`
2. `npm run server`

Запуск build

`npm run build`

Запуск lint

`npm run lint`