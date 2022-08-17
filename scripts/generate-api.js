const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');
const routeName = process.argv[2];

//if the feature name is not PascalCase then exit
if (routeName[0] !== routeName[0].toLowerCase() || !routeName.match(/^[a-z]+-*[a-z]+$/)) {
  console.log('=============================');
  console.log('route name must be lower-case and hyphenated');
  console.log('=============================');
  process.exit(1);
}

const routeDir = path.join(__dirname, '..', 'src', 'pages', 'api', routeName);

const checkDir = (dir) => {
  if (fs.existsSync(dir)) {
    console.log('=============================');
    console.log('route already exists');
    console.log('=============================');
    process.exit(1);
  }
};

const createRoute = () => {
  checkDir(routeDir);
  // copt the entire ./api-example directory to the new route directory
  const exampleDir = path.join(__dirname, 'api-example');
  fse.copySync(exampleDir, routeDir);
};

createRoute();
