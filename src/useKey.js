import { useEffect } from "react";

export function useKey(Key, action) {
    useEffect(function () {
        function callback(e) {

            if (e.code == Key) {
                action()
            }
        }
        document.addEventListener('keydown', callback)

        //remove already keyDown
        return function () {
            document.removeEventListener(Key, callback)
        }
    }, [action, Key])
}