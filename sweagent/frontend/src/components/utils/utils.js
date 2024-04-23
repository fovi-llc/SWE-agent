// Define a function to import images dynamically
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return null; // Returning null to satisfy array-callback-return lint rule
  });
  return images;
}

export default importAll;
