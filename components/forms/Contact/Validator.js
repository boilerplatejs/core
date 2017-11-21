import memoize from 'lru-memoize';
import {createValidator, required, email} from '@vitruvian-tech/app-studio-core/lib/Validator';

export default memoize(10)(createValidator({
  name: [required],
  email: [required, email]
}));
