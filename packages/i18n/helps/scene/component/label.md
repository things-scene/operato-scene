# label

```label``` is a component for static labeling that can define multilingual terms.

The order of multilingual application is as follows.
- Among the terms, the one that corresponds to the language currently in use
- If the i18n key is defined, the value of the i18next multilingual definition package is applied.
- Finally, the value defined in fallback is applied.

## Properties

- terms
  - User-defined multilingual term definitions. 
  - A language abbreviation is defined as a key, and a term is defined in that language.
- i18n key
  - The key of i18next multilingual definition package
- fallback
  - Default value
