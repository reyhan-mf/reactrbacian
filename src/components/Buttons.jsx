import Button from 'react-bootstrap/Button';

function CustomButton({ variant, onClick, children }) {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
}

export default CustomButton;