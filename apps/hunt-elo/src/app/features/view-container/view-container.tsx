import bezier from 'bezier-easing';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ReactChild } from 'react';
import { useSelector } from 'react-redux';
import { ActiveOverlay } from '../../_enums/current-overlay';
import { activeOverlaySelector } from '../../_store/_selectors/settings/active-overlay.selector';

const END_SCALE = 1.25;
const END_OPACITY = 0;
const DURATION = 0.23;

/**
 * A component that provides enter and exit animation for the different views
 * @param props the components props
 * @returns {object} the children components wrapped in a animation component
 */
export function ViewContainer(props: {
    overlayName: ActiveOverlay;
    className: string;
    children: ReactChild;
}) {
    const activeOverlay = useSelector(activeOverlaySelector);
    return (
        <AnimatePresence initial={false}>
            {activeOverlay === props.overlayName && (
                <MotionConfig
                    transition={{
                        duration: DURATION,
                        ease: bezier(0.49, -0.76, 0.67, 1.75),
                    }}
                >
                    <motion.div
                        style={{
                            scale: END_SCALE,
                            opacity: END_OPACITY,
                            position: 'absolute',
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            position: 'absolute',
                        }}
                        exit={{
                            scale: END_SCALE,
                            opacity: END_OPACITY,
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
