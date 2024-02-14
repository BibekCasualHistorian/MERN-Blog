import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSelector((state: any) => state.theme); // Assuming `theme` is a direct property of your state

  console.log(theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:bg-slate-900 dark:text-gray-300 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
