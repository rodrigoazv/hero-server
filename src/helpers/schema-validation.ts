import type { Schema } from 'ajv';
import Ajv from 'ajv';

const ajv = new Ajv();

export class SchemaError extends Error {}
// eslint-disable-next-line import/prefer-default-export
export function validator(schema: Schema, body: any) {
  const compileValidator = ajv.compile(schema);

  if (!compileValidator(body) && compileValidator.errors) {
    throw new SchemaError(
      compileValidator.errors.map((err) => `${err.message}`).toString(),
    );
  }
}
