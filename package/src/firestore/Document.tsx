import * as React from 'react';
import {
  UseDocumentStatus,
  UseDocumentSnapshot,
  UseDocumentMetadata,
  useDocument,
} from './useDocument';

export const CollectionStatus = UseDocumentStatus;
export type DocumentStatus = UseDocumentStatus;
export type DocumentSnapshot = UseDocumentSnapshot;
export type DocumentMetadata = UseDocumentMetadata;

export interface DocumentProps {
  path: string;
  loading?: React.ReactElement;
  unfound?: React.ReactElement;
  errored?: React.ReactElement;
  children: (
    snapshot: DocumentSnapshot,
    metadata: DocumentMetadata,
  ) => React.ReactElement | null;
}

export const Document: React.FC<DocumentProps> = ({
  path,
  loading,
  unfound,
  errored,
  children,
}) => {
  const [snapshot, metadata] = useDocument(path);
  if (metadata.status === UseDocumentStatus.Waiting) {
    return loading || null;
  } else if (metadata.status === UseDocumentStatus.Errored) {
    return errored || null;
  } else if (snapshot && snapshot.exists) {
    return children(snapshot, metadata);
  } else {
    return unfound || null;
  }
};
