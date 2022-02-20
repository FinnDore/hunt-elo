import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ReactChild } from 'react';
import { useSelector } from 'react-redux';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { activeOverlaySelector } from '../../_store/_selectors/settings/active-overlay.selector';
/**
 * The app component
 * @param props
 * @returns {object} the app component
 */
export function ViewContainer(props: {
    overlayName: ActiveOverlay;
    className: string;
    children: ReactChild;
}) {
    const activeOverlay = useSelector(activeOverlaySelector);
    return (
        <AnimatePresence>
            {activeOverlay === props.overlayName && (
                <MotionConfig
                    transition={{
                        duration: 0.2,
                        // ease: bezier(0.66, 0.53, 0.67, 1.75),
                        easings: 'ease-out',
                    }}
                >
                    <motion.div
                        style={{
                            scale: 1.25,
                            opacity: 0,
                            position: 'absolute',
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            position: 'absolute',
                        }}
                        exit={{
                            scale: 1.25,
                            opacity: 0,
                            position: 'absolute',
                        }}
                        className={props.className}
                    >
                        {props.children}
                    </motion.div>
                </MotionConfig>
            )}
        </AnimatePresence>
    );
}
