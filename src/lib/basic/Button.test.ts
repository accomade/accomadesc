import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders button element with text', () => {
    render(Button, { text: 'Click me' });
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });

  it('uses iconName as aria-label when no text provided', () => {
    render(Button, { iconName: 'menu' });
    const button = screen.getByRole('button', { name: 'menu' });
    expect(button).toBeInTheDocument();
  });

  it('calls clicked handler when button is clicked', async () => {
    const clicked = vi.fn();
    render(Button, { text: 'Test', clicked });
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    expect(clicked).toHaveBeenCalledTimes(1);
  });

  it('does not call clicked handler when disabled', async () => {
    const clicked = vi.fn();
    render(Button, { text: 'Test', enabled: false, clicked });
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    expect(clicked).not.toHaveBeenCalled();
  });

  it('applies danger class when danger prop is true', () => {
    render(Button, { text: 'Delete', danger: true });
    const button = screen.getByRole('button');
    expect(button.classList.contains('danger')).toBe(true);
  });

  it('does not apply danger class when danger prop is false', () => {
    render(Button, { text: 'Submit', danger: false });
    const button = screen.getByRole('button');
    expect(button.classList.contains('danger')).toBe(false);
  });

  it('applies pressed class when pressed prop is true', () => {
    render(Button, { text: 'Toggle', pressed: true });
    const button = screen.getByRole('button');
    expect(button.classList.contains('pressed')).toBe(true);
  });

  it('renders with correct type attribute', () => {
    render(Button, { text: 'Submit', type: 'submit' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('uses button type by default', () => {
    render(Button, { text: 'Click' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('generates unique id when not provided', () => {
    render(Button, { text: 'Test' });
    const button = screen.getByRole('button');
    expect(button.id).toBeTruthy();
    expect(button.id.length).toBeGreaterThan(0);
  });

  it('uses provided id', () => {
    render(Button, { text: 'Test', id: 'my-button' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'my-button');
  });

  it('handles form prop correctly', () => {
    render(Button, { text: 'Submit', form: 'my-form' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('form', 'my-form');
  });
});
