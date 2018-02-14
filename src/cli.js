import program from 'commander';
import gendiff from '.';

export default () => {
  program
    .version('0.2.6')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format: default, plain, json')
    .action((firstfile, secondfile, options) =>
      console.log(gendiff(firstfile, secondfile, options.format)))
    .parse(process.argv);
};
