import type {
  PricingShortDTO,
  PricingDTO,
  BlockDTO,
  PricingEntryDTO,
  PricingRangeDTO,
  StaticPricingRangeDTO,
  AccoCardDTO,
  AccoCardContentDTO,
  PhotoDTO,
  TextDTO,
  PhotoGalleryDTO,
  AmenitiesCoreDTO,
  AccoDescriptionDTO,
  CardContentDTO,
} from './serialized.ts';
import type {
  PricingShort,
  Text,
  Pricing,
  Block,
  AccoCard,
  Photo,
  PhotoGallery,
  AmenitiesCore,
  AccoDescription,
} from './blocks.ts';
import type {
  PricingEntry,
  StaticPricingRange,
  PricingRange,
  AccoCardContent,
  CardContent,
} from './sub.ts';
import type { Dinero } from 'dinero.js';
import { dinero } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { type DateTime, DateTime as luxon } from 'luxon';
import { randomID } from '$lib/names/gen.ts';

export interface I18nFacade {
  translateFunc: (ref: string) => string;
  formatFunc: (formatter: string, props: Record<string, any>) => string;
  formatMoneyFunc: (d: Dinero<number>) => string;
  formatDateFunc: (d: DateTime) => string;
}

export const mapBlock = (jb: BlockDTO, f: I18nFacade): Block => {
  if (!jb) return undefined;

  switch (jb.kind) {
    case 'text':
      return mapText(jb, f);
    case 'photo':
      return mapPhoto(jb, f);
    case 'gallery':
      return mapGallery(jb, f);
    case 'pricing':
      return mapPricing(jb, f);
    case 'pricing-short':
      return mapPricingShort(jb, f);
    case 'amenities-core':
      return mapAmenities(jb, f);
    case 'acco-card':
      return mapAccoCard(jb, f);
    case 'acco-description':
      return mapAccoDescription(jb, f);
  }
  return jb;
};

export const serializeBlock = (jb: Block): BlockDTO => {
  if (!jb) return undefined;

  switch (jb.kind) {
    case 'text':
      return serializeText(jb);
    case 'photo':
      return serializePhoto(jb);
    case 'gallery':
      return serializeGallery(jb);
    case 'pricing':
      return serializePricing(jb);
    case 'pricing-short':
      return serializePricingShort(jb);
    case 'amenities-core':
      return serializeAmenities(jb);
    case 'acco-card':
      return serializeAccoCard(jb);
    case 'acco-description':
      return serializeAccoDescription(jb);
  }
  return jb;
};

export const mapAccoDescription = (jp: AccoDescriptionDTO, f: I18nFacade): AccoDescription => {
  return {
    id: jp.id,
    kind: 'acco-description',
    content: {
      ref: jp.content.ref,
      translatedRef: f.translateFunc(jp.content.ref) ?? '',
      minHeight: jp.content.minHeight,
      textFontSize: jp.content.textFontSize,
      headerFontSize: jp.content.headerFontSize,
    },
  };
};

export const serializeAccoDescription = (jp: AccoDescription): AccoDescriptionDTO => {
  return {
    id: jp.id,
    kind: 'acco-description',
    content: {
      ref: jp.content.ref,
      minHeight: jp.content.minHeight,
      textFontSize: jp.content.textFontSize,
      headerFontSize: jp.content.headerFontSize,
    },
  };
};

export const mapAmenities = (jp: AmenitiesCoreDTO, f: I18nFacade): AmenitiesCore => {
  return {
    id: jp.id,
    kind: 'amenities-core',
    content: {
      peopleMin: jp.content.peopleMin,
      peopleMax: jp.content.peopleMax,
      size: jp.content.size,
      formattedSize: f.formatFunc('size', { size: jp.content.size }),
      bedRooms: jp.content.bedRooms,
      bathRooms: jp.content.bathRooms,
      pets: jp.content.pets,
      showPets: jp.content.showPets,
      wifi: jp.content.wifi,
      showWifi: jp.content.showWifi,
      smoking: jp.content.smoking,
      showSmoking: jp.content.showSmoking,
      ac: jp.content.ac,
      showAc: jp.content.showAc,
      tv: jp.content.tv,
      showTv: jp.content.showTv,
      parking: jp.content.parking,
      showParking: jp.content.showParking,
    },
  };
};

