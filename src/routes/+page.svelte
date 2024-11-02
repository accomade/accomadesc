<script lang="ts">
  import type {
    AmenitiesCore as AmenitiesCoreBlock,
    LeafletMap as LeafletMapBlock,
    Photo as PhotoBlock,
    Text as TextBlock,
  } from '$lib/types.ts';
  import Text from '$lib/Text.svelte';
  import Button from '$lib/basic/Button.svelte';
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import { randomID } from '$lib/names/gen.ts';

  import TextEditor from './TextEditor.svelte';
  import AmenitiesEditor from './AmenitiesEditor.svelte';
  import MapEditor from './MapEditor.svelte';
  import { I18n } from './I18n.svelte.ts';
  import LeafletMap from '$lib/LeafletMap.svelte';
  import Photo from '$lib/Photo.svelte';

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  import PhotoEditor from './PhotoEditor.svelte';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });

  let textRef = 'textRef';
  let text: TextBlock = $state({
    id: textRef,
    kind: 'text',
    content: {
      ref: textRef,
      minHeight: '10rem',
      textFontSize: '1rem',
      headerFontSize: '1rem',
    },
  });

  let amenities: AmenitiesCoreBlock = $state({
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

  let leafletMap: LeafletMapBlock = $state({
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
      photos,
      photoPath: 'https://accomade.twic.pics/prod/stock/photos/PXL_20220103_114534268.jpg',
      alt: altRef,
      attribution: undefined,
      link: undefined,
      external: false,
      height: '5rem',
      ratio: '1/1',
      width: '5rem',
      eager: false,
      frame: false,
      transition: 'none',
    },
  });

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
  <h3>Text</h3>
  <div class="component">
    <div class="component-view">
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
    <div class="component-view">
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
    <div class="component-view">
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
    <div class="component-view">
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
      bind:eager={photo.content.eager}
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
    text-align: center;
  }

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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
  }
</style>
