import { useEffect, useState } from "react";

const handleOutsideClick = (
    event: Event,
    ref: React.RefObject<HTMLDivElement>,
    close: () => void
) => {
    if (
        ref &&
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
    ) {
        close();
    }
};

const useCloseWhenClickOutside = (ref: React.RefObject<HTMLDivElement>) => {
    const [show, setShow] = useState(false);

    const close = () => {
        setShow(false);
    };

    useEffect(() => {
        if (show) {
            document.addEventListener("mousedown", (e) =>
                handleOutsideClick(e, ref, close)
            );
        }

        return () => {
            document.removeEventListener("mousedown", (e) =>
                handleOutsideClick(e, ref, () => close)
            );
        };
    }, [show]);

    return { show, setShow };
};

export { useCloseWhenClickOutside };
