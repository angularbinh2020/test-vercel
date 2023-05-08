import RichTextEditor, { RichTextEditorProps } from "../RichTextEditor";
import Box from "@material-ui/core/Box";
import FormErrorMessage from "../FormErrorMessage";

interface Props extends RichTextEditorProps {
  label?: string;
  errorMsg?: string;
}

const SimpleHtmlContent = ({ label, errorMsg, ...restProps }: Props) => {
  return (
    <>
      {label && (
        <Box fontSize="14px" color="#424345">
          {label}
        </Box>
      )}
      <RichTextEditor {...restProps} />
      <FormErrorMessage errorMessage={errorMsg} />
    </>
  );
};

export default SimpleHtmlContent;
