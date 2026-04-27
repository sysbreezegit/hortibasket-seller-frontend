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

    // Remaining #cae4c5 instances
    // Selection backgrounds
    content = content.replace(/selection:bg-\[\#cae4c5\]/g, 'selection:bg-[#00C725]');
    content = content.replace(/selection:text-\[\#cae4c5\]/g, 'selection:text-[#0D140B]');
    
    // Remaining backgrounds (e.g. hover:bg-[#cae4c5]/20 or bg-[#cae4c5])
    content = content.replace(/bg-\[\#cae4c5\]\/10/g, 'bg-[#00C725]/10');
    content = content.replace(/bg-\[\#cae4c5\]\/20/g, 'bg-[#00C725]/20');
    content = content.replace(/bg-\[\#cae4c5\]\/40/g, 'bg-[#00C725]/40');
    // For pure solid bg-[#cae4c5], change it to the neon #00C725 for intense contrast
    content = content.replace(/bg-\[\#cae4c5\](?!\/)/g, 'bg-[#00C725]');
    
    // Remaining borders that somehow didn't get caught
    content = content.replace(/border-\[\#cae4c5\](?!\/)/g, 'border-[#0D140B]');
    content = content.replace(/border-\[\#cae4c5\]\/\d+/g, 'border-[#0D140B]');

    // Texts like text-[#cae4c5]
    content = content.replace(/text-\[\#cae4c5\]/g, 'text-[#3B5238]');

    // Any raw #cae4c5 in style objects or strings
    content = content.replace(/#cae4c5/g, '#00C725'); // default fallback to bright green

    // Any #fcfdfa text or raw leftover (except bg, we already caught bg)
    content = content.replace(/#fcfdfa/g, '#E3E0D8'); 

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated Part 2: ' + file);
    }
}
