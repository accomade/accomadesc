import { describe, it, expect } from 'vitest';
import type {
  Block,
  AccoBlock,
  Calendar,
  CalendarAvailable,
  CalendarGrid,
  CalendarRows,
  Pricing,
  PricingShort,
  AccoCard,
  AccoDescription,
  ContactForm,
  BookingRequest,
  Text,
  Photo,
  PhotoGallery,
  LeafletMap,
  Weather,
  AmenitiesCore,
} from './types.js';
import {
  isAccoBlock,
  isAccoCard,
  isText,
  isPhoto,
  isGallery,
  isLeafletMap,
  isWeather,
  isAmenitiesCore,
  isCalendarAvailable,
  isCalendar,
  isCalendarGrid,
  isCalendarRows,
  isPricing,
  isPricingShort,
  isAccoDescription,
  isContactForm,
  isBookingRequest,
} from './types.js';

describe('Type Guards', () => {
  describe('isAccoBlock', () => {
    it('returns true for AccoBlock kinds', () => {
      const accoCard: AccoCard = {
        id: '1',
        kind: 'acco-card',
        content: {
          displayName: 'Test',
          coverPhoto: { photoPath: '/photo.jpg', alt: 'Photo' },
          slug: 'test',
          pricing: {} as PricingShort,
          avail: {} as CalendarAvailable,
          amenities: {} as AmenitiesCore,
        },
      };
      expect(isAccoBlock(accoCard)).toBe(true);
    });

    it('returns false for non-AccoBlock kinds', () => {
      const text: Text = { id: '1', kind: 'text', content: { ref: 'test' } };
      expect(isAccoBlock(text)).toBe(false);
    });

    it('returns false for null/undefined', () => {
      expect(isAccoBlock(null as unknown as Block)).toBe(false);
      expect(isAccoBlock(undefined as unknown as Block)).toBe(false);
    });
  });

  describe('isAccoCard', () => {
    it('returns true for acco-card kind', () => {
      const accoCard: AccoCard = {
        id: '1',
        kind: 'acco-card',
        content: {
          displayName: 'Test',
          coverPhoto: { photoPath: '/photo.jpg', alt: 'Photo' },
          slug: 'test',
          pricing: {} as PricingShort,
          avail: {} as CalendarAvailable,
          amenities: {} as AmenitiesCore,
        },
      };
      expect(isAccoCard(accoCard)).toBe(true);
    });

    it('returns false for other kinds', () => {
      const text: Text = { id: '1', kind: 'text', content: { ref: 'test' } };
      expect(isAccoCard(text)).toBe(false);
    });
  });

  describe('isText', () => {
    it('returns true for text kind', () => {
      const text: Text = { id: '1', kind: 'text', content: { ref: 'test' } };
      expect(isText(text)).toBe(true);
    });

    it('returns false for other kinds', () => {
      const photo: Photo = {
        id: '1',
        kind: 'photo',
        content: { photoPath: '/photo.jpg', alt: 'Photo' },
      };
      expect(isText(photo)).toBe(false);
    });
  });

  describe('isPhoto', () => {
    it('returns true for photo kind', () => {
      const photo: Photo = {
        id: '1',
        kind: 'photo',
        content: { photoPath: '/photo.jpg', alt: 'Photo' },
      };
      expect(isPhoto(photo)).toBe(true);
    });
  });

  describe('isGallery', () => {
    it('returns true for gallery kind', () => {
      const gallery: PhotoGallery = { id: '1', kind: 'gallery', content: { photos: [] } };
      expect(isGallery(gallery)).toBe(true);
    });
  });

  describe('isLeafletMap', () => {
    it('returns true for leaflet-map kind', () => {
      const map: LeafletMap = {
        id: '1',
        kind: 'leaflet-map',
        content: { address: 'Test', lat: 0, long: 0, zoom: 10 },
      };
      expect(isLeafletMap(map)).toBe(true);
    });
  });

  describe('isWeather', () => {
    it('returns true for weather kind', () => {
      const weather: Weather = {
        id: '1',
        kind: 'weather',
        content: { header1: 'H1', header2: 'H2', location: 'Loc' },
      };
      expect(isWeather(weather)).toBe(true);
    });
  });

  describe('isAmenitiesCore', () => {
    it('returns true for amenities-core kind', () => {
      const amenities: AmenitiesCore = {
        id: '1',
        kind: 'amenities-core',
        content: {
          peopleMin: 1,
          peopleMax: 4,
          size: 50,
          bedRooms: 2,
          bathRooms: 1,
          pets: false,
          wifi: true,
          smoking: false,
          ac: false,
          tv: false,
          parking: true,
        },
      };
      expect(isAmenitiesCore(amenities)).toBe(true);
    });
  });

  describe('isCalendarAvailable', () => {
    it('returns true for calendar-available kind', () => {
      const cal: CalendarAvailable = {
        id: '1',
        kind: 'calendar-available',
        content: { url: '/cal.ics', search: [] },
      };
      expect(isCalendarAvailable(cal)).toBe(true);
    });
  });

  describe('isCalendar', () => {
    it('returns true for calendar kind', () => {
      const cal: Calendar = { id: '1', kind: 'calendar', content: { url: '/cal.ics' } };
      expect(isCalendar(cal)).toBe(true);
    });
  });

  describe('isCalendarGrid', () => {
    it('returns true for calendar-grid kind', () => {
      const cal: CalendarGrid = { id: '1', kind: 'calendar-grid', content: { url: '/cal.ics' } };
      expect(isCalendarGrid(cal)).toBe(true);
    });
  });

  describe('isCalendarRows', () => {
    it('returns true for calendar-rows kind', () => {
      const cal: CalendarRows = { id: '1', kind: 'calendar-rows', content: { url: '/cal.ics' } };
      expect(isCalendarRows(cal)).toBe(true);
    });
  });

  describe('isPricing', () => {
    it('returns true for pricing kind', () => {
      const pricing: Pricing = {
        id: '1',
        kind: 'pricing',
        content: { global: { perNightPrice: 100 } },
      };
      expect(isPricing(pricing)).toBe(true);
    });
  });

  describe('isPricingShort', () => {
    it('returns true for pricing-short kind', () => {
      const pricing: PricingShort = {
        id: '1',
        kind: 'pricing-short',
        content: { global: { perNightPrice: 100 } },
      };
      expect(isPricingShort(pricing)).toBe(true);
    });
  });

  describe('isAccoDescription', () => {
    it('returns true for acco-description kind', () => {
      const desc: AccoDescription = { id: '1', kind: 'acco-description', content: { ref: 'desc' } };
      expect(isAccoDescription(desc)).toBe(true);
    });
  });

  describe('isContactForm', () => {
    it('returns true for contact-form kind', () => {
      const form: ContactForm = {
        id: '1',
        kind: 'contact-form',
        content: {
          userID: 'u1',
          endpoint: '/api',
          nameLabel: 'Name',
          emailLabel: 'Email',
          questionLabel: 'Question',
          submitText: 'Send',
          successfullySentText: 'Sent',
          sentErroredText: 'Error',
          explainer: 'Info',
        },
      };
      expect(isContactForm(form)).toBe(true);
    });
  });

  describe('isBookingRequest', () => {
    it('returns true for booking-request kind', () => {
      const booking: BookingRequest = {
        id: '1',
        kind: 'booking-request',
        content: {
          endpoint: '/api',
          userID: 'u1',
          accoID: 'a1',
          calUrl: '/cal.ics',
          nameLabel: 'Name',
          emailLabel: 'Email',
          dateEntryLabel: 'Date',
          submitText: 'Book',
          successfullySentText: 'Sent',
          sentErroredText: 'Error',
          invalidText: 'Invalid',
          messageLabel: 'Message',
          explainer: 'Info',
        },
      };
      expect(isBookingRequest(booking)).toBe(true);
    });
  });
});
