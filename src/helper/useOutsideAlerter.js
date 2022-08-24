import { useEffect } from 'react';

export default function useOutsideAlerter(ref, showModal) {
    useEffect(() => {
        // Hide modal state if clicked outside of the modal.
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                showModal(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}