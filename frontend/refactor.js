import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const userDir = path.join(componentsDir, 'user');
const adminDir = path.join(componentsDir, 'admin');

if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const oldPath = path.join(componentsDir, f);
  const newPath = path.join(userDir, f);
  fs.renameSync(oldPath, newPath);
});

files.forEach(f => {
  const filePath = path.join(userDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update imports pointing one level up (e.g. '../assets/...' to '../../assets/...')
  content = content.replace(/from\s+['"]\.\.\/([^'"]+)['"]/g, "from '../../$1'");
  
  // Unnamed imports like import '../index.css'
  content = content.replace(/import\s+['"]\.\.\/([^'"]+)['"]/g, "import '../../$1'");
  
  fs.writeFileSync(filePath, content);
});

const appPath = './src/App.jsx';
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  files.forEach(f => {
    const compName = f.replace('.jsx', '');
    appContent = appContent.replace(new RegExp(`from\\s+['"]\\.\\/components\\/${compName}['"]`, 'g'), `from './components/user/${compName}'`);
  });
  fs.writeFileSync(appPath, appContent);
}

console.log('Refactoring complete');
