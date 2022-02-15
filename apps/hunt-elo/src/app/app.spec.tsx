import { render } from '@testing-library/react';

import App from './title-bar/title-bar';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<App />);

        expect(baseElement).toBeTruthy();
    });
});
