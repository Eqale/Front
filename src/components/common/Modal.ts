import { Element } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Element<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container); //передаёт контейнер родителю

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', this.close.bind(this)); //закрытие по кнопке
        this.container.addEventListener('click', this.close.bind(this));//закрытие по клику вне контента
        this._content.addEventListener('click', (event) => event.stopPropagation());//защита от закрытия
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    //сообщает что модалка открыта
    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    // скрывает модалку, очищает контент
    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    // передаёт состояние родителю, открывает модалку, возвращает DOM
    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}