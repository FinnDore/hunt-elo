import { EloDisplay } from './elo-display';
import { render } from '@testing-library/react';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EloDisplay />);

        expect(baseElement).toBeTruthy();
    });
});
