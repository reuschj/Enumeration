
'use strict';

const EnumeratedValue = require('./EnumeratedValue');

/**
 * Class to hold enumerated cases and values
 */
class Enumeration {
  /**
   * @constructor
   * @param {Array|Object} enumCases
   * @param {string} autoRawValueType
   * @param {number} startingAt
   * @return {Enumeration}
   * @throws {Error}
   */
  constructor(enumCases, autoRawValueType = 'number', startingAt = 0) {

    // Throws error if enum cases is not valid
    this._validateEnumCases(enumCases);

    if (enumCases instanceof Array) {
      this._createFromArray(enumCases, autoRawValueType, startingAt);
    } else {
      this._createFromObject(enumCases);
    }

    return Object.freeze(this);
  }

  /**
   * Validates enum cases input
   * Can be overridden by subclass
   * @param {Array|Object} enumCases
   * @private
   */
  _validateEnumCases(enumCases) {
    if (typeof enumCases !== 'object') {
      throw new Error(`A ${this.constructor.name} must be initialized with an object or array.`);
    }
  }

  /**
   * Create from array
   * Can be overridden by subclass
   * @param {Array} enumCases
   * @param {string} autoRawValueType
   * @param {number} startingAt
   * @private
   */
  _createFromArray(enumCases, autoRawValueType = 'number', startingAt = 0) {
    // If an array is passes to enumCases param, we will assign auto raw values based on autoRawValueType and startingAt parms
    let counter = typeof startingAt === 'number' ? parseInt(startingAt) : 0;
    let getRawValue;
    switch (autoRawValueType) {
      // If type 'string' is specified, we will assign a raw value that matches the enum case.
      case 'string':
        getRawValue = (enumCase) => { return enumCase };
        break;
      // If type 'boolean' is specified, we will assign true as the raw value.
      case 'boolean':
        getRawValue = () => { return true };
        break;
      // If type 'object' is specified, we will assign null as the raw value.
      case 'object':
        getRawValue = () => { return null };
        break;
      default:
        // By default, we will assign an integer value from the counter as the raw value
        getRawValue = () => { return counter }
    }
    enumCases.map((enumCase) => {
      // We will only accept the enum case if it's a string
      if (typeof enumCase === 'string') {
        this[enumCase] = new EnumeratedValue(enumCase, getRawValue(enumCase));
        counter += 1;
      }
    });
  }

  /**
   * Create from object
   * Can be overridden by subclass
   * @param {Object} enumCases
   * @private
   */
  _createFromObject(enumCases) {
    // If an object is passed, we will use the specific values given as raw values.
    for (const key in enumCases) {
      this[key] = new EnumeratedValue(key, enumCases[key]);
    }
  }

  /**
   * Get array of keys
   * @return {Array<string>}
   */
  keys() {
    const keys = [];
    for (const key in this) {
      keys.push(key);
    }
    return keys;
  }

  /**
   * Get array of values
   * @return {Array<EnumeratedValue>}
   */
  values() {
    const values = [];
    for (const key in this) {
      values.push(this[key]);
    }
    return values;
  }

  /**
   * Get array of raw values
   * @return {Array<string>}
   */
  rawValues() {
    const rawValues = [];
    for (const key in this) {
      rawValues.push(this[key].rawValue);
    }
    return rawValues;
  }

  /**
   * Check if enumerator has given case
   * @param {string} caseName
   * @return {boolean}
   */
  hasCase(caseName) {
    return this.hasOwnProperty(caseName);
  }

  /**
   * Check if value exists in enumerator
   * @param {EnumeratedValue} value
   * @return {boolean}
   */
  hasValue(value) {
    for (const key in this) {
      if (this[key] === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if raw value exists in enumerator
   * @param {*} rawValue
   * @return {boolean}
   */
  hasRawValue(rawValue) {
    for (const key in this) {
      if (this[key].rawValue === rawValue) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get first matching case for given value
   * Returns false if value not present
   * @param {EnumeratedValue} value
   * @return {string}
   */
  getCase(value) {
    for (const key in this) {
      if (this[key] === value) {
        return key;
      }
    }
    return false;
  }

  /**
   * Get first matching case for given raw value
   * Returns false if raw value not present
   * @param {*} rawValue
   * @return {string}
   */
  getCaseOfRawValue(rawValue) {
    for (const key in this) {
      if (this[key].rawValue === rawValue) {
        return key;
      }
    }
    return false;
  }

  /**
   * Get first matching case for given raw value and return the EnumeratedValue
   * @param {*} rawValue
   * @return {EnumeratedValue}
   * @throws {Error}
   */
  getEnumeratedValue(rawValue) {
    const enumeratedCase = this.getCaseOfRawValue(rawValue);
    if (!enumeratedCase) {
      throw new Error(`Could not find an enumerated value for the raw value: "${rawValue}".`);
    }
    return this[enumeratedCase];
  }
};

// Export
module.exports = Enumeration;