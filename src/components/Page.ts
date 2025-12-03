import { Element } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
    counter: number;
    store: HTMLElement[];
    locked: boolean;
}

export class Page extends Element<IPage> {
    protected _counter: HTMLElement;
    protected _store: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._store = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        //обработка клика на корзину
        this._basket.addEventListener('click', () => {
        this.events.emit('basket:open');
        });
    }

    //устанавливает текст в элемент
    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    //заменячет весь контент галаери
    set store(items: HTMLElement[]) {
        this._store.replaceChildren(...items);
    }

    //блокирует страницу
    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}