export const serializeAmenities = (jp: AmenitiesCore): AmenitiesCoreDTO => {
  return {
    id: jp.id,
    kind: 'amenities-core',
    content: {
      peopleMin: jp.content.peopleMin,
      peopleMax: jp.content.peopleMax,
      size: jp.content.size,
      bedRooms: jp.content.bedRooms,
      bathRooms: jp.content.bathRooms,
      pets: jp.content.pets,
      showPets: jp.content.showPets,
      wifi: jp.content.wifi,
      showWifi: jp.content.showWifi,
      smoking: jp.content.smoking,
      showSmoking: jp.content.showSmoking,
      ac: jp.content.ac,
      showAc: jp.content.showAc,
      tv: jp.content.tv,
      showTv: jp.content.showTv,
      parking: jp.content.parking,
      showParking: jp.content.showParking,
    },
  };
};

export const mapGallery = (jp: PhotoGalleryDTO, f: I18nFacade): PhotoGallery => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      photos: jp.content.photos.map((p) => mapPhoto(p, f)),
      gridPhotoWidth: jp.content.gridPhotoWidth,
    },
  };
};

export const serializeGallery = (jp: PhotoGallery): PhotoGalleryDTO => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      photos: jp.content.photos.map((p) => serializePhoto(p)),
      gridPhotoWidth: jp.content.gridPhotoWidth,
    },
  };
};

export const mapText = (jp: TextDTO, f: I18nFacade): Text => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      ref: jp.content.ref,
      translation: f.translateFunc(jp.content.ref),
      minHeight: jp.content.minHeight,
      textFontSize: jp.content.textFontSize,
      headerFontSize: jp.content.headerFontSize,
    },
  };
};

export const serializeText = (jp: Text): TextDTO => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      ref: jp.content.ref,
      minHeight: jp.content.minHeight,
      textFontSize: jp.content.textFontSize,
      headerFontSize: jp.content.headerFontSize,
    },
  };
};

export const mapAccoCard = (jp: AccoCardDTO, f: I18nFacade): AccoCard => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      cardContent: mapAccoCardContent(jp.content.cardContent, f),
      displayName: jp.content.displayName,
    },
  };
};

export const serializeAccoCard = (jp: AccoCard): AccoCardDTO => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      cardContent: serializeCardContent(jp.content),
      displayName: jp.content.displayName,
    },
  };
};

export const mapCardContent = (jp: CardContentDTO, f: I18nFacade): CardContent => {
  const acc: AccoCardContent = {
    coverPhoto: mapPhoto(jp.coverPhoto, f),
    blocks: jp.blocks.map((b) => mapBlock(b, f)),
  };
  if (jp.slug) {
    acc.slug = jp.slug;
    acc.translatedSlug = f.translateFunc(jp.slug);
  } else {
    acc.slug = randomID();
    acc.translatedSlug = '';
  }
  return acc;
};

export const serializeCardContent = (jp: CardContent): CardContentDTO => {
  return {
    coverPhoto: serializePhoto(jp.coverPhoto),
    slug: jp.slug,
    blocks: jp.blocks.map((b) => serializeBlock(b)),
  };
};

export const mapPhoto = (jp: PhotoDTO, f: I18nFacade): Photo => {
  const p: Photo = {
    id: jp.id,
    kind: jp.kind,
    content: {
      photoPath: jp.content.photoPath,
      alt: jp.content.alt,
      attribution: jp.content.attribution,
      link: jp.content.link,
      external: jp.content.external,
      height: jp.content.height,
      ratio: jp.content.ratio,
      width: jp.content.width,
      altTranslation: f.translateFunc(jp.content.alt),
    },
  };
  return p;
};

export const serializePhoto = (jp: PhotoDTO): PhotoDTO => {
  return {
    id: jp.id,
    kind: jp.kind,
    content: {
      photoPath: jp.content.photoPath,
      alt: jp.content.alt,
      attribution: jp.content.attribution,
      link: jp.content.link,
      external: jp.content.external,
      height: jp.content.height,
      ratio: jp.content.ratio,
      width: jp.content.width,
    },
  };
};

