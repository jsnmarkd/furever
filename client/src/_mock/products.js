import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Custom Pet Portrait',
  'Loss of Dog Candle',
  'Pet Remembrance Portrait',
  'Pet Angel Paw Ornament',
  'Oak Rainbow Pet Memorial ',
  'Personalized Dog Urn',
  'Custom Pawprint Dog Tag',
  'Pet Fur Keepsake',
];

const PRODUCT_LINK = [
  'https://www.etsy.com/ca/listing/858844567/pet-portrait-custom-and-personalized-pet?click_key=2f33b04f3085fcbfb3e074d3f27034331dc7e510%3A858844567&click_sum=01fe4030&ref=search2_top_narrowing_intent_modules_top_rated-1&frs=1&sts=1',
  'https://www.etsy.com/ca/listing/1414132847/personalized-pet-memorial-gift-custom?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+memorial+candle&ref=sr_gallery-1-6&pro=1&sts=1&organic_search_click=1',
  'https://www.etsy.com/ca/listing/1226169122/custom-memorial-dog-passing-gift-o-pet?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+memorial&ref=sc_gallery-1-9&pro=1&plkey=dd79bb96ed995d44095e667579143fa29ef28b7c%3A1226169122',
  'https://www.etsy.com/ca/listing/1130183801/pet-memorial-ornament-paw-with-wings?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+memorial&ref=sr_gallery-2-11&etp=1&sts=1&organic_search_click=1',
 'https://www.etsy.com/ca/listing/1225852242/oak-rainbow-bridge-pet-sympathy-pet?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+memorial&ref=sr_gallery-2-36&pro=1&sts=1&organic_search_click=1',
'https://www.etsy.com/ca/listing/1408873545/personalized-dog-urn-pet-urn-cat-urn-pet?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+urn&ref=sr_gallery-1-6&sts=1&organic_search_click=1',
'https://www.etsy.com/ca/listing/1278042634/custom-pawprint-cremation-necklace?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+urn&ref=sc_gallery-1-14&pro=1&plkey=a923c1a4a712670dc648ad2bc44c4c087c95bc17%3A1278042634',
'https://www.etsy.com/ca/listing/1412732467/pet-fur-memorialdog-remembrance?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=dog+urn&ref=sc_gallery-2-14&pro=1&frs=1&plkey=c98142c9125e3bf9d7975d5c75cacd80abc8a081%3A1412732467',
];


// const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.png`,
    name: PRODUCT_NAME[index],
    link: PRODUCT_LINK[index],
  };
});

export default products;
