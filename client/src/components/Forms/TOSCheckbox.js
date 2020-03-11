import React from 'react';

function TOSCheckbox(props) {
  return (
    <div className="form-group form-checkbox">
      <input id="tos-checkbox" name="tos_agreement" type="checkbox" />
      <label id="tos-checkbox-label" name={props.name} htmlFor="tos-checkbox"><a href={props.termsLink}>I agree</a></label>
    </div>
  );
}

export default TOSCheckbox;