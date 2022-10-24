# <img src="./absolutely.png" width="40" /> Absolutely

**Absolutely writes absolute imports for you so don't have to. Never type out `import { useState } from 'react'` again!**

## Features

Write your code, hit save, and the common imports you've specified in your `absolutely.json` file will be automagically added as imports to the top of the file!

![Absolutely in action](https://share.cleanshot.com/5frLi7)

## Set-up

1. Edit your VSCode settings with the `editor.codeActionsOnSave` property. Give it an array of actions to perform, and place Absolutely first. You probably only want to perform these actions in Javascript files to make sure it doesn't write in other file types.

```settings.json
"[javascript]": {
  "editor.codeActionsOnSave": [
    "source.absolutely",
    "source.organizeImports",
    "source.fixAll.eslint"
  ]
},
"[typescript]": {
  "editor.codeActionsOnSave": [
    "source.absolutely",
    "source.organizeImports",
    "source.fixAll.eslint"
  ]
}
```

2. Create an `absolutely.json` file in the root of your project. This JSON object should have keys of the common libraries you want to import from, and values of an array of the items from that library you want to watch for.

**Example:**

```absolutely.json
{
  "react": ["useState", "useEffect", "useCallback", "useRef"],
  "react-hook-form": ["useForm", "Controller"],
  "next/router": ["useRouter"],
  "components": ["Button", "Icon", "Box", "Input"],
}
```

## Limitations

Absolutely only works for a niche use-case: you import _everything_ as named imports from an _absolute_ destination. It does not work with default exports or any relative paths.

Additionally, it really only works well in conjunction with the ESLint plugin [`unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports). If you don't have this in your workflow, Absolutely will stupidly add duplicate imports. All Absolutely is doing is searching for the keywords you've specified in `absolutely.json`, and adding them as import statements to the top of the file. ESLint can then come in and remove duplicates and clean it up.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `editorcodeActionsOnSave`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

```

```
