export const validateMyPageForm = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};

  if (!values.name) {
    errors.name = "빈 이름을 등록할 수 없어요.";
  }

  if (values.name.length > 5) {
    errors.name = "이름은 5자 이내로 입력해주세요.";
  }
  return errors;
};
