import { Jodit } from "jodit";
import React, { useEffect, useRef } from "react";

import "jodit/build/jodit.min.css";
export interface RichTextEditorProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  name?: string;
  editorConfig?: any;
}

const RichTextEditor = ({
  value,
  onChange,
  name,
  onBlur,
  editorConfig,
  ...textAreaProps
}: RichTextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const jodit = useRef<Jodit>();

  useEffect(() => {
    if (textareaRef.current) {
      const editor = Jodit.make(textareaRef.current, {
        useSearch: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        buttons:
          "bold,italic,underline,strikethrough,fontsize,paragraph,image,video,link,brush,source",
        toolbarAdaptive: false,
        maxHeight: 600,
        triggerChangeEvent: true,
        cleanHTML: {
          denyTags: false,
        },
        ...editorConfig,
      });
      editor.value = value ?? "";
      editor.e.on("change", (newValue) => {
        const event: any = {
          target: {
            name: name || "",
            value: newValue,
          },
        };
        onChange && onChange(event);
      });
      jodit.current = editor;
    }
  }, []);

  return <textarea ref={textareaRef} {...textAreaProps}></textarea>;
};

export default RichTextEditor;
