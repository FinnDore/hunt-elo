import { Settings } from '@mui/icons-material';
import { render } from '@testing-library/react';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Settings />);

        expect(baseElement).toBeTruthy();
    });
});
