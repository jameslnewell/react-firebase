import * as React from 'react';
import {
  UseCollectionStatus,
  UseCollectionSnapshot,
  UseCollectionMetadata,
  useCollection,
} from './useCollection';

export const CollectionStatus = UseCollectionStatus;
export type CollectionStatus = UseCollectionStatus;
export type CollectionSnapshot = UseCollectionSnapshot;
export type CollectionMetadata = UseCollectionMetadata;

export interface CollectionProps {
  path: string;
  loading?: React.ReactElement;
  empty?: React.ReactElement;
  errored?: React.ReactElement;
  children: (
    snapshot: CollectionSnapshot,
    metadata: CollectionMetadata,
  ) => React.ReactElement | null;
}

export const Collection: React.FC<CollectionProps> = ({
  path,
  loading,
  empty,
  errored,
  children,
}) => {
  const [snapshot, metadata] = useCollection(path);
  if (metadata.status === UseCollectionStatus.Waiting) {
    return loading || null;
  } else if (metadata.status === UseCollectionStatus.Errored) {
    return errored || null;
  } else if (snapshot && !snapshot.empty) {
    return children(snapshot, metadata);
  } else {
    return empty || null;
  }
};
