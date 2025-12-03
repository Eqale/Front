import { Element } from '../base/Component';

interface ISuccessActions {
    onClick: (event: MouseEvent) => void;
}

export interface ISuccess {
    description: number; // хранение списаных тубриков
}

export class Success extends Element<ISuccess> {
    protected _button: HTMLButtonElement;
    protected _description: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this._button = container.querySelector(`.${blockName}__close`);
        this._description = container.querySelector(`.${blockName}__description`);

        // привзяка обработчика кликов
        if (actions?.onClick) { // есть ли колбэк
            if (this._button) {
                this._button.addEventListener('click', actions.onClick) // обработчик клика на кнопку закрытия
            }
        }
    }

    set description(value: number) {
        this._description.textContent = `Списано ${value} синапсов`
    }
}