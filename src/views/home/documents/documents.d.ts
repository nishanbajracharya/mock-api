type DocumentComponentProps = {
  collection: CollectionItemProp | null | undefined;
};

type DocumentItemProp = DocumentDataHook & {};

type DocumentSidebarComponentProps = {
  loading?: boolean;
  selectedItem: string | null;
  documents: DocumentDataHook | undefined;
  setSelectedItem: (item: string | null) => any;
};

type DocumentFieldProp = {
  value?: any;
  type?: string;
  label?: string;
  displayLabel?: string;
};

type DocumentDataProp = {
  id: string;
  selected?: boolean;
  onClick?: () => any;
  document: DocumentData;
};

type DocumentData = {
  id: string;
  displayLabel?: string;
  fields?: DocumentFieldProp[];
};

type DocumentDetailsComponentProps = {
  document: DocumentItemProp | undefined | null;
};

type FieldRowProp = {
  field: DocumentFieldProp;
};
