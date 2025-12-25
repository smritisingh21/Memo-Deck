export default function FullscreenPopUp({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-base-300">
      {children}
    </div>
  );
}
