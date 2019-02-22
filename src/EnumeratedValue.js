
'use strict';

/**
 * Holds enumerated value with case and raw value
 */
class EnumeratedValue {
  /**
   * @constructor
   * @param {string} enumeratedCase
   * @param {*} rawValue
   * @return {EnumeratedValue}
   */
  constructor(enumeratedCase, rawValue) {
    this._setEnumeratedCase(enumeratedCase);
    this._setRawValue(rawValue);
    return Object.freeze(this);
  }

  /**
   * Setter for enumerated case
   * @param {string} enumeratedCase
   * @private
   */
  _setEnumeratedCase(enumeratedCase) {
    this.enumeratedCase = enumeratedCase;
  }

  /**
   * Setter for raw value
   * @param rawValue
   * @private
   */
  _setRawValue(rawValue) {
    this.rawValue = rawValue;
  }

  /**
   * Getter for enumerated case
   * @return {string}
   */
  getEnumeratedCase() {
    return this.enumeratedCase;
  }

  /**
   * Getter for raw value
   * @return {*}
   */
  getRawValue() {
    return this.rawValue;
  }

}

// Export
module.exports = EnumeratedValue;