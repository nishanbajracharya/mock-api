type DocumentComponentProps = {
  collection: CollectionItemProp | null | undefined;
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
  document: DocumentItemProp | undefined | null;
  onEdit?: (document: DocumentData) => any;
};

type FieldRowProp = {
  field: DocumentFieldProp;
};

type DocumentFormProps = {
  initialValues?: DocumentDate;
  submit: (document: DocumentData) => Promise<void> | undefined;
  handleClose: () => void;
};

type DocumentFieldComponentProps = {
  values: DocumentData;
  arrayHelpers: FieldArrayRenderProps;
};
