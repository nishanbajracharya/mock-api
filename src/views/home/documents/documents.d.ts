type DocumentComponentProps = {
  collection: CollectionItemProp | null | undefined;
};

type DocumentItemProp = DocumentDataHook & {
  
};

type DocumentSidebarComponentProps = {
  loading?: boolean;
  documents: DocumentDataHook | undefined;
};

type DocumentDataProp = {
  id: string;
  selected?: boolean;
  onClick?: () => any;
};
