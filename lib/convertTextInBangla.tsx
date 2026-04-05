import translate from "translate";

const handleTranslate = async (text: string) => {
  if (!text) return;
  try {
    // Direct frontend-to-API call
    const translated = await translate(text, { to: 'bn' });
    return translated;
  } catch (error) {
    console.error("Translation failed", error);
    return "Error: Check console for CORS issues.";
  }
};

export default handleTranslate;