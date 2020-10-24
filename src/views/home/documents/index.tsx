import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import DocumentSidebar from './DocumentSidebar';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCollection } from 'react-firebase-hooks/firestore';

import DocumentForm from './DocumentForm';
import Modal from '../../../components/Modal';
import DocumentDetails from './DocumentDetails';
import documentService from '../../../services/document';
import { getDocumentList } from '../../../services/collection';

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100% - 52px)',
  },
  sidebar: {
    height: '100%',
    paddingRight: 0,
    borderRight: '1px solid #ddd',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: 'none',
    border: 'none',
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '80vw',
    backgroundColor: theme.palette.background.paper,
  },
  modalHeaderText: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
}));

function Document(props: DocumentComponentProps) {
  const params = useParams<CollectionRoute>();

  const classes = useStyles();

  const [editData, setEditData] = useState<DocumentData | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [documents, loading] = useCollection(props.collection?.route ? getDocumentList(props.collection?.route) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  useEffect(() => {
    setSelectedItem(null);
  }, [params.collection]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setEditData(null);
  };

  function addDocument(document: DocumentData) {
    return documentService.addDocument(params.collection, document);
  }

  function editDocument(document: DocumentData) {
    return documentService.editDocument(params.collection, selectedItem, document);
  }

  function handleEdit(document: DocumentData) {
    setEditData(document);

    handleOpen();
  }

  return <Grid container className={classes.container}>
    <Grid item xs={12} sm={4} className={classes.sidebar}>
      <DocumentSidebar
        handleOpenModal={handleOpen}
        collection={params.collection}
        documents={documents?.docs}
        loading={loading}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </Grid>
    <Grid item xs={12} sm={8}>
      <DocumentDetails
        document={selectedItem !== null && documents ? documents?.docs.find(doc => doc.id === selectedItem) : null}
        onEdit={handleEdit}
      />
    </Grid>

    <Modal
      isOpen={open}
      className={classes.modal}
      onRequestClose={handleClose}
    >
      <div className={classes.paper}>
        <div className={classes.modalHeaderText}>Enter document details</div>
        <DocumentForm initialValues={editData} submit={editData ? editDocument : addDocument} handleClose={handleClose} />
      </div>
    </Modal>
  </Grid>;
}

export default Document;
