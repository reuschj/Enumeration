# Enumeration
A JavaScript class to hold enumerated cases and values

## Installation
Install the module with NPM:

`$ npm i --save enumeration-class-js`

Import `Enumeration` into your project.

```
const { Enumeration } = require('enumeration-class-js');
```
or

```
import { Enumeration } from ('enumeration-class-js');
```

## Creating a New Enumeration
To create a new instance of the `Enumeration` class, you can pass one of the two options to the first parameter:
- An array with enum cases (as strings). By default, an integer will be assigned as the raw value, starting at 0. Any non-string item in the array will be ignored.
- An  object with keys and values. The keys will be your enum cases and the values will be the associated raw values.

To create a new `Enumeration` with an array:
```
// By default, raw values will be integers, starting at 0
const Weekdays = new Enumeration(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);
const today = Weekdays.THURSDAY
// today.rawValue = 4
```
If the `autoRawValueType` and `startingAt` parameters are omitted, the raw values will be integers, starting at 0. To customize this, you can pass another type to the `autoRawValueType` parameter (specify a string with the JavaScript type... if any invalid value is given, it will default to `'numbers'`). The `startingAt` parameter allows you to specify a starting point for integer raw values, other than 0. The `startingAt` parameter will be ignored if another type other than `'numbers'` is specified.:
```
// Raw values will be integers, starting at 1
const Weekdays = new Enumeration(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'], 'number', 1);
const today = Weekdays.THURSDAY
// today.rawValue = 5

// Raw values will be strings that match the enum case
const Weekdays = new Enumeration(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'], 'string');
const today = Weekdays.THURSDAY
// today.rawValue = "THURSDAY"

```

The other options besides, `'number'` and `'string'` are `'boolean'` (all raw values will be `true`) and `'object'` (all raw values will be `null`). These options are not that useful, but are there if needed. In general, when you need more control over the raw value, you can initialize it with an object. When you do so, you can manually specify the raw values for each enum case.

To create a new `Enumeration` with an object:
```
const Weekdays = new Enumeration({
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday'
});
```

When an object is passed as the first parameter, the `autoRawValueType` and `startingAt` parameters will be ignored, since you manually assigned the raw value in your object.

## `EnumeratedValue` Instances

Once created, the instance of `Enumeration` will be a read-only object with the same keys you specified as your enum cases. For each key, the value will be a new read-only instance of the `EnumeratedValue` class. Each `EnumeratedValue` instance holds two properties:

Property | Type | Notes
---- | ---- | ----
enumeratedCase | string | This holds a reference to your the enum case. This is useful to have if the raw value is an integer or something other than a copy of the enum case. When the `EnumeratedValue` object is assigned to a constant or variable, it gives a reference back to the enum case. Access it with dot notation (`today.enumeratedCase`) or with the getter method (`today.getEnumeratedCase()`).
rawValue | * | This holds the raw value of your enum case. Access it with dot notation (`today.rawValue`) or with the getter method (`today.getRawValue()`). 

## Methods

The `Enumeration` class has several methods:

For the examples, we will start with:

```
const Weekdays = new Enumeration(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);
```

#### keys()
Get array of keys:
```
Weekdays.keys();
// Returns: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
```

#### values()
Get array of values (each will be objects which are instances of `EnumeratedValue`):
```
Weekdays.values();
// Returns: [EnumeratedValue, EnumeratedValue, EnumeratedValue, EnumeratedValue, EnumeratedValue, EnumeratedValue, EnumeratedValue]
```

#### rawValues()
Get array of raw values:
```
Weekdays.rawValues();
// Returns: [0, 1, 2, 3, 4, 5, 6]
```

#### hasCase(caseName: string)
Check if enumerator has given case:
```
Weekdays.hasCase('MONDAY');
// Returns: true
Weekdays.hasCase('FOO');
// Returns: false
```

#### hasValue(value: EnumeratedValue)
Check if value (instance of `EnumeratedValue`) exists in enumerator:
```
today = Weekdays.FRIDAY;
Weekdays.hasValue(today);
// Returns: true
```

#### hasRawValue(rawValue: *)
Check if raw value exists in enumerator:
```
Weekdays.hasRawValue(2);
// Returns: true
```

#### getCase(value: EnumeratedValue)
Get first matching case for given value (instance of `EnumeratedValue`). Returns false if value not present.
```
today = Weekdays.FRIDAY;
Weekdays.getCase(today);
// Returns: "FRIDAY"
```

#### getCaseOfRawValue(rawValue: *)
Get first matching case for given raw value. Returns false if value not present.
```
Weekdays.getCaseOfRawValue(3);
// Returns: "WEDNESDAY"
```