import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import Box from '@mui/material/box';
import Button from '@mui/material/button';
import { appWindow } from '@tauri-apps/api/window';
import { useMemo } from 'react';
import classes from './title-bar.module.scss';

/**
 * The titleBar component
 * @returns {object} The titleBar component
 */
export function TitleBar() {
    const maximizeOrMinimize = useMemo(
        () => async () =>
            (await appWindow.isMaximized())
                ? appWindow.unmaximize()
                : appWindow.maximize(),
        []
    );

    return (
        <Box
            sx={{ bgcolor: 'background.paper' }}
            className={classes['title-bar']}
            data-tauri-drag-region
        >
            <Button onClick={() => appWindow.minimize()}>
                <MinimizeOutlinedIcon></MinimizeOutlinedIcon>
            </Button>
            <Button onClick={() => maximizeOrMinimize()}>
                <CheckBoxOutlineBlankOutlinedIcon></CheckBoxOutlineBlankOutlinedIcon>
            </Button>
            <Button onClick={() => appWindow.close()}>
                <ClearOutlinedIcon></ClearOutlinedIcon>
            </Button>
        </Box>
    );
}

export default TitleBar;