export const mapPricingShort = (jp: PricingShortDTO, f: I18nFacade): PricingShort => {
  const p: PricingShort = {
    id: jp.id,
    kind: 'pricing-short',
    content: {
      showMaximum: jp.content.showMaximum,
      showMinimum: jp.content.showMinimum,
    },
  };

  if (jp.content.footnote) {
    p.content.footnote = jp.content.footnote;
    p.content.footnoteTranslation = f.translateFunc(jp.content.footnote);
  } else {
    p.content.footnote = randomID();
    p.content.footnoteTranslation = '';
  }

  if (jp.content.global) p.content.global = mapPricingEntry(jp.content.global, f);
  if (jp.content.entries) {
    p.content.entries = jp.content.entries.map((e) => mapPricingRange(e, f));
    p.content.ranges = jp.content.entries.map((e) => mapPricingRange(e, f));
  }
  if (jp.content.ranges) {
    p.content.entries = jp.content.ranges.map((e) => mapPricingRange(e, f));
    p.content.ranges = jp.content.ranges.map((e) => mapPricingRange(e, f));
  }
  if (jp.content.staticRanges) {
    p.content.staticRanges = jp.content.staticRanges.map((e) => mapStaticPricingRange(e, f));
  }

  return p;
};

export const serializePricingShort = (jp: PricingShort): PricingShortDTO => {
  const p: PricingShortDTO = {
    id: jp.id,
    kind: 'pricing-short',
    content: {
      showMaximum: jp.content.showMaximum,
      showMinimum: jp.content.showMinimum,
      footnote: jp.content.footnote,
    },
  };

  if (jp.content.global) p.content.global = serializePricingEntry(jp.content.global);

  if (jp.content.ranges) {
    p.content.entries = jp.content.ranges.map((e) => serializePricingRange(e));
    p.content.ranges = jp.content.ranges.map((e) => serializePricingRange(e));
  } else if (jp.content.entries) {
    p.content.entries = jp.content.entries.map((e) => serializePricingRange(e));
    p.content.ranges = jp.content.entries.map((e) => serializePricingRange(e));
  }

  if (jp.content.staticRanges)
    p.content.staticRanges = jp.content.staticRanges.map((e) => serializeStaticPricingRange(e));

  return p;
};

export const mapPricingEntry = (jp: PricingEntryDTO, f: I18nFacade): PricingEntry => {
  const p: PricingEntry = {
    perNightPrice: dinero(jp.perNightPrice),
  };

  if (jp.minNumberOfNights) {
    p.minNumberOfNights = jp.minNumberOfNights;
  }

  if (jp.additionalPersonText1) {
    p.additionalPersonText1 = jp.additionalPersonText1;
    p.additionalPersonText1Translation = f.translateFunc(p.additionalPersonText1);

    if (jp.additionalPersonPrice1) p.additionalPersonPrice1 = dinero(jp.additionalPersonPrice1);
    else p.additionalPersonPrice1 = dinero({ amount: 0, currency: EUR });
  }

  if (jp.additionalPersonText2) {
    p.additionalPersonText2 = jp.additionalPersonText2;
    p.additionalPersonText2Translation = f.translateFunc(p.additionalPersonText2);

    if (jp.additionalPersonPrice2) p.additionalPersonPrice2 = dinero(jp.additionalPersonPrice2);
    else p.additionalPersonPrice2 = dinero({ amount: 0, currency: EUR });
  }

  if (jp.additionalPersonText3) {
    p.additionalPersonText3 = jp.additionalPersonText3;
    p.additionalPersonText3Translation = f.translateFunc(p.additionalPersonText3);

    if (jp.additionalPersonPrice3) p.additionalPersonPrice3 = dinero(jp.additionalPersonPrice3);
    else p.additionalPersonPrice3 = dinero({ amount: 0, currency: EUR });
  }

  if (jp.firstNightPrice) p.firstNightPrice = dinero(jp.firstNightPrice);
  return p;
};

