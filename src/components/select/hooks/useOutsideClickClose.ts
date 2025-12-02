import { useEffect, useRef } from 'react';

type UseOutsideClickClose = {
    isOpen: boolean;
    onChange: (newValue: boolean) => void;
    onClose?: () => void;
    rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
    isOpen,
    rootRef,
    onClose,
    onChange,
}: UseOutsideClickClose) => {
    const optionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;

            // Проверяем, был ли клик внутри rootRef или optionRef
            if (
                target instanceof Node &&
                !rootRef.current?.contains(target) &&
                !optionRef.current?.contains(target)
            ) {
                if (isOpen) {
                    onClose?.();
                    onChange(false);
                }
            }
        };

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [onClose, onChange, isOpen]);
};
