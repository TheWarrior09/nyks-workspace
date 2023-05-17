import { join } from 'path';
import telescope from '@osmonauts/telescope';

const protoDirs = [join(__dirname, './src/proto')];
const outPath = join(__dirname, './src/lib/codegen');

telescope({
  protoDirs,
  outPath,
  options: {
    prototypes: {
      methods: {
        fromJSON: true,
        toJSON: true,
      },
    },
  },
})
  .then(() => {
    console.log('✨ all done!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
