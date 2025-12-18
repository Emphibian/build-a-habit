import { useState, useRef, useEffect } from "react";

export function Dial({ initial, onChange, label = "" }) {
  const [minutes, setMinutes] = useState(initial);
  const dialRef = useRef(null);
  const dialOutputRef = useRef(null);

  // Dial specific functions here on
  const getAngle = (x, y) => {
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;

    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    deg = (deg + 90 + 360) % 360;

    return deg;
  };

  // complete rotation is 60 minutes
  const max = 60;
  // 5 minute steps
  const step = 5;

  const angleToSnappedMinutes = (angle) => {
    const raw = (angle / 360) * max;
    const snapped = Math.round(raw / step) * step;
    return snapped % max;
  };

  const minutesToAngles = (m) => (m / max) * 360;

  useEffect(() => {
    const angle = minutesToAngles(minutes);
    if (dialRef.current) {
      dialRef.current.style.transform = `rotate(${angle}deg)`;
      dialOutputRef.current.style.transform = `rotate(-${angle}deg)`;
    }

    onChange(minutes);
  }, [minutes, onChange]);

  const dragging = useRef(false);

  const startDrag = (e) => {
    dragging.current = true;
    e.preventDefault();
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  const moveDrag = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const angle = getAngle(clientX, clientY);
    setMinutes(angleToSnappedMinutes(angle));
  };

  useEffect(() => {
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", moveDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);

    return () => {
      document.removeEventListener("mousemove", moveDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", moveDrag);
      document.removeEventListener("touchend", stopDrag);
    };
  }, []);

  const mm = String(minutes % 60) + "m";

  return (
    <div
      className="dial"
      ref={dialRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div className="dial-output" ref={dialOutputRef}>
        <p>{label}</p>
        {mm}
      </div>
    </div>
  );
}
