"use client";

import { useEffect } from "react";

export default function Modal({
  title,
  onClose,
  children,
  actions,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}
