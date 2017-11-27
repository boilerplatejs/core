import memoize from 'lru-memoize';
import {createValidator, required, email} from '@machete-platform/core-bundle/lib/Validator';

export default memoize(10)(createValidator({
  name: [required],
  email: [required, email]
}));
