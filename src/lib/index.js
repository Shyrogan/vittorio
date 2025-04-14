import axios from "axios";
import { load } from "cheerio";

/**
 * @param {Function} fetch - Custom fetch implementation
 * @param {{ brand: string, url: string }} brand 
 **/
export async function scrape(fetch, brand) {
  if (!brand) return undefined
  try {
    const response = await fetch(brand.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = load(await response.text());
    const contactBlock = $('html > body.skin-green.body-catalogo > div.container > section.content > div.row > div.col-md-4 > div.box > div.box-body');

    // Extract social media links
    /** @type {Record<string, string>} **/
    const socialMedia = {};
    contactBlock.find('a[href*="facebook.com"]').each((i, el) => {
      socialMedia.facebook = $(el).attr('href');
    });
    contactBlock.find('a[href*="x.com"], a[href*="twitter.com"]').each((i, el) => {
      socialMedia.twitter = $(el).attr('href');
    });
    contactBlock.find('a[href*="instagram.com"]').each((i, el) => {
      socialMedia.instagram = $(el).attr('href');
    });
    contactBlock.find('a[href*="linkedin.com"]').each((i, el) => {
      socialMedia.linkedin = $(el).attr('href');
    });

    const contactInfo = {
      address: contactBlock.find('strong:contains("Address")').next('p').text().trim(),
      phone: contactBlock.find('strong:contains("Phone")').next('p').text().trim(),
      email: contactBlock.find('strong:contains("E-mail")').next('p').text().trim(),
      website: contactBlock.find('strong:contains("Web")').next('p').text().trim(),
      socialMedia: socialMedia
    };

    return {
      brand: brand.brand,
      url: brand.url,
      contact: contactInfo,
      status: 'success',
      statusCode: response.status
    };
  } catch (error) {
    return {
      brand: brand.brand,
      url: brand.url,
      error: error.message,
      status: 'failed',
      statusCode: error.response?.status || 0
    };
  }
}
