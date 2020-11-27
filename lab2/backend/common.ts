import 'source-map-support/register';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install({
    environment: 'node',
    hookRequire: true,
});
