import importAll from './utils.js';

const images = importAll(require.context('../../assets/repo_icons', false, /\.(png|jpe?g|svg)$/));

const instanceToLogo = (instance) => {
  const repo = instance.instance_id.split('__')[0];
  return (
      <img src={images[`${repo}.png`]} alt={repo} />
  )
}

const instanceToSelectOption = (instance) => {
  var selectText = instance.instance_id.replace('__', '/');
  const lastHyphenIndex = selectText.lastIndexOf('-');
  const repo = selectText.substring(0, lastHyphenIndex);
  const id = selectText.substring(lastHyphenIndex + 1);
  return `${repo} (${id})`;
}

export {
  instanceToLogo,
  instanceToSelectOption,
};