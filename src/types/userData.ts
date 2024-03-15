export type UserData = {
  id: string; // 이메일 형식
  password: string; // 숫자, 영문-소, 영문-대, 특수문자 포함, 연속된 숫자 3개 이상 금지
  name: string; // 최대 5글자
  image: string; // 파일명만 저장
  createdAt: string; // yyyy.mm.dd hh:ii:ss
  updatedAt: string; // yyyy.mm.dd hh:ii:ss
};
