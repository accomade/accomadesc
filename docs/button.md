# Button Component

Multi-variant button component with various styles and sizes.

## Usage

```svelte
<script>
  import { Button } from 'accomadesc';
</script>

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Button</Button>
<Button variant="success">Success Button</Button>
```

## Sizes

```svelte
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

## States

```svelte
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button fullWidth>Full Width</Button>
```

## Props

| Prop      | Type    | Default   | Description          |
| --------- | ------- | --------- | -------------------- |
| variant   | string  | 'primary' | Button style variant |
| size      | string  | 'medium'  | Button size          |
| disabled  | boolean | false     | Disable button       |
| loading   | boolean | false     | Show loading spinner |
| fullWidth | boolean | false     | Full width button    |
| type      | string  | 'button'  | HTML button type     |
