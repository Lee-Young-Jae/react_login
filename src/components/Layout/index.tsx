import S from "./Style";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Layout;
