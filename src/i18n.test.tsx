import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Mock translation resources
const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "format_number": "Number: {{val, number}}",
      "format_currency": "Price: {{val, currency}}",
      "format_date": "Date: {{val, date}}"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "format_number": "Nombre: {{val, number}}",
      "format_currency": "Prix: {{val, currency}}",
      "format_date": "Date: {{val, date}}"
    }
  }
};

// Initialize i18n for tests
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === 'number') return new Intl.NumberFormat(lng).format(value);
        if (format === 'date') return new Intl.DateTimeFormat(lng).format(value);
        if (format === 'currency') return new Intl.NumberFormat(lng, { style: 'currency', currency: 'USD' }).format(value);
        return value;
      }
    }
  });

const TestComponent = () => {
  const { t } = useTranslation();
  const date = new Date('2023-01-01T00:00:00Z');
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p data-testid="number">{t('format_number', { val: 1000 })}</p>
      <p data-testid="currency">{t('format_currency', { val: 1000 })}</p>
      <p data-testid="date">{t('format_date', { val: date })}</p>
    </div>
  );
};

describe('i18n integration', () => {
  it('renders translations correctly in English', () => {
    render(<TestComponent />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('formats numbers correctly', () => {
    render(<TestComponent />);
    // In 'en', 1000 -> 1,000
    expect(screen.getByTestId('number')).toHaveTextContent('Number: 1,000');
  });

  it('formats currency correctly', () => {
    render(<TestComponent />);
    // In 'en', 1000 -> $1,000.00
    expect(screen.getByTestId('currency')).toHaveTextContent('Price: $1,000.00');
  });

  it('formats dates correctly', () => {
    render(<TestComponent />);
    // 2023-01-01 -> 1/1/2023 (US format)
    // Note: Depends on local timezone, so date formatting tests can be tricky.
    // We check if it contains "2023".
    expect(screen.getByTestId('date')).toHaveTextContent('2023');
  });

  it('changes language correctly', async () => {
    await i18n.changeLanguage('fr');
    render(<TestComponent />);
    expect(screen.getByText('Bienvenue')).toBeInTheDocument();
    // In 'fr', 1000 -> 1 000 (space as separator)
    // Note: Intl.NumberFormat space is sometimes a non-breaking space (U+202F or U+00A0).
    // Let's just check if it contains '1' and '000'.
    const numberText = screen.getByTestId('number').textContent;
    expect(numberText).toContain('Nombre:');
    expect(numberText).toMatch(/1\s?000/);
  });
});
