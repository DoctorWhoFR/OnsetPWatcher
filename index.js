const chokidar = require('chokidar');
const fs = require('fs') 
let jsont = require('./package.json');

const watcher = chokidar.watch('.', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});
  
function addToPackageJson(path) {
    if(!path.includes("node_modules\\") && path != "index.js" && path != "package.json" && path != "package-lock.json" && !path.includes("Nouveau document")){
        path = path.replace(/\\/g, "/")
        
        if(path.includes(".html") || path.includes(".js") || path.includes(".css") || path.includes(".png") || path.includes(".jpg") || path.includes(".ttf"))
        {
            if(!jsont.files.includes(path)){
                
                console.log('ADDED ASSETS FILE: ' + path)
                jsont.files.push(path);
                var clear = JSON.stringify(jsont);

                // Write data in 'Output.txt' . 
                fs.writeFile('package.json', clear, (err) => { 
                    
                    // In case of a error throw err. 
                    if (err) throw err; 
                }) 
            }
        }

        if(path.includes("client"))
        {
            if(!jsont.client_scripts.includes(path)){
                
                console.log('ADDED CLIENT FILE: ' + path)
                jsont.client_scripts.push(path);

                var clear = JSON.stringify(jsont);
                
                // Write data in 'Output.txt' . 
                fs.writeFile('package.json', clear, (err) => { 
                    
                    // In case of a error throw err. 
                    if (err) throw err; 
                }) 
            }
        } else {
            console.log("ALREADY HAVE" + path) 
        }

        if(path.includes("server"))
        {
            if(!jsont.server_scripts.includes(path)){
                
                console.log('ADDED SERVER FILE: ' + path)
                jsont.server_scripts.push(path);
                var clear = JSON.stringify(jsont);
                
                // Write data in 'Output.txt' . 
                fs.writeFile('package.json', clear, (err) => { 
                    
                    // In case of a error throw err. 
                    if (err) throw err; 
                }) 
            } else {
                console.log("ALREADY HAVE" + path) 
            }
        }
    }
}

function removeToPackageJson(path) {
    if(!path.includes("node_modules\\") && path != "index.js" && path != "package.json" && path != "package-lock.json" && !path.includes("Nouveau document")){
        path = path.replace(/\\/g, "/")
        
        if(path.includes(".html") || path.includes(".js") || path.includes(".css") || path.includes(".png") || path.includes(".jpg") || path.includes(".ttf"))
        {
            console.log(jsont.files)
            if(jsont.files.includes(path)){
                
                var yahooOnly = jsont.files.filter(function (entry) {
                    return entry !== path;
                });
                jsont.files = yahooOnly
                let jsonifyed = JSON.stringify(jsont);
                console.log(jsonifyed)
                // Write data in 'Output.txt' . 
                fs.writeFile('package.json', jsonifyed, (err) => { 
                    
                    // In case of a error throw err. 
                    if (err) throw err; 
                }) 
            }
        }

    }
}

// Something to use when events are received.
const log = console.log.bind(console);

watcher
  .on('add', path => addToPackageJson(path))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => removeToPackageJson(path));

