import useRippleEffect from "../../../utils/useRippleEffect";

export const RippleButton = ({ children }) => {
	const [ref, triggerRipple] = useRippleEffect();

	return (
		<div ref={ref} onClick={triggerRipple} className="ripple-button">
			{children}
		</div>
	);
};
