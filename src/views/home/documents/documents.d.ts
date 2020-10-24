type DocumentComponentProps = {
  collection: CollectionItemProp | null | undefined;
  collections?: CollectionItemProp[] | null | undefined;
};

type DocumentItemProp = DocumentDataHook & {};

type DocumentSidebarComponentProps = {
  loading?: boolean;
  collection?: string;
  handleOpenModal: () => any;
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
  id?: string;
  displayLabel?: string;
  fields?: DocumentFieldProp[];
};

type DocumentDetailsComponentProps = {
  onEdit?: (document: DocumentData) => any;
  document: DocumentItemProp | undefined | null;
  collection: CollectionItemProp | null | undefined;
  onDelete?: (id: string | null | undefined) => any;
};

type FieldRowProp = {
  field: DocumentFieldProp;
};

type DocumentFormProps = {
  initialValues?: DocumentData | null | undefined;
  submit: (document: DocumentData) => Promise<void> | undefined;
  handleClose: () => void;
  fieldSchema?: DocumentFieldProp[] | undefined | null;
};

type DocumentFieldComponentProps = {
  values: DocumentData;
  arrayHelpers: FieldArrayRenderProps;
};