export const serializePricingEntry = (pe: PricingEntry): PricingEntryDTO => {
  const p: PricingEntryDTO = {
    perNightPrice: pe.perNightPrice.toJSON(),
  };
  if (pe.minNumberOfNights) {
    p.minNumberOfNights = pe.minNumberOfNights;
  }

  if (pe.additionalPersonText1 && pe.additionalPersonPrice1) {
    p.additionalPersonPrice1 = pe.additionalPersonPrice1.toJSON();
    p.additionalPersonText1 = pe.additionalPersonText1;
  }
  if (pe.additionalPersonText2 && pe.additionalPersonPrice2) {
    p.additionalPersonPrice2 = pe.additionalPersonPrice2.toJSON();
    p.additionalPersonText2 = pe.additionalPersonText2;
  }
  if (pe.additionalPersonText3 && pe.additionalPersonPrice3) {
    p.additionalPersonPrice3 = pe.additionalPersonPrice3.toJSON();
    p.additionalPersonText3 = pe.additionalPersonText3;
  }
  if (pe.firstNightPrice) p.firstNightPrice = pe.firstNightPrice.toJSON();
  return p;
};

export const mapPricingRange = (jp: PricingRangeDTO, f: I18nFacade): PricingRange => {
  const pr: PricingRange = {
    from: luxon.fromISO(jp.from, { zone: 'utc' }),
    to: luxon.fromISO(jp.to, { zone: 'utc' }),
    entry: mapPricingEntry(jp.entry, f),
  };
  return pr;
};

export const serializePricingRange = (pp: PricingRange): PricingRangeDTO => {
  const fromISO = pp.from.toISO();
  const toISO = pp.to.toISO();
  if (!fromISO || !toISO) throw new Error('Missing Dates in pricing range');

  const p: PricingRangeDTO = {
    from: fromISO,
    to: toISO,
    entry: serializePricingEntry(pp.entry),
  };
  return p;
};

export const mapStaticPricingRange = (
  jp: StaticPricingRangeDTO,
  f: I18nFacade,
): StaticPricingRange => {
  const pr: StaticPricingRange = {
    from: jp.from,
    to: jp.to,
    entry: mapPricingEntry(jp.entry, f),
  };
  return pr;
};

export const serializeStaticPricingRange = (pp: StaticPricingRange): StaticPricingRangeDTO => {
  const p: StaticPricingRangeDTO = {
    from: pp.from,
    to: pp.to,
    entry: serializePricingEntry(pp.entry),
  };
  return p;
};

export const mapPricing = (jp: PricingDTO, f: I18nFacade): Pricing => {
  const p: Pricing = {
    kind: 'pricing',
    id: jp.id,
    content: {
      global: mapPricingEntry(jp.content.global, f),
    },
  };

  if (jp.content.footnote) {
    p.content.footnote = jp.content.footnote;
    p.content.footnoteTranslation = f.translateFunc(jp.content.footnote);
  }
  if (jp.content.entries) {
    p.content.entries = jp.content.entries.map((e) => mapPricingRange(e, f));
    p.content.ranges = jp.content.entries.map((e) => mapPricingRange(e, f)); //decide for one
  }
  if (jp.content.ranges) {
    p.content.entries = jp.content.ranges.map((e) => mapPricingRange(e, f));
    p.content.ranges = jp.content.ranges.map((e) => mapPricingRange(e, f)); //decide for one
  }
  if (jp.content.staticRanges) {
    p.content.staticRanges = jp.content.staticRanges.map((e) => mapStaticPricingRange(e, f));
  }
  if (jp.content.columns) {
    p.content.columns = jp.content.columns;
  }
  return p;
};

export const serializePricing = (p: Pricing): PricingDTO => {
  const jp: PricingDTO = {
    id: p.id,
    kind: p.kind,
    content: {
      global: serializePricingEntry(p.content.global),
      staticRanges: p.content.staticRanges?.map((s) => serializeStaticPricingRange(s)),
      columns: p.content.columns,
      footnote: p.content.footnote,
    },
  };
  if (p.content.ranges) {
    jp.content.entries = p.content.ranges.map((e) => serializePricingRange(e));
    jp.content.ranges = p.content.ranges.map((e) => serializePricingRange(e));
  }

  if (p.content.entries) {
    jp.content.entries = p.content.entries.map((e) => serializePricingRange(e));
    jp.content.ranges = p.content.entries.map((e) => serializePricingRange(e));
  }

  return jp;
};
