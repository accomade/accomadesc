import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/svelte';
import TextInput from './TextInput.svelte';

describe('TextInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders input element with default text type', () => {
    render(TextInput, { name: 'test-input' });
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders input with placeholder', () => {
    render(TextInput, { name: 'test-input', placeholder: 'Enter text...' });
    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toBeInTheDocument();
  });

  it('renders email input when type is email', () => {
    render(TextInput, { name: 'email-input', type: 'email' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders tel input when type is tel', () => {
    render(TextInput, { name: 'phone-input', type: 'tel' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('renders number input when type is number', () => {
    render(TextInput, { name: 'number-input', type: 'number' });
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('renders password input when type is password', () => {
    render(TextInput, { name: 'password-input', type: 'password' });
    const input = document.querySelector('input[type="password"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls focussed handler when input receives focus', async () => {
    const focussed = vi.fn();
    render(TextInput, { name: 'test-input', focussed });
    const input = screen.getByRole('textbox');
    await fireEvent.focus(input);
    expect(focussed).toHaveBeenCalledTimes(1);
    expect(focussed).toHaveBeenCalledWith('test-input', '');
  });

  it('calls blurred handler when input loses focus', async () => {
    const blurred = vi.fn();
    render(TextInput, { name: 'test-input', blurred });
    const input = screen.getByRole('textbox');
    await fireEvent.focus(input);
    await fireEvent.blur(input);
    expect(blurred).toHaveBeenCalledTimes(1);
    expect(blurred).toHaveBeenCalledWith('test-input', '');
  });

  it('calls valueChanged handler when value changes', async () => {
    const valueChanged = vi.fn();
    render(TextInput, { name: 'test-input', valueChanged });
    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'test value' } });
    expect(valueChanged).toHaveBeenCalledTimes(1);
  });

  it('does not call handlers when disabled', async () => {
    const focussed = vi.fn();
    const blurred = vi.fn();
    const valueChanged = vi.fn();
    render(TextInput, { name: 'test-input', enabled: false, focussed, blurred, valueChanged });
    const input = screen.getByRole('textbox');
    await fireEvent.focus(input);
    expect(focussed).not.toHaveBeenCalled();
    await fireEvent.blur(input);
    expect(blurred).not.toHaveBeenCalled();
  });

  it('applies disabled class when disabled', () => {
    render(TextInput, { name: 'test-input', enabled: false });
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('disabled')).toBe(true);
  });

  it('applies translating class when translating prop is true', () => {
    render(TextInput, { name: 'test-input', translating: true });
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('translating')).toBe(true);
  });

  it('shows invalid class when validity is false with custom checkValidity', () => {
    render(TextInput, { name: 'test-input', valid: false, checkValidity: () => false });
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('invalid')).toBe(true);
  });

  it('applies aria-invalid when not valid and enabled', () => {
    render(TextInput, { name: 'test-input', valid: false, checkValidity: () => false });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not apply aria-invalid when valid', () => {
    render(TextInput, { name: 'test-input', valid: true });
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });

  it('generates unique id when not provided', () => {
    render(TextInput, { name: 'test-input' });
    const input = screen.getByRole('textbox');
    expect(input.id).toBeTruthy();
    expect(input.id.length).toBeGreaterThan(0);
  });

  it('uses provided id', () => {
    render(TextInput, { name: 'test-input', id: 'my-input' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'my-input');
  });

  it('applies required attribute when required prop is true', () => {
    render(TextInput, { name: 'test-input', required: true });
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('applies aria-required when required prop is true', () => {
    render(TextInput, { name: 'test-input', required: true });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('applies minlength attribute', () => {
    render(TextInput, { name: 'test-input', minLength: 5 });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('minlength', '5');
  });

  it('applies maxlength attribute', () => {
    render(TextInput, { name: 'test-input', maxLength: 50 });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', '50');
  });

  it('applies min attribute for number type', () => {
    render(TextInput, { name: 'number-input', type: 'number', minNumber: 0 });
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
  });

  it('applies max attribute for number type', () => {
    render(TextInput, { name: 'number-input', type: 'number', maxNumber: 100 });
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('max', '100');
  });

  it('applies step attribute for number type', () => {
    render(TextInput, { name: 'number-input', type: 'number', step: '0.5' });
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('step', '0.5');
  });

  it('applies name attribute', () => {
    render(TextInput, { name: 'my-name' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'my-name');
  });

  it('applies custom maxWidth style', () => {
    render(TextInput, { name: 'test-input', maxWidth: '300px' });
    const input = screen.getByRole('textbox');
    const wrapper = input.parentElement;
    expect(wrapper).toHaveStyle({ 'max-width': '300px' });
  });

  it('applies custom minWidth style', () => {
    render(TextInput, { name: 'test-input', minWidth: '100px' });
    const input = screen.getByRole('textbox');
    const wrapper = input.parentElement;
    expect(wrapper).toHaveStyle({ 'min-width': '100px' });
  });

  it('applies custom alignSelf style', () => {
    render(TextInput, { name: 'test-input', alignSelf: 'center' });
    const input = screen.getByRole('textbox');
    const wrapper = input.parentElement;
    expect(wrapper).toHaveStyle({ 'align-self': 'center' });
  });

  it('shows validation message when showInitialMessage is true and valid', () => {
    render(TextInput, {
      name: 'test-input',
      showInitialMessage: true,
      valid: true,
      messageValid: 'OK',
    });
    const message = screen.getByText('OK');
    expect(message).toBeInTheDocument();
    expect(message.classList.contains('valid')).toBe(true);
  });

  it('shows validation message when showMessageOnInvalid is true and not valid', () => {
    render(TextInput, {
      name: 'test-input',
      showMessageOnInvalid: true,
      valid: false,
      checkValidity: () => false,
      messageInvalid: 'Invalid',
    });
    const message = screen.getByText('Invalid');
    expect(message).toBeInTheDocument();
  });

  it('applies pattern attribute for tel type', () => {
    const phonePattern = '^(\\+|00)(\\d|\\s){9,24}';
    render(TextInput, { name: 'phone-input', type: 'tel', phonePattern });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('pattern', phonePattern);
  });

  it('calls validityChanged when validity changes', async () => {
    const validityChanged = vi.fn();
    const checkValidity = vi.fn().mockReturnValue(true);
    render(TextInput, { name: 'test-input', checkValidity, validityChanged });
    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'test' } });
    expect(checkValidity).toHaveBeenCalled();
  });

  it('requests focus when requestFocus prop is true', () => {
    render(TextInput, { name: 'test-input', requestFocus: true });
    const input = screen.getByRole('textbox');
    expect(document.activeElement).toBe(input);
  });

  it('does not request focus when requestFocus prop is false', () => {
    render(TextInput, { name: 'test-input', requestFocus: false });
    const input = screen.getByRole('textbox');
    expect(document.activeElement).not.toBe(input);
  });

  it('uses default checkValidity that always returns true', () => {
    render(TextInput, { name: 'test-input' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.checkValidity()).toBe(true);
  });

  it('sets autocomplete attribute for email type', () => {
    render(TextInput, { name: 'email-input', type: 'email', autocomplete: 'username' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'username');
  });

  it('sets default autocomplete for email type', () => {
    render(TextInput, { name: 'email-input', type: 'email' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });

  it('sets default autocomplete for tel type', () => {
    render(TextInput, { name: 'phone-input', type: 'tel' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'tel');
  });

  it('sets default autocomplete for password type', () => {
    render(TextInput, { name: 'password-input', type: 'password' });
    const input = document.querySelector('input[type="password"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('autocomplete', 'current-password');
  });

  it('sets autocomplete attribute for text type', () => {
    render(TextInput, { name: 'test-input', type: 'text', autocomplete: 'given-name' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'given-name');
  });

  it('sets autocomplete attribute for number type', () => {
    render(TextInput, { name: 'number-input', type: 'number', autocomplete: 'off' });
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });
});
