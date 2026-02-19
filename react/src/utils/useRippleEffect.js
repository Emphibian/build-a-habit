import { useRef } from "react";

const useRippleEffect = () => {
	const rippleRef = useRef(null);

	const triggerRipple = (event) => {
		event = event.touches ? event.touches[0] : event;
		const r = rippleRef.current.getBoundingClientRect(),
			d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
		rippleRef.current.style.cssText = `--s: 0; --o: 1;`;
		rippleRef.current.offsetTop;
		rippleRef.current.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${event.clientX - r.left}; --y:${event.clientY - r.top};`;
	};

	return [rippleRef, triggerRipple];
};

export default useRippleEffect;
