import { useSearchParams } from "next/navigation";

const useQueryString = () => {
  const searchParams = useSearchParams();

  const getString = (name: string, defaultValue?: string): string => {
    const value = searchParams.get(name);

    if (!value) return defaultValue || "";

    return value.toString();
  };

  const getNumber = (name: string, defaultValue?: number): number => {
    const value = getString(name);

    if (value === "") return defaultValue || 0;

    return +value;
  };

  return { getString, getNumber };
};

export default useQueryString;
