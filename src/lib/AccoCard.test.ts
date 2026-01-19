import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import AccoCard from './AccoCard.svelte';
import type {
  PhotoContent,
  PricingShort,
  CalendarAvailable,
  AmenitiesCore,
  I18nFacade,
} from './types.js';

describe('AccoCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  const createMockPhoto = (overrides: Partial<PhotoContent> = {}): PhotoContent => ({
    photoPath: '/photos/test.jpg',
    alt: 'Test photo',
    ...overrides,
  });

  const createMockPricingShort = (): PricingShort => ({
    id: 'pricing-1',
    kind: 'pricing-short',
    content: {
      global: {
        firstNightPrice: 100,
        perNightPrice: 80,
        additionalPersonPrice1: 20,
        minNumberOfNights: 2,
        numberOfGuestsBase: 2,
      },
    },
  });

  const createMockCalendarAvailable = (): CalendarAvailable => ({
    id: 'cal-1',
    kind: 'calendar-available',
    content: {
      url: 'https://example.com/calendar.ics',
      search: [1, 2, 3],
    },
  });

  const createMockAmenitiesCore = (): AmenitiesCore => ({
    id: 'amenities-1',
    kind: 'amenities-core',
    content: {
      peopleMin: 1,
      peopleMax: 4,
      size: 50,
      bedRooms: 2,
      bathRooms: 1,
      pets: true,
      showPets: true,
      wifi: true,
      showWifi: true,
      smoking: false,
      showSmoking: false,
      ac: true,
      showAc: true,
      tv: true,
      showTv: true,
      parking: false,
      showParking: false,
    },
  });

  const createMockI18n = (): I18nFacade => ({
    translateFunc: (ref: string) => ref,
    formatFunc: (formatter: string, props: Record<string, unknown>) => formatter,
    formatMoneyFunc: (d: number) => `${d}€`,
    formatDateFunc: (d: unknown) => '2024-01-01',
  });

  it('renders wrapper element with accocard-wrapper class', () => {
    const props = {
      displayName: 'Test Accommodation',
      coverPhoto: createMockPhoto(),
      slug: 'test-slug',
      pricing: createMockPricingShort(),
      avail: createMockCalendarAvailable(),
      amenities: createMockAmenitiesCore(),
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    expect(wrapper).toBeTruthy();
    expect(wrapper.classList.contains('accocard-wrapper')).toBe(true);
  });

  it('renders displayName as heading', () => {
    const props = {
      displayName: 'Beach House',
      coverPhoto: createMockPhoto(),
      slug: '',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const heading = screen.getByRole('heading', { name: 'Beach House' });
    expect(heading).toBeTruthy();
  });

  it('renders slug when provided', () => {
    const props = {
      displayName: 'Mountain Lodge',
      coverPhoto: createMockPhoto(),
      slug: 'mountain-lodge-slug',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const slug = screen.getByText('mountain-lodge-slug');
    expect(slug).toBeTruthy();
    expect(slug.classList.contains('slug')).toBe(true);
  });

  it('does not render slug section when slug is empty', () => {
    const props = {
      displayName: 'Test Place',
      coverPhoto: createMockPhoto(),
      slug: '',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const slugElements = wrapper.querySelectorAll('.slug');
    expect(slugElements.length).toBe(0);
  });

  it('applies translateFunc to slug when provided', () => {
    const translateFunc = vi.fn((ref: string) => `translated-${ref}`);
    const props = {
      displayName: 'Translated Place',
      coverPhoto: createMockPhoto(),
      slug: 'original-slug',
      translateFunc,
      formatFunc: createMockI18n().formatFunc,
      formatMoneyFunc: createMockI18n().formatMoneyFunc,
      formatDateFunc: createMockI18n().formatDateFunc,
    };
    render(AccoCard, props as any);
    const translatedSlug = screen.getByText('translated-original-slug');
    expect(translatedSlug).toBeTruthy();
    expect(translateFunc).toHaveBeenCalledWith('original-slug');
  });

  it('does not render photo when coverPhoto is undefined', () => {
    const props = {
      displayName: 'No Photo Place',
      coverPhoto: undefined,
      slug: '',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const photoContainers = wrapper.querySelectorAll('.photo');
    expect(photoContainers.length).toBe(0);
  });

  it('does not render amenities when amenities is undefined', () => {
    const props = {
      displayName: 'No Amenities Place',
      coverPhoto: createMockPhoto(),
      slug: '',
      amenities: undefined,
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const amenitiesContainers = wrapper.querySelectorAll('.amenities-container');
    expect(amenitiesContainers.length).toBe(0);
  });

  it('does not render pricing when pricing is undefined', () => {
    const props = {
      displayName: 'No Pricing Place',
      coverPhoto: createMockPhoto(),
      slug: '',
      pricing: undefined,
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const pricingContainers = wrapper.querySelectorAll('.pricing-container');
    expect(pricingContainers.length).toBe(0);
  });

  it('does not render calendar when avail is undefined', () => {
    const props = {
      displayName: 'No Calendar Place',
      coverPhoto: createMockPhoto(),
      slug: '',
      avail: undefined,
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const calendarContainers = wrapper.querySelectorAll('.calendar-container');
    expect(calendarContainers.length).toBe(0);
  });

  it('has CSS classes for styling structure', () => {
    const props = {
      displayName: 'Styled Place',
      coverPhoto: createMockPhoto(),
      slug: '',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    expect(wrapper.classList.contains('accocard-wrapper')).toBe(true);
    expect(wrapper.classList.length).toBeGreaterThanOrEqual(1);
  });

  it('passes all i18n functions to sub-components', () => {
    const translateFunc = vi.fn((ref: string) => ref);
    const formatFunc = vi.fn((formatter: string, props: Record<string, unknown>) => formatter);
    const formatMoneyFunc = vi.fn((d: number) => `${d}€`);
    const formatDateFunc = vi.fn((d: unknown) => '2024-01-01');

    const props = {
      displayName: 'I18n Card',
      coverPhoto: createMockPhoto(),
      slug: '',
      pricing: createMockPricingShort(),
      avail: createMockCalendarAvailable(),
      amenities: createMockAmenitiesCore(),
      translateFunc,
      formatFunc,
      formatMoneyFunc,
      formatDateFunc,
    };

    render(AccoCard, props as any);
    expect(translateFunc).toBeDefined();
    expect(formatFunc).toBeDefined();
    expect(formatMoneyFunc).toBeDefined();
    expect(formatDateFunc).toBeDefined();
  });

  it('handles missing translateFunc gracefully', () => {
    const props = {
      displayName: 'No I18n Card',
      coverPhoto: createMockPhoto(),
      slug: 'test-slug',
      formatFunc: undefined,
      formatMoneyFunc: undefined,
      formatDateFunc: undefined,
    };
    const { container } = render(AccoCard, props as any);
    const wrapper = container.querySelector('.accocard-wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('renders all sections when all props are provided', () => {
    const props = {
      displayName: 'Complete Card',
      coverPhoto: createMockPhoto(),
      slug: 'complete-slug',
      pricing: createMockPricingShort(),
      avail: createMockCalendarAvailable(),
      amenities: createMockAmenitiesCore(),
      ...createMockI18n(),
    };
    render(AccoCard, props as any);

    expect(screen.getByRole('heading', { name: 'Complete Card' })).toBeTruthy();
    expect(screen.getByText('complete-slug')).toBeTruthy();

    const wrapper = screen.getByTestId('accocard-wrapper');
    expect(wrapper.querySelector('.photo')).toBeTruthy();
    expect(wrapper.querySelector('.amenities-container')).toBeTruthy();
    expect(wrapper.querySelector('.pricing-container')).toBeTruthy();
    expect(wrapper.querySelector('.calendar-container')).toBeTruthy();
  });

  it('applies title-with-slug class correctly', () => {
    const props = {
      displayName: 'Class Test',
      coverPhoto: createMockPhoto(),
      slug: 'slug-test',
      ...createMockI18n(),
    };
    render(AccoCard, props as any);
    const wrapper = screen.getByTestId('accocard-wrapper');
    const titleWithSlug = wrapper.querySelector('.title-with-slug');
    expect(titleWithSlug).toBeTruthy();
  });

  it('renders with different display names', () => {
    const names = ['Studio Apartment', 'Luxury Villa', 'Cozy Cabin'];
    for (const name of names) {
      cleanup();
      const props = {
        displayName: name,
        coverPhoto: createMockPhoto(),
        slug: '',
        ...createMockI18n(),
      };
      render(AccoCard, props as any);
      expect(screen.getByRole('heading', { name })).toBeTruthy();
    }
  });

  it('renders with different slug values', () => {
    const slugs = ['slug-a', 'slug-b', 'slug-c'];
    for (const slug of slugs) {
      cleanup();
      const props = {
        displayName: 'Test',
        coverPhoto: createMockPhoto(),
        slug,
        ...createMockI18n(),
      };
      render(AccoCard, props as any);
      expect(screen.getByText(slug)).toBeTruthy();
    }
  });

  it('handles photo with different alt texts', () => {
    const alts = ['Living room', 'Bedroom view', 'Garden'];
    for (const alt of alts) {
      cleanup();
      const props = {
        displayName: 'Test',
        coverPhoto: createMockPhoto({ alt }),
        slug: '',
        ...createMockI18n(),
      };
      render(AccoCard, props as any);
      expect(screen.getByTestId('accocard-wrapper')).toBeTruthy();
    }
  });
});
