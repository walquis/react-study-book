# Export - Exposing to other files

## Modules can be created to export and import code between files.
From https://www.taniarascia.com/es6-syntax-and-feature-overview...

`index.html`
```
<script src="export.js"></script>
<script type="module" src="import.js"></script>
```

export.js
```
let func = (a) => a + a
let obj = {}
let x = 0

export {func, obj, x}
```

import.js
```
import {func, obj, x} from './export.js'

console.log(func(3), obj, x)
```

## From [Exercism.org](https://exercism.org/tracks/javascript/concepts/basics)

To make functions, constants, or variables available in other files, they need to be exported using the `export` keyword. Another file may then import these using the `import` keyword. This is also known as the module system.

A great example is how all the tests work. Each exercise has at least one file, for example `lasagna.js`, which contains the implementation. Additionally, there is at least one other file, for example `lasagna.spec.js`, that contains the tests.

This file imports the public (i.e. exported) entities to test the implementation.

### Using the default export
From [Developer.Mozilla.org](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export).

If we want to export a single value or to have a fallback value for your module, you could use a default export:

```
// module "my-module.js"

export default function cube(x) {
  return x * x * x;
}
```
Then, in another script, it is straightforward to import the default export:
```
import cube from './my-module.js';
console.log(cube(3)); // 27
```

## Import - static or dynamic

### static import - a declaration

The static import declaration is used to import read-only live bindings which are exported by another module. The imported bindings are called live bindings because they are updated by the module that exported the binding, but cannot be modified by the importing module.

**`import` declarations can only be present in modules**, and only at the top-level (i.e. not inside blocks, functions, etc.). If an import declaration is encountered in non-module contexts (for example, \<script> tags without type="module", `eval`, `new Function`, which all have "script" or "function body" as parsing goals), a SyntaxError is thrown. To load modules in non-module contexts, use the dynamic import syntax instead.

### static import syntax
```
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { default as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2, /* … */ } from "module-name";
import { "string name" as alias } from "module-name";
import defaultExport, { export1, /* … */ } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

### dynamic import() - a function call
