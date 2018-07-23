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
  enableReinitialize: true,
  fields: ['firstName', 'lastName', 'email', 'comment', 'newsletter'],
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
    valid: PropTypes.bool.isRequired,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    newsletterText: PropTypes.string,
    quote: PropTypes.bool
  };

  static defaultProps = {
    submitText: 'Submit',
    cancelText: 'Cancel',
    newsletterText: 'Sign up for our newsletter!',
    quote: false
  };

  render() {
    const styles = require('./Component.scss');

    const {
      asyncValidating,
      fields: {firstName, lastName, email, comment, newsletter},
      handleSubmit,
      // resetForm,
      submitText,
      cancelText,
      onCancel,
      newsletterText,
      quote
    } = this.props;

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
        {quote && <div className={'form-group ' + comment.name + (comment.error && comment.touched ? ' has-error' : '')}>
          <div className={styles.inputGroup} data-label="Message" data-error={comment.error && comment.touched && comment.error}>
            <textarea placeholder="i.e., Buongiorno!" id={comment.name} className="form-control" {...domOnlyProps(comment)}></textarea>
          </div>
        </div>}
        {quote && <div className={'form-group ' + newsletter.name}>
          <label>
            <input defaultChecked id={newsletter.name} type="checkbox" {...domOnlyProps(newsletter)} />
            <span>{newsletterText}</span>
          </label>
        </div>}
        <div className="form-group submit">
          {onCancel && <button className="btn btn-danger" onClick={onCancel}>{cancelText}</button>}
          <button className="btn btn-success" type="submit">{submitText}</button>
          {/*<button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
            <i className="fa fa-undo"/> Reset
          </button>*/}
        </div>
      </form>
    );
  }
}
