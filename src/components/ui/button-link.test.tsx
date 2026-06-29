import { render, screen } from '@testing-library/react';
import { createElement } from 'react';

import { ButtonLink } from './button-link';

describe('ButtonLink', () => {
  it('renders a link with button styling and the requested href', () => {
    render(
      createElement(
        ButtonLink,
        { href: '/contact', variant: 'outline', size: 'pill' },
        'Contact',
      ),
    );

    const link = screen.getByRole('link', { name: 'Contact' });

    expect(link).toHaveAttribute('href', '/contact');
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link).toHaveClass('rounded-full');
    expect(link).toHaveClass('text-brand-green');
  });
});
