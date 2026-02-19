import { useRef } from "react";

const useRippleEffect = () => {
	const rippleRef = useRef(null);

	const triggerRipple = (event) => {
		const ripple = document.createElement("span");
		ripple.className = "ripple";
		const { offsetWidth, offsetHeight } = rippleRef.current;
		const { clientX, clientY } = event;

		const x =
			clientX -
			rippleRef.current.getBoundingClientRect().left -
			offsetWidth / 2;
		const y =
			clientY -
			rippleRef.current.getBoundingClientRect().top -
			offsetHeight / 2;

		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		ripple.style.height = `${Math.max(offsetWidth, offsetHeight)}px`;
		ripple.style.width = `${Math.max(offsetWidth, offsetHeight)}px`;

		rippleRef.current.appendChild(ripple);

		setTimeout(() => {
			ripple.remove();
		}, 600);
	};

	return [rippleRef, triggerRipple];
};

export default useRippleEffect;
