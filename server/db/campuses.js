const faker = require('faker');

let campuses;

if (!campuses) {
  campuses = new Array(4).fill(null).map(() => {
    const { image, address, lorem } = faker;
    return {
      name: `${address.city()}`,
      imageUrl: `${image.image()}`,
      address: `${address.streetAddress()}, ${address.city()}, ${address.stateAbbr()} ${address.zipCodeByState()}`,
      description: `${lorem.paragraph()}`,
    };
  });
}

module.exports = { campuses };
