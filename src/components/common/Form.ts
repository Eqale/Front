import { Element } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Element<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        //ensure element - обязательно есть элемент
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // обработка событий input
        this.container.addEventListener('input', (e: Event) => { // ловим изменение
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        // обработка submit
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // стандартная отправка формы отключается
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    //сообщение что пользователь изменил поле
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit('orderInput:change', {
            field,
            value,
        })
    }

    // валидность
    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    // ошибки
    set errors(value: string) {
        this.setText(this._errors, value); // безопасно меняет textContent
    }

    // render - рендеринг новго состояния
    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs); //вызывает сеттеры от инпутов
        return this.container;
    }
}