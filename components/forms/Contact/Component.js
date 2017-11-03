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
  fields: ['name', 'email'],
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
      fields: {name, email},
      handleSubmit,
      resetForm,
      } = this.props;
    const styles = require('./Component.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-xs-2">{label}</label>
        <div className={'col-xs-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" className="form-control" id={field.name} {...domOnlyProps(field)}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email', true)}
          <div className="form-group">
            <div className="col-xs-offset-2 col-xs-10">
              <button className="btn btn-success" type="submit">
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
