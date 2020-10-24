type DocumentComponentProps = {
  collection: CollectionItemProp | null | undefined;
};

type DocumentItemProp = DocumentDataHook & {
  
};

type DocumentSidebarComponentProps = {
  loading?: boolean;
  selectedItem: number | null;
  documents: DocumentDataHook | undefined;
  setSelectedItem: (item: number | null) => any;
};

type DocumentDataProp = {
  id: string;
  selected?: boolean;
  onClick?: () => any;
  document: {
    [prop: string]: any;
  };
};

type DocumentDetailsComponentProps = {
  document: DocumentItemProp | undefined | null;
};