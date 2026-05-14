import './error-button.css';

type ErrorButtonProps = {
  onShowError: () => void;
};

export default function ErrorButton({ onShowError }: ErrorButtonProps) {
  return (
    <button
      onClick={onShowError}
      className="error-button"
      type="button"
      aria-label="error-button"
    >
      Simulate Error!
    </button>
  );
}
