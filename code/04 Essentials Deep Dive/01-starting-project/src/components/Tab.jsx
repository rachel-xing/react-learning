export default function Tab({children,buttons,ButtonContainer='menu'}) {
  // const ButtonContainer = buttonContainer
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>

  );
}