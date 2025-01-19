<script lang="ts">
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';

  import {
    PRICING_COLUMNS,
    type AccoCard as AccoCardBlock,
    type AmenitiesCore as AmenitiesCoreBlock,
    type LeafletMap as LeafletMapBlock,
    type Photo as PhotoBlock,
    type PhotoGallery as PhotoGalleryBlock,
    type Pricing as PricingBlock,
    type PricingColumn,
    type PricingRange,
    type StaticPricingRange,
    type Text as TextBlock,
    type ContactForm as ContactFormBlock,
    type CalendarAvailable as CalendarAvailableBlock,
    type Calendar as CalendarBlock,
    type CalendarRows as CalendarRowsBlock,
    type CalendarGrid as CalendarGridBlock,
    type Weather as WeatherBlock,
    type BookingRequest as BookingRequestBlock,
  } from '$lib/types.js';
  import Text from '$lib/Text.svelte';
  import Button from '$lib/basic/Button.svelte';
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import { randomID } from '$lib/names/gen.js';

  import ContactForm from '$lib/ContactForm.svelte';
  import TextEditor from './TextEditor.svelte';
  import AmenitiesEditor from './AmenitiesEditor.svelte';
  import MapEditor from './MapEditor.svelte';
  import { I18n } from './I18n.svelte.js';
  import LeafletMap from '$lib/LeafletMap.svelte';
  import Photo from '$lib/Photo.svelte';

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  import PhotoEditor from './PhotoEditor.svelte';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });
  import { css as initialCss } from './css.ts';
  import CssEditor from './CssEditor.svelte';
  import Pricing from '$lib/Pricing.svelte';
  import PricingEditor from './PricingEditor.svelte';
  import AccoCard from '$lib/AccoCard.svelte';
  import PhotoGallery from '$lib/PhotoGallery.svelte';
  import Weather from '$lib/Weather.svelte';
  import CalendarAvailable from '$lib/CalendarAvailable.svelte';
  import Calendar from '$lib/Calendar.svelte';
  import CalendarRows from '$lib/CalendarRows.svelte';
  import CalendarGrid from '$lib/CalendarGrid.svelte';
  import CalendarDynamicEditor from './CalendarDynamicEditor.svelte';
  import BookingRequest from '$lib/BookingRequest.svelte';
  import OccuPlanPicker from '$lib/occuplan/OccuPlanPicker.svelte';

  let css = $state(initialCss);
  let styleOpen = $state(false);

  let textRef = 'textRef';
  const text: TextBlock = $state({
    id: textRef,
    kind: 'text',
    content: {
      ref: textRef,
      minHeight: '10rem',
      textFontSize: '1rem',
      headerFontSize: '1rem',
    },
  });

  const amenities: AmenitiesCoreBlock = $state({
    id: randomID(),
    kind: 'amenities-core',
    content: {
      peopleMin: 4,
      peopleMax: 5,
      size: 56,
      bedRooms: 2,
      bathRooms: 1,
      pets: true,
      showPets: true,
      wifi: false,
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

  const leafletMap: LeafletMapBlock = $state({
    id: randomID(),
    kind: 'leaflet-map',
    content: {
      address: 'Wallaby Way, Sydney',
      lat: -33.75573776507028,
      long: 150.60356140726984,
      zoom: 15,
    },
  });

  const photos = [
    'https://accomade.twic.pics/prod/stock/photos/PXL_20220103_114534268.jpg',
    'https://accomade.twic.pics/prod/stock/photos/PXL_20220418_175413201.jpg',
    'https://accomade.twic.pics/prod/stock/photos/PXL_20230708_175935120.jpg',
  ];

  let altRef = 'photoAlt';
  let photo: PhotoBlock = $state({
    id: randomID(),
    kind: 'photo',
    content: {
      photoPath: 'https://accomade.twic.pics/prod/stock/photos/PXL_20220103_114534268.jpg',
      alt: altRef,
      attribution: 'Copyright by this and that<br>and such',
      link: 'https://google.com',
      external: true,
      height: '20rem',
      ratio: '2/1',
      width: '100%',
      eager: false,
      frame: false,
      transition: 'none',
    },
  });

  let pricing: PricingBlock = $state({
    id: randomID(),
    kind: 'pricing',
    content: {
      global: {
        firstNightPrice: {
          scale: 2,
          amount: 12000,
          currency: { code: 'EUR', base: 10, exponent: 2 },
        },
        perNightPrice: { scale: 2, amount: 8000, currency: { code: 'EUR', base: 10, exponent: 2 } },
        minNumberOfNights: 4,
        additionalPersonText1: 'priceGAdd1',
        additionalPersonText2: 'priceGAdd2',
        additionalPersonText3: 'priceGAdd3',
        additionalPersonPrice1: {
          scale: 2,
          amount: 1500,
          currency: { code: 'EUR', base: 10, exponent: 2 },
        },
        additionalPersonPrice2: {
          scale: 2,
          amount: 3500,
          currency: { code: 'EUR', base: 10, exponent: 2 },
        },
        additionalPersonPrice3: {
          scale: 2,
          amount: 0,
          currency: { code: 'EUR', base: 10, exponent: 2 },
        },
      },
      staticRanges: [],
      ranges: [],
      entries: [],
      columns: [...PRICING_COLUMNS],
      footnote: 'priceGFoot',
    },
  });

  const accoCard: AccoCardBlock = {
    id: randomID(),
    kind: 'acco-card',
    content: {
      displayName: 'A beautiful Apartment',
      cardContent: {
        coverPhoto: {
          photoPath: photos[1],
          alt: 'accoCCCalt',
        },
        blocks: [
          {
            id: randomID(),
            kind: 'amenities-core',
            content: {
              peopleMin: 2,
              peopleMax: 4,
              size: 55,
              bedRooms: 2,
              bathRooms: 1,
              pets: true,
              wifi: true,
              smoking: false,
              ac: false,
              tv: true,
              parking: true,
              showPets: true,
              showWifi: true,
              showSmoking: true,
              showAc: false,
              showTv: true,
              showParking: true,
            },
          },
          {
            id: randomID(),
            content: {
              showMaximum: true,
              showMinimum: true,
              footnote: 'promising-tassel-weed',
              entries: [
                {
                  from: '2024-09-01T02:00:00.000+02:00',
                  to: '2025-06-30T00:00:00.000Z',
                  entry: {
                    perNightPrice: {
                      scale: 2,
                      amount: 5000,
                      currency: {
                        code: 'EUR',
                        base: 10,
                        exponent: 2,
                      },
                    },
                    minNumberOfNights: 3,
                    firstNightPrice: {
                      scale: 2,
                      amount: 8000,
                      currency: {
                        code: 'EUR',
                        base: 10,
                        exponent: 2,
                      },
                    },
                  },
                },
                {
                  from: '2025-09-01T02:00:00.000+02:00',
                  to: '2026-06-30T00:00:00.000Z',
                  entry: {
                    perNightPrice: {
                      amount: 5000,
                      scale: 2,
                      currency: {
                        code: 'EUR',
                        base: 10,
                        exponent: 2,
                      },
                    },
                    minNumberOfNights: 3,
                    firstNightPrice: {
                      amount: 8000,
                      scale: 2,
                      currency: {
                        code: 'EUR',
                        base: 10,
                        exponent: 2,
                      },
                    },
                  },
                },
              ],
              global: {
                perNightPrice: {
                  amount: 7000,
                  currency: {
                    code: 'EUR',
                    base: 10,
                    exponent: 2,
                  },
                  scale: 2,
                },
                minNumberOfNights: 5,
                firstNightPrice: {
                  amount: 10000,
                  currency: {
                    code: 'EUR',
                    base: 10,
                    exponent: 2,
                  },
                  scale: 2,
                },
              },
            },
            kind: 'pricing-short',
          },
          {
            id: randomID(),
            content: {
              url: 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/050edcb4-680e-4542-96df-3ae4a2af89a5',
              search: [3, 7, 14],
            },
            kind: 'calendar-available',
          },
        ],
      },
    },
  };
  //console.log(JSON.stringify(accoCard, null, 2));

  const photoGallery: PhotoGalleryBlock = {
    id: randomID(),
    kind: 'gallery',
    content: {
      gridPhotoWidth: 200,
      photos: [
        {
          kind: 'photo',
          id: randomID(),
          content: {
            photoPath: photos[0],
            alt: altRef,
          },
        },
        {
          kind: 'photo',
          id: randomID(),
          content: {
            photoPath: photos[1],
            alt: altRef,
          },
        },
        {
          kind: 'photo',
          id: randomID(),
          content: {
            photoPath: photos[2],
            alt: altRef,
          },
        },
      ],
    },
  };

  const whRef1 = 'weatherRef1';
  const whRef2 = 'weatherRef2';
  const weather: WeatherBlock = {
    id: randomID(),
    kind: 'weather',
    content: {
      header1: whRef1,
      header2: whRef2,
      location: '54d0514d00/koserow/',
    },
  };

  const cfRef1 = 'cfRef1'; //randomID();
  const cfRef2 = 'cfRef2';
  const cfRef3 = 'cfRef3';
  const cfRef4 = 'cfRef4';
  const cfRef5 = 'cfRef5';
  const cfRef6 = 'cfRef6';
  const cForm: ContactFormBlock = {
    id: randomID(),
    kind: 'contact-form',
    content: {
      userID: '3726b92f-a33d-4b9d-b5ce-1f45f04c6f6a',
      endpoint: 'https://accomade-crenshinibon-my-team-29e99517.vercel.app/contact',
      nameLabel: cfRef1,
      emailLabel: cfRef2,
      questionLabel: cfRef4,
      submitText: cfRef3,
      successfullySentText: cfRef5,
      sentErroredText: cfRef6,
    },
  };

  const calAvailable: CalendarAvailableBlock = {
    id: randomID(),
    content: {
      url: 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713',
      search: [3, 7, 14],
    },
    kind: 'calendar-available',
  };

  const cal: CalendarBlock = $state({
    id: randomID(),
    content: {
      url: 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713',
      toggleGridOffset: 640,
      gridMonthNumbers: 6,
      gridFirstMonth: '-1',
      gridMaxWidth: '1200px',
      toggleRowsOffset: 640,
      rowsMonthNumbers: 12,
      rowsFirstMonth: 1,
      rowsMaxWidth: '1200px',
    },
    kind: 'calendar',
  });

  const calRows: CalendarRowsBlock = {
    id: randomID(),
    content: {
      url: 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713',
    },
    kind: 'calendar-rows',
  };

  const calGrid: CalendarGridBlock = {
    id: randomID(),
    content: {
      url: 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713',
    },
    kind: 'calendar-grid',
  };

  const brRef1 = 'brRef1'; //randomID();
  const brRef2 = 'brRef2';
  const brRef3 = 'brRef3';
  const brRef4 = 'brRef4';
  const brRef5 = 'brRef5';
  const brRef6 = 'brRef6';
  const brRef7 = 'brRef7';
  const brRef8 = 'brRef8';
  const brRef9 = 'brRef9';

  const brForm: BookingRequestBlock = {
    id: randomID(),
    kind: 'booking-request',
    content: {
      accoID: 'fd638e66-c3c4-4248-97ce-47d018e79d83',
      endpoint: 'https://accomade-crenshinibon-my-team-29e99517.vercel.app/request',
      userID: '3726b92f-a33d-4b9d-b5ce-1f45f04c6f6a',
      calUrl:
        'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713',
      nameLabel: brRef1,
      emailLabel: brRef2,
      messageLabel: brRef4,
      submitText: brRef3,
      successfullySentText: brRef5,
      sentErroredText: brRef6,
      dateEntryLabel: brRef7,
      numberOfNightsLabel: brRef8,
      invalidText: brRef9,
    },
  };

  const i18n = new I18n();
</script>

<h1>Welcome to Accomade Svelte Components (accomadesc)</h1>
<h2>Components Show-Case</h2>

<div class="wrapper">
  <div class="lang-switcher">
    <Button
      pressed={i18n.currentLang == 'en'}
      text="en"
      clicked={() => (i18n.currentLang = 'en')}
    />
    <Button
      pressed={i18n.currentLang == 'de'}
      text="de"
      clicked={() => (i18n.currentLang = 'de')}
    />
    <Button
      pressed={i18n.currentLang == 'fr'}
      text="fr"
      clicked={() => (i18n.currentLang = 'fr')}
    />
  </div>
  <h3>
    Colors And Styles &nbsp;{#if styleOpen}<Button
        clicked={() => (styleOpen = !styleOpen)}
        text="Close"
      />{:else}<Button clicked={() => (styleOpen = !styleOpen)} text="Show" />{/if}
  </h3>
  {#if styleOpen}
    <div>
      <CssEditor bind:css />
    </div>
  {/if}
  <h3>Booking Request</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <BookingRequest {...brForm.content} {...i18n} />
    </div>
  </div>
  <h3>Date Picker</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <OccuPlanPicker {...calGrid.content} {...i18n} />
    </div>
  </div>
  <h3>Contact Form</h3>
  <div class="component">
    <div class="compontent-view" style={css}>
      <ContactForm {...cForm.content} {...i18n} />
    </div>
  </div>
  <h3>Month Grid Calendar</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <CalendarGrid debug={true} {...calGrid.content} {...i18n} />
    </div>
  </div>

  <h3>Monthly Rows Calendar</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <CalendarRows {...calRows.content} {...i18n} />
    </div>
  </div>
  <h3>Dynamic Calendar</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <Calendar {...cal.content} {...i18n} />
    </div>
    <CalendarDynamicEditor
      bind:toggleRowsOffset={cal.content.toggleRowsOffset}
      bind:gridMonthNumbers={cal.content.gridMonthNumbers}
      bind:gridFirstMonth={cal.content.gridFirstMonth}
      bind:gridMaxWidth={cal.content.gridMaxWidth}
      bind:toggleGridOffset={cal.content.toggleGridOffset}
      bind:rowsMonthNumbers={cal.content.rowsMonthNumbers}
      bind:rowsFirstMonth={cal.content.rowsFirstMonth}
      bind:rowsMaxWidth={cal.content.rowsMaxWidth}
    />
  </div>
  <h3>Calendar Available</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <CalendarAvailable {...calAvailable.content} {...i18n} />
    </div>
  </div>
  <h3>Weather</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <Weather {...weather.content} {...i18n} />
    </div>
  </div>
  <h3>PhotoGallery</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <PhotoGallery {...photoGallery.content} {...i18n} />
    </div>
  </div>
  <h3>AccoCard</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <AccoCard {...accoCard.content} {...i18n} />
    </div>
  </div>

  <h3>Pricing</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <Pricing {...pricing.content} {...i18n} />
    </div>
    <PricingEditor
      bind:global={pricing.content.global}
      bind:ranges={pricing.content.ranges as PricingRange[]}
      bind:staticRanges={pricing.content.staticRanges as StaticPricingRange[]}
      bind:columns={pricing.content.columns as PricingColumn[]}
      bind:footnoteText={i18n.translations[i18n.currentLang].priceGFoot}
      {i18n}
    />
  </div>

  <h3>Text</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <Text {...text.content} {...i18n} />
    </div>
    <TextEditor
      bind:text={i18n.translations[i18n.currentLang].textRef}
      bind:minHeight={text.content.minHeight}
      bind:textFontSize={text.content.textFontSize}
      bind:headerFontSize={text.content.headerFontSize}
    />
  </div>
  <h3>AmenitiesCore</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <AmenitiesCore {...amenities.content} {...i18n} />
    </div>
    <AmenitiesEditor
      bind:peopleMin={amenities.content.peopleMin}
      bind:peopleMax={amenities.content.peopleMax}
      bind:size={amenities.content.size}
      bind:bedRooms={amenities.content.bedRooms}
      bind:bathRooms={amenities.content.bathRooms}
      bind:pets={amenities.content.pets}
      bind:showPets={amenities.content.showPets}
      bind:wifi={amenities.content.wifi}
      bind:showWifi={amenities.content.showWifi}
      bind:smoking={amenities.content.smoking}
      bind:showSmoking={amenities.content.showSmoking}
      bind:ac={amenities.content.ac}
      bind:showAc={amenities.content.showAc}
      bind:tv={amenities.content.tv}
      bind:showTv={amenities.content.showTv}
      bind:parking={amenities.content.parking}
      bind:showParking={amenities.content.showParking}
    />
  </div>
  <h3>Leaflet Map</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <LeafletMap {...leafletMap.content} />
    </div>
    <MapEditor
      bind:address={leafletMap.content.address}
      bind:zoom={leafletMap.content.zoom}
      bind:lat={leafletMap.content.lat}
      bind:long={leafletMap.content.long}
    />
  </div>
  <h3>Photo</h3>
  <div class="component">
    <div class="component-view" style={css}>
      <Photo {...photo.content} {...i18n} />
    </div>
    <PhotoEditor
      {photos}
      bind:photoPath={photo.content.photoPath}
      bind:altText={i18n.translations[i18n.currentLang][altRef]}
      bind:attribution={photo.content.attribution}
      bind:link={photo.content.link}
      bind:external={photo.content.external}
      bind:height={photo.content.height}
      bind:ratio={photo.content.ratio}
      bind:width={photo.content.width}
      bind:frame={photo.content.frame}
      bind:transition={photo.content.transition}
    />
  </div>
</div>

<style>
  .lang-switcher {
    display: flex;
    justify-content: right;
  }

  h1 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    margin-left: 0.5rem;
  }
  h2 {
    margin: 1rem;
  }
  h3 {
    display: flex;
    align-items: center;
  }

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(label) {
    display: flex;
    align-items: center;
  }

  .wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100vw;
  }
  .component {
    display: flex;
    width: 100%;
    border-radius: 2rem;
    border: 2px solid black;
  }

  .component-view {
    padding: 1rem;
    flex: 1;
    min-width: 40%;
    border-right: 1px dashed red;

    font-family: var(--main-font-family, 'sans-serif');
    font-variant: var(--main-font-variant, 'small-caps');

    :global(hr) {
      margin-top: 1rem;
      margin-bottom: 1rem;
      border: var(--main-border);
    }

    :global(h4) {
      font-family: var(--header-font-family, 'sans-serif');
      font-variant: var(--header-font-variant, 'small-caps');
      font-size: 1.2rem;
      text-align: center;
      padding-bottom: 0.2rem;
      padding-top: 0.4rem;
    }

    :global(h3) {
      font-family: var(--header-font-family, 'sans-serif');
      font-variant: var(--header-font-variant, 'small-caps');
      text-align: center;
      font-size: 1.8rem;
      padding-bottom: 0.6rem;
      padding-top: 1rem;
    }

    :global(h2) {
      font-family: var(--header-font-family, 'sans-serif');
      font-variant: var(--header-font-variant, 'small-caps');
      font-size: 2.2rem;
      padding-bottom: 0.8rem;
      padding-top: 1.2rem;
    }

    :global(h1) {
      font-family: var(--header-font-family, 'sans-serif');
      font-variant: var(--header-font-variant, 'small-caps');
      font-size: 3rem;
      padding-bottom: 0.8rem;
      padding-top: 1.2rem;
    }

    :global(ol) {
      padding-left: 0.5rem;
      margin: 1rem;
    }

    :global(ul) {
      margin-left: 1rem;
      padding-left: 0.2rem;
    }
  }
</style>
