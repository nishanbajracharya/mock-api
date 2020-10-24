type CollectionRoute = {
  collection?: string;
};

type CollectionItemProp = {
  title: string;
  route: string;
  createdAt?: number;
  updatedAt?: number;
  selected?: boolean;
  onClick?: () => any;
  collectionName?: string;
  fields?: DocumentFieldProp[];
};

type CollectionProp = {
  list: CollectionItemProp[];
};

type CollectionFormProps = {
  create: (collection: {
    title: string;
    route: string;
  }) => Promise<void> | undefined;
  handleClose: () => void;
};

type CollectionComponentProps = {
  collections?: CollectionProp;
  loading: BooleanSchema;
  selectedItem: number | null;
  setSelectedItem: (item: number | null) => any;
};

type CollectionDetailComponentProps = {
  collection: CollectionItemProp | null | undefined;
  collections?: CollectionItemProps[] | null | undefined;
  onDelete?: (collection: CollectionItemProp | null | undefined) => any;
};
