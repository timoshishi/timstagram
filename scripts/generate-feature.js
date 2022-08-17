const fs = require('fs');
const path = require('path');

const featureName = process.argv[2];

//if the feature name is not PascalCase then exit
if (featureName[0] !== featureName[0].toUpperCase() || featureName.match(/[^a-z]/gi)) {
  console.log('=============================');
  console.log('Feature name must be PascalCase');
  console.log('=============================');
  process.exit(1);
}

const featureDir = path.join(__dirname, '..', 'src', 'features', featureName);

const featureDirStructure = ['api', 'assets', 'components', 'hooks', 'stores', 'types', 'utils'];

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    console.log('=============================');
    console.log('directory already exists');
    console.log('=============================');
    process.exit(1);
  }
};

const createFeatureDir = () => {
  createDir(featureDir);
  featureDirStructure.forEach((dir) => createDir(path.join(featureDir, dir)));
};
//write a file called index.tsx to the feature directory
const createIndexFile = () => {
  const indexFile = path.join(featureDir, 'index.tsx');
  const indexFileContent = `export default {};
`;
  fs.writeFileSync(indexFile, indexFileContent);
};
createFeatureDir();
createIndexFile();
