export function handleFormSubmit(
  handleSubmit: () => Promise<void>,
): (e: SubmitEvent) => void {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };
}
