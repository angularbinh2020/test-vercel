import { useCallback } from "react";
import { IRootNode } from "models/IRootNode";
import { ISiteLanguageNode } from "models/ISiteLanguageNode";

export const useGetLayoutNodeConfig = (
  rootNode: IRootNode,
  siteLanguageNode: ISiteLanguageNode
) => {
  const getFieldConfig = useCallback<any>(
    (fieldName: any) =>
      siteLanguageNode?.fields[
        fieldName as keyof typeof siteLanguageNode.fields
      ] || rootNode?.fields[fieldName as keyof typeof rootNode.fields],
    [rootNode, siteLanguageNode]
  );
  return { getFieldConfig };
};
