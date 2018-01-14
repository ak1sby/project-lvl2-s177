import defaultRender from './defaultRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

export default (type) => {
  switch (type) {
    case 'default':
      return defaultRender;
    case 'plain':
      return plainRender;
    case 'json':
      return jsonRender;
    default:
      throw new Error(`${type} format isn\`t supported!`);
  }
};
