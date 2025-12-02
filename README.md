# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Документация проекта

## Описание

Данный проект представляет собой интернет-магазин с товарами для веб-разработчиков — Web-ларёк. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

## Типы данных

### CategoryType
Тип для определения категорий товара:
- 'другое'
- 'софт-скил'
- 'дополнительное'
- 'кнопка'
- 'хард-скил'

### PaymentType
Тип для определения способов оплаты:
- 'card'
- 'cash'
- null

### ErrorType
Тип для хранения ошибок валидации форм. Использует частичную запись (Partial) для указания возможных полей, содержащих ошибки.

### IProduct
Интерфейс, описывающий товар:
- productCategory: CategoryType — категория товара.
- productName: string — наименование товара.
- productImageUrl: string — URL-адрес изображения товара.
- productDescription: string — описание товара.
- producrPrice: number | undefined — стоимость товара (может быть числом или undefined).
- isProductSelected: boolean — статус выбора товара (выбран/не выбран).

### ApiResponse
Интерфейс, описывающий ответ API:
- items: IProduct[] — массив товаров.

### IUserFormData
Интерфейс, описывающий данные формы пользователя:
- paymentMethod: PaymentType — способ оплаты.
- orderTotal: number — сумма заказа.
- phoneNumber: string — контактный номер телефона пользователя.
- adress: string — адрес пользователя.
- email: string — электронная почта пользователя.

### IAppState
Интерфейс, описывающий состояние приложения:
- basket: IProduct[] — корзина с товарами.
- store: IProduct[] — массив карточек товаров.
- order: IUserFormData — информация о заказе.
- formErrors: ErrorType — ошибки при валидации форм.

## Методы

### addToBasket(value: IProduct): void
Добавляет товар в корзину.

### deleteFromBasket(id: string): void
Удаляет товар из корзины по его идентификатору.

### clearBasket(): void
Очищает корзину.

### getBasketAmount(): number
Возвращает количество товаров в корзине.

### getTotalBasketPrice(): number
Возвращает общую стоимость всех товаров в корзине.

### setItems(): void
Добавляет ID товаров в корзине в поле items для заказа.

### setOrderField(field: keyof IUserFormData, value: string): void
Заполняет поля email, phoneNumber, address, paymentMethod в заказе.

### validateContacts(): boolean
Валидация полей контактов.

### validateOrder(): boolean
Валидация формы заказа.

### refreshOrder(): boolean
Очищает информацию о заказе после завершения покупки.

### setStore(items: IProduct[]): void
Преобразует данные, полученные с сервера, в формат, используемый в приложении.

### resetSelected(): void
Сбрасывает поля selected у всех товаров после завершения покупки.
