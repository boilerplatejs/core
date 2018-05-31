import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {reduxForm} from 'redux-form';
import Validator from './Validator';

const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  error,
  ...domProps }) => domProps;

@reduxForm({
  form: 'contact',
  fields: ['firstName', 'lastName', 'email'],
  validate: Validator
  // asyncBlurFields: ['email'],
  // asyncValidate: (data, dispatch, {send}) => !data.email ? Promise.resolve({}) : send(data)
})

export default class extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  };

  render() {
    const {
      asyncValidating,
      fields: {firstName, lastName, email},
      handleSubmit,
      resetForm,
      } = this.props;
    const styles = require('./Component.scss');
    const renderInput = (field, label, placeholder, showAsyncValidating) =>
      <div className={'form-group ' + field.name + (field.error && field.touched ? ' has-error' : '')}>
        <div className={styles.inputGroup} data-label={label} data-error={field.error && field.touched && field.error}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input placeholder={placeholder || label} type="text" className="form-control" id={field.name} {...domOnlyProps(field)}/>
        </div>
      </div>;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {renderInput(firstName, 'First Name', 'i.e., Stella')}
        {renderInput(lastName, 'Last Name', 'i.e., Spaghetti')}
        {renderInput(email, 'Email Address', 'i.e., stella@spaghetti.com', true)}
        <div className="form-group submit">
          <button className="btn btn-success" type="submit">Sign Up</button>
          {/*<button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
            <i className="fa fa-undo"/> Reset
          </button>*/}
        </div>
      </form>
    );
  }
}
