import defaultRender from './defaultRender';
import plainRender from './plainRender';

export default (type) => {
  switch (type) {
    case 'default':
      return defaultRender;
    case 'plain':
      return plainRender;
    default:
      return defaultRender;
  }
};
