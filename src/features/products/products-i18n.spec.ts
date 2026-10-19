import en from '../../../public/i18n/en.json';
import ru from '../../../public/i18n/ru.json';
import uz from '../../../public/i18n/uz.json';

function translationLeafKeys(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const keyPath = prefix ? `${prefix}.${key}` : key;

    if (typeof child === 'object' && child !== null) {
      return translationLeafKeys(child, keyPath);
    }

    return [keyPath];
  });
}

describe('products translations', () => {
  it('provides matching product, detail, and cart keys in every supported language', () => {
    expect(translationLeafKeys(en.productsPage).sort()).toEqual(translationLeafKeys(ru.productsPage).sort());
    expect(translationLeafKeys(en.productsPage).sort()).toEqual(translationLeafKeys(uz.productsPage).sort());
    expect(translationLeafKeys(en.productDetail).sort()).toEqual(translationLeafKeys(ru.productDetail).sort());
    expect(translationLeafKeys(en.productDetail).sort()).toEqual(translationLeafKeys(uz.productDetail).sort());
    expect(translationLeafKeys(en.cartPage).sort()).toEqual(translationLeafKeys(ru.cartPage).sort());
    expect(translationLeafKeys(en.cartPage).sort()).toEqual(translationLeafKeys(uz.cartPage).sort());
  });
});
