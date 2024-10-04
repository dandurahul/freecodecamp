import { Document, Schema, Types, model } from 'mongoose';
import { EntityConstants } from '../../constants/entity-constants';
import { IEntityBase } from './contracts/i-entity.base';

export interface ISeoEntity extends IEntityBase, Document {
  title: string;
  keywords: string[];
  description: string;
  url: string;
}

export const ISeoEntitySchema = new Schema<ISeoEntity>({
  title: String,
  keywords: [String],
  description: String,
  url: String,
});

const Seo = model<ISeoEntity>(
  EntityConstants.SEO_MODEL_NAME, // Model name
  ISeoEntitySchema, // Schema
  EntityConstants.SEO_COLLECTION_NAME //collection name
);

export default Seo;
