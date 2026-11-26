// Regenerate after editing the public footer or logo explanation.
const esbuild = require('esbuild');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const result = esbuild.buildSync({stdin:{contents:`import React from 'react'; import {renderToStaticMarkup} from 'react-dom/server'; import SiteFooter from './components/site-footer'; export default renderToStaticMarkup(React.createElement(SiteFooter));`,resolveDir:process.cwd(),loader:'tsx'},bundle:true,platform:'node',format:'cjs',jsx:'automatic',write:false});
const generated = {exports:{}};
vm.runInNewContext(result.outputFiles[0].text,{module:generated,exports:generated.exports,require,process,console,TextEncoder,TextDecoder,Buffer,queueMicrotask,setImmediate,clearImmediate,setTimeout,clearTimeout});
fs.writeFileSync(path.join(process.cwd(),'research/footer.html'),generated.exports.default);
