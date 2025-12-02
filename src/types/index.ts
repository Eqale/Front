export type CategoryType ='другое'|'софт-скил'|'дополнительное'|'кнопка'|'хард-скил'
export type PaymentType = 'card'|'cash'|null;
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IProduct {
    // категория товара
    category: CategoryType;

    // наименование товара
    title: string;

    // url-адрес изображения товара
    image: string;
    
    // описание товара
    description: string;
    
    /** стоимость товара, 
        * переменная может хранить либо число (стоимость товара), 
        * либо null (если товар "бесценен")
    */
    price: number | null;
    
    /**
        * указывает, был ли выбран товар из каталога.
        * 
        * значение переменной:
        * - true: товар выбран пользователем.
        * - false: товар не выбран.
    */
    selected: boolean;

    // ID товара
    id: string;
}

export interface ApiResponse {
    items: IProduct[];
}
    
export interface IOrder {
    // способ оплаты
    payment: PaymentType;
    
    // сумма заказа
    total: number;

    // контактный номер телефона пользователя
    phone: string;
    
    // адрес пользователя
    address: string;
    
    // электронная почта пользователя
    email: string;

    // массив ID купленных товаров
    items: string[];
}

export interface IOrderForm {
    payment: PaymentType;
    address: string;
    email: string;
    phone: string;
}
  
export interface IAppState {
    // Корзина с товарами
    basket: IProduct[];
    // Массив карточек товара
    store: IProduct[];
    // Информация о заказе при покупке товара
    order: IOrder;
    //Ошибки при валидации форм
    formErrors: FormErrors;
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
    setOrderField(field: keyof IOrderForm, value: string): void;
    // Валидация форм поля "контакты"
    validateContacts(): boolean;
    // Валидация форм поля "заказ"
    validateOrder(): boolean;
    // Очистить order после покупки
    refreshOrder(): boolean;
    // Преобразовать данные, полученные с сервера, в формат, используемый в приложении
    setStore(items: IProduct[]): void;
    // Сбросить поля selected у всех товаров после завершения покупки
    resetSelected(): void;
}

//try commit