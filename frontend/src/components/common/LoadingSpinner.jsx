const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;
  return <div className={`loading loading-spinner ${sizeClass}`} />;
};

export default LoadingSpinner;
