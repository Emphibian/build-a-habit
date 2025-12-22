import { DeleteButton } from "./DeleteButton";

export function OperationModal({ instance, open, close }) {
  if (!open) return null;

  return (
    <div className="operation-modal-overlay" onClick={close}>
      <div className="operation-modal" onClick={(e) => e.stopPropagation()}>
        <DeleteButton
          id={instance.id}
          isHabit={instance.isHabit}
          closeSidebar={close}
        />
      </div>
    </div>
  );
}
