import { useAppSelector } from "./hooks";

const TextTranslate: React.FC<{ text: string }> = ({ text }) => {
  let LanguageTextList = useAppSelector((state) => state.LanguageTextList);

  if (!LanguageTextList || !LanguageTextList.results) {
    return <>{text}</>;
  }

  const results = LanguageTextList.results;
  const translation = results.find((element: any) => element.key === text);

  return <>{translation ? translation.Translation : text}</>; // Show translated text or original
};

export default TextTranslate;
