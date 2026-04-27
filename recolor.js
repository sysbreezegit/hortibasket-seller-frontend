const fs = require('fs');
const path = require('path');

const dir = 'd:/hortibasket-admin/hortibasket-admin-frontend';

function walk(currDir) {
    let results = [];
    if (!fs.existsSync(currDir)) return results;
    const list = fs.readdirSync(currDir);
    list.forEach(file => {
        const fullPath = path.join(currDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk(path.join(dir, 'app')).concat(walk(path.join(dir, 'components')));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Backgrounds
    content = content.replace(/bg-\[\#fcfdfa\]/g, 'bg-[#E3E0D8]'); 
    content = content.replace(/bg-white/g, 'bg-[#F2F0EA]'); 

    // Text & main darks
    content = content.replace(/#254222/g, '#0D140B'); // darker almost black
    content = content.replace(/#4F684C/g, '#3B5238'); // darker muted

    // Borders: Make them all thick black instead of light green!
    // we want border-[#cae4c5]/anything to become border-[#0D140B]
    content = content.replace(/border-\[\#cae4c5\]\/\d+/g, 'border-[#0D140B]');
    content = content.replace(/border-\[\#cae4c5\]/g, 'border-[#0D140B]');

    // Shadows
    content = content.replace(/shadow-\[([^\]]+)#cae4c5\]/g, 'shadow-[$1#0D140B]');

    // Bright accents 
    // Wait, let's make #82B34B (muted lime) into a very bright tech-botanical green: #32D400 or a vibrant #FF4400 (Orange)?
    // The prompt: "litle more bright and dakr clouts user this one for better prompt"
    // So let's use a very BRIGHT green text/bg instead of the muted #82B34B
    content = content.replace(/#82B34B/g, '#00C725');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated: ' + file);
    }
}
