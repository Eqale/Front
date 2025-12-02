export type CategoryType ='другое' | 'софт-скил' | 'дополнительное' | 'кнопка' | 'хард-скил'
export type PaymentType = 'card' | 'cash' | null;
export type ErrorType = Partial<Record<keyof IUserFormData, string>>;

interface IProduct {
    // категория товара
    productCategory: CategoryType; 

    // наименование товара
    productName: string; 

    // url-адрес изображения товара
    productImageUrl: string; 

    // описание товара
    productDescription: string; 

    /** стоимость товара, 
    * переменная может хранить либо число (стоимость товара), 
    * либо undefined (если стоимость не указана)
    */
    producrPrice: number | undefined;

    /**
    * указывает, был ли выбран товар из каталога.
    * 
    * значение переменной:
    * - true: товар выбран пользователем.
    * - false: товар не выбран.
    */
    isProductSelected: boolean; 
}

interface ApiResponse {
    items: IProduct[];
}

interface IUserFormData{
    // способ оплаты
    paymentMethod: PaymentType;

    // сумма заказа
    orderTotal: number;

    // контактный номер телефона пользователя
    phoneNumber: string;

    // адрес пользователя
    adress: string;

    // электронная почта пользователя
    email: string;
}

export interface IAppState {
    // корзина с товарами
    basket: IProduct[];

    // массив карточек товаров
    prductCatalog: IProduct[];

    // информация о заказе при покупке товара
    order: IUserFormData;

    // ошибки при валидации форм
    formErrors: ErrorType;
}

export interface IAppState {
    // Корзина с товарами
    basket: IProduct[];

    // Массив карточек товара
    store: IProduct[];

    // Информация о заказе при покупке товара
    order: IUserFormData;

    //Ошибки при валидации форм
    formErrors: ErrorType;

    // Добавить товар в корзину
    addToBasket(value: IProduct): void;

    // Удалить товар из корзины
    deleteFromBasket(id: string): void;

    // Очистить корзину
    clearBasket(): void;

    // Получить количество товаров в корзине
    getBasketAmount(): number;

    // Получить общую стоимость всех товаров в корзине
    getTotalBasketPrice(): number;

    // Добавить ID товаров в корзине в поле items для order
    setItems(): void;

    // Заполненить поля email, phoneNumber, address, paymentMethod в orderTotal
    setOrderField(field: keyof IUserFormData, value: string): void;

    // Валидация форм поля "контакты"
    validateContacts(): boolean;

    // Валидация форм поля "заказ"
    validateOrder(): boolean;

    // Очистить order после покупки товаров
    refreshOrder(): boolean;

    // Преобразовать данные, полученные с сервера, в формат, используемый в приложении
    setStore(items: IProduct[]): void;

    // Сбросить поля selected у всех товаров после завершения покупки
    resetSelected(): void;
}