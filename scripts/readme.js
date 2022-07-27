
const fs = require('fs').promises;
const jsyaml = require('js-yaml');
const handlebars = require('handlebars');
const path = require('path');


handlebars.registerHelper('paragraphSplit', function(plaintext) {
  var i, output = '',
      lines = plaintext.split(/\r\n|\r|\n/g);
  for (i = 0; i < lines.length; i++) {
      if(lines[i]) {
          output += '\n' + '  # ' + lines[i];
      }
  }
  return new handlebars.SafeString(output);
});

// READ yaml file
// look for code block with language "yaml"
// parse yaml file
// return parsed yaml file
async function readYamlFile (file) { 
    var content = await fs.readFile(file, 'utf8');

    // parse yaml file
    var yaml = jsyaml.load(content);
    return yaml;
}

async function generateReadme(yaml) {
    const template = await fs.readFile(path.join(__dirname, "../template.handlebars"), 'utf8');
    const temp = handlebars.compile(template,);
    return temp(yaml)
}

(async () => {
    const x = await readYamlFile(path.join(__dirname, '../action.yml'));
    const y = await generateReadme(x)
    console.log(y);
})()
