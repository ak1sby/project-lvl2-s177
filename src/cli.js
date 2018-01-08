import program from 'commander';
import gendiff from '.';

export default () => {
  program
    .version('0.0.2')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action((firstfile, secondfile) => console.log(gendiff(firstfile, secondfile)))
    .parse(process.argv);
};
