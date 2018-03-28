const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');

const filename = 'Unit-config.js';

let questions = [
  {
    type: 'checkbox',
    message: 'Select units you want to compile',
    name: 'units',
    choices: [
      {
        name: 'Unit_1',
      },
      {
        name: 'Unit_2',
      },
      {
        name: 'Unit_3',
      },
      {
        name: 'Unit_4',
      },
      {
        name: 'Unit_5',
      },
      {
        name: 'Unit_6',
      },
      {
        name: 'Unit_7',
      },
      {
        name: 'Unit_8',
      },
      {
        name: 'Unit_9',
      },
      {
        name: 'Unit_10',
      },
      {
        name: 'Unit_11',
      },
      {
        name: 'Unit_12',
      },
      {
        name: 'Unit_13',
      },
      {
        name: 'Unit_14',
      },
      {
        name: 'Unit_15',
      },
      {
        name: 'Unit_16',
      },
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'You need to select atleast 1 unit';
      }
      return true;
    },
  }, {
    type: 'input',
    name: 'filename',
    message: 'Name of the output file (default : Unit-config.js)',
    validate: function (answer) {
      if (answer.length < 0) {
        answer.filename = 'Unit-config'
      }
      return true;
    }
  }
];



program
  .command('compile')
  .description('Working...')
  .action(() => {
    inquirer.prompt(questions).then(answer => {

      if (answer.filename == "") {
        answer.filename = 'Unit-config';
      }
      fs.truncate(`dist/${answer.filename}.js`, 0, err => { });
      var unitsArr = [];
      var unitsObj = {};
      answer.units.forEach(function (element) {
        unitsObj += element;
        let splitElem = element.split('_');
        unitsArr.push(splitElem[splitElem.length - 1]);
      }, this);

      Promise.resolve(
        unitsArr.forEach(function (element) {
          let importStr = `import unit${element} from Unit_${element};\n`;
          fs.appendFile(`dist/${answer.filename}.js`, importStr, (err, data) => {
            if (!err) {
              console.log(chalk.blue(`Written Unit ${element}`));
            }
          });
        }, this)).then(function () {

          function exportStatements() {
            let exportStatement = `\n\nexport default {\n`;
            let exportStatementEnd = `};`;
            fs.appendFile(`dist/${answer.filename}.js`, exportStatement, () => { });
            Promise.resolve(answer.units.forEach(function (element) {
              let unitExportStatement = `\t${element},\n`;
              fs.appendFile(`dist/${answer.filename}.js`, unitExportStatement, () => { });
            }, this)).then(function () {
              fs.appendFile(`dist/${answer.filename}.js`, exportStatementEnd, () => { });
            });
            console.log(chalk.bold.green('Generated Config file in dist folder'))
          }
          setTimeout(exportStatements, 600);
          figlet('By Bunnyweb', function (err, data) {
            if (err) {
              return
            }
            console.log(data)
          });
        });
    });
  });

program.parse(process.argv);
